import React, { useState, useRef, useEffect } from 'react';
import { getFromCookies } from '../utils/cookieUtils';
import { openDB } from 'idb';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

// Inline styles for self-contained assistant styling
const styles = {
  icon: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    background: '#3cb043',
    color: '#fff',
    borderRadius: '50%',
    boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 9999,
    transition: 'box-shadow 0.2s',
  },
  modal: {
    position: 'fixed',
    bottom: 96,
    right: 32,
    width: 350,
    maxWidth: '90vw',
    background: '#fff',
    borderRadius: 18,
    boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
    zIndex: 10000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    background: '#3cb043',
    color: '#fff',
    padding: 16,
    fontSize: '1.1rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    cursor: 'pointer',
    fontSize: '1.2rem',
    marginLeft: 8,
  },
  messages: {
    flex: 1,
    padding: 16,
    background: '#f7f9fa',
    overflowY: 'auto',
    maxHeight: 320,
  },
  message: {
    display: 'flex',
    marginBottom: 12,
  },
  bubble: {
    padding: '10px 16px',
    borderRadius: 16,
    background: '#e0e7ff',
    color: '#222',
    maxWidth: '80%',
    fontSize: '0.98rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  bubbleUser: {
    background: '#3cb043',
    color: '#fff',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#f0f4f8',
    borderTop: '1px solid #e5e7eb',
  },
  input: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
    marginRight: 8,
  },
  send: {
    background: '#3cb043',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'background 0.2s',
  },
};

const initialMessages = [
  { sender: 'assistant', text: 'Hi! I am your AI assistant. How can I help you today?' }
];

const AIChatAssistant = () => {
  // Unique user/device id
  const userId = (getFromCookies() && getFromCookies().uniqueString) || 'guest';

  // IndexedDB helpers
  const dbName = 'merchants';
  const storeName = 'chat';
  const initDB = async () => {
    return await openDB(dbName, 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'userId' });
        }
      }
    });
  };

  const saveMessages = async (messages) => {
    const db = await initDB();
    await db.put(storeName, { userId, messages });
  };

  const loadMessages = async () => {
    const db = await initDB();
    const entry = await db.get(storeName, userId);
    return entry && entry.messages ? entry.messages : initialMessages;
  };
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  // Load chat history on mount
  useEffect(() => {
    loadMessages().then(msgs => setMessages(msgs));
  }, []);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // Save messages to IndexedDB whenever they change
    saveMessages(messages);
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');

    // Gemini expects a different payload
    const apiUrl = process.env.REACT_APP_CHAT_API_KEY;
    const payload = {
      contents: [
        { role: 'user', parts: [{ text: input }] }
      ]
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        // Gemini response parsing
        const aiText =
          data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text
            ? data.candidates[0].content.parts[0].text
            : 'Sorry, I could not process your request.';
        setMessages(msgs => [...msgs, { sender: 'assistant', text: aiText }]);
      })
      .catch(() => {
        setMessages(msgs => [...msgs, { sender: 'assistant', text: 'Sorry, there was an error connecting to AI.' }]);
      });
  };

  return (
    <>
      <div style={styles.icon} onClick={() => setOpen(true)}>
        <FaRobot size={32} /> 
      </div>
      {open && (
        <div style={styles.modal}>
          <div style={styles.header}>
            <span><FaRobot /> Merchant AI Assistant</span>
            <FaTimes style={styles.close} onClick={() => setOpen(false)} />
          </div>
          <div style={styles.messages}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{...styles.message, justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'}}>
                <div style={msg.sender === 'user' ? {...styles.bubble, ...styles.bubbleUser} : styles.bubble}>{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={styles.input}
            />
            <button style={styles.send} onClick={handleSend}><FaPaperPlane /></button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;
