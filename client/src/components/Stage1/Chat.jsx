import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const messageListRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    };

    const handleInputChange = (e) => {
        setMessageInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (messageInput.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, messageInput.trim()]);
            setMessageInput('');
        }
    };

    return (
        <div className="chat-container">
            <div ref={messageListRef} id="message-list" className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="message-input"
                    className="message-input"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={handleInputChange}
                />
                <button type="submit" id="send-button" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
}

export default Chat;
