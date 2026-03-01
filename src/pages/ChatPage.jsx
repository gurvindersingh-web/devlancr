import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { messageAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function ChatPage() {
    const { contractId } = useParams();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef(null);

    useEffect(() => { loadMessages(); const i = setInterval(loadMessages, 5000); return () => clearInterval(i); }, [contractId]);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    async function loadMessages() {
        try {
            const res = await messageAPI.getForContract(contractId);
            setMessages(res.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }

    async function sendMessage(e) {
        e.preventDefault();
        if (!input.trim()) return;
        try {
            await messageAPI.send({ contractId: parseInt(contractId), content: input });
            setInput('');
            loadMessages();
        } catch (err) { alert(err.message); }
    }

    return (
        <>
            <Navbar />
            <div className="chat-page">
                <div className="chat-container">
                    <h2 style={{ color: '#fff', padding: '0 1rem' }}>💬 Contract Chat</h2>
                    <div className="chat-messages">
                        {loading ? <div className="spinner" style={{ margin: '2rem auto' }}></div> :
                            messages.length === 0 ? <div className="empty-state"><p>No messages yet</p></div> :
                                messages.map(m => (
                                    <div key={m.id} className={`chat-bubble ${m.sender?.id === user?.id ? 'sent' : 'received'}`}>
                                        <div>{m.content}</div>
                                        <div className="bubble-time">{new Date(m.createdAt).toLocaleTimeString()}</div>
                                    </div>
                                ))}
                        <div ref={bottomRef} />
                    </div>
                    <form className="chat-input-area" onSubmit={sendMessage}>
                        <input placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
}
