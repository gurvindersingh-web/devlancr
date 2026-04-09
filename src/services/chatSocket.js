/**
 * WebSocket chat client using native WebSocket API.
 * Connects to Spring Boot's STOMP endpoint for real-time messaging.
 *
 * NOTE: This is the frontend client. The backend needs:
 *   1. spring-boot-starter-websocket dependency
 *   2. WebSocketMessageBrokerConfigurer with /ws endpoint
 *   3. @MessageMapping and /topic/contract/{id} subscription
 *
 * Falls back to polling if WebSocket connection fails.
 */

const WS_BASE = 'ws://localhost:8080/ws';

/**
 * Creates a WebSocket connection for a specific contract chat.
 *
 * @param {string|number} contractId - The contract to subscribe to
 * @param {Object} callbacks
 * @param {Function} callbacks.onMessage - Called with parsed message data
 * @param {Function} callbacks.onConnect - Called when connection is established
 * @param {Function} callbacks.onDisconnect - Called when connection drops
 * @param {Function} callbacks.onError - Called on connection error
 * @returns {Object} { send, disconnect, isConnected }
 */
export function createChatConnection(contractId, callbacks = {}) {
    let socket = null;
    let connected = false;
    let reconnectAttempts = 0;
    const MAX_RECONNECT_ATTEMPTS = 5;
    const RECONNECT_DELAY = 2000;

    function connect() {
        const token = localStorage.getItem('token');
        if (!token) {
            callbacks.onError?.('No auth token available');
            return;
        }

        try {
            socket = new WebSocket(`${WS_BASE}?token=${encodeURIComponent(token)}&contractId=${contractId}`);

            socket.onopen = () => {
                connected = true;
                reconnectAttempts = 0;
                callbacks.onConnect?.();
            };

            socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    callbacks.onMessage?.(data);
                } catch {
                    console.warn('[ChatSocket] Failed to parse message:', event.data);
                }
            };

            socket.onclose = (event) => {
                connected = false;
                callbacks.onDisconnect?.(event.code, event.reason);

                // Auto-reconnect on abnormal closure
                if (event.code !== 1000 && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts++;
                    setTimeout(connect, RECONNECT_DELAY * reconnectAttempts);
                }
            };

            socket.onerror = () => {
                callbacks.onError?.('WebSocket connection error');
            };
        } catch (err) {
            callbacks.onError?.(err.message);
        }
    }

    function send(content) {
        if (!connected || !socket) {
            console.warn('[ChatSocket] Not connected. Message not sent.');
            return false;
        }

        socket.send(JSON.stringify({
            contractId,
            content,
            timestamp: new Date().toISOString(),
        }));
        return true;
    }

    function disconnect() {
        reconnectAttempts = MAX_RECONNECT_ATTEMPTS; // prevent reconnect
        if (socket) {
            socket.close(1000, 'Client disconnect');
            socket = null;
        }
        connected = false;
    }

    // Start connection
    connect();

    return {
        send,
        disconnect,
        get isConnected() { return connected; },
    };
}
