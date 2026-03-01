import { useState, useEffect } from 'react';
import { walletAPI } from '../services/api';
import Navbar from '../components/Navbar';
import './Dashboard.css';

export default function WalletPage() {
    const [wallet, setWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => { load(); }, []);

    async function load() {
        try {
            const [w, t] = await Promise.all([walletAPI.getWallet(), walletAPI.getTransactions()]);
            setWallet(w.data);
            setTransactions(t.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }

    async function deposit(e) {
        e.preventDefault();
        try {
            await walletAPI.deposit({ amount: parseFloat(amount) });
            setAmount('');
            load();
        } catch (err) { alert(err.message); }
    }

    if (loading) return <><Navbar /><div className="loading-screen"><div className="spinner"></div></div></>;

    return (
        <>
            <Navbar />
            <div className="wallet-page">
                <div className="wallet-balance">
                    <div className="balance-label">Available Balance</div>
                    <div className="balance-amount">${wallet?.balance?.toFixed(2) || '0.00'}</div>
                    <div className="escrow-amount">Escrow: ${wallet?.escrowBalance?.toFixed(2) || '0.00'}</div>
                </div>
                <div className="detail-section">
                    <h2>Add Funds</h2>
                    <form onSubmit={deposit} style={{ display: 'flex', gap: '0.75rem' }}>
                        <input type="number" min="1" placeholder="Amount" value={amount}
                            onChange={e => setAmount(e.target.value)} style={{ flex: 1 }} />
                        <button className="btn-primary" type="submit" style={{ width: 'auto', padding: '0.7rem 1.5rem' }}>Deposit</button>
                    </form>
                </div>
                <h2 className="section-title" style={{ marginTop: '1.5rem' }}>📊 Transaction History</h2>
                <div className="transactions-list">
                    {transactions.length === 0 ? <div className="empty-state"><p>No transactions</p></div> :
                        transactions.map(t => (
                            <div className="transaction-item" key={t.id}>
                                <div className="txn-info">
                                    <h4>{t.description || t.transactionType}</h4>
                                    <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className={`txn-amount ${['DEPOSIT', 'ESCROW_RELEASE'].includes(t.transactionType) ? 'positive' : 'negative'}`}>
                                    {['DEPOSIT', 'ESCROW_RELEASE'].includes(t.transactionType) ? '+' : '-'}${t.amount?.toFixed(2)}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
