import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseSetting';
import styles from '../styles/Chat.module.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function Chat({ activeCharacter }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!activeCharacter) return;

    const q = query(
      collection(db, `chats/${activeCharacter.name}/messages`),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages([...activeCharacter.initialMessages, ...messagesData]);
    });

    scrollToBottom();

    return () => unsubscribe();
  }, [activeCharacter]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage = {
      text: newMessage,
      sender: "user",
      createdAt: new Date(),
    };

    try {
      setIsLoading(true);

      await addDoc(collection(db, `chats/${activeCharacter.name}/messages`), userMessage);
      setNewMessage('');

      const prompts = [
        ...activeCharacter.initialMessages.map(msg => ({ role: 'system', content: msg.content })),
        ...messages.map((msg) => ({ role: msg.sender === "user" ? 'user' : 'assistant', content: msg.text })),
        { role: 'user', content: newMessage },
      ];

      const validPrompts = prompts.filter(msg => msg.content && msg.content.trim());

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: validPrompts,
      });

      const aiMessage = {
        text: completion.choices[0].message.content,
        sender: "bot",
        createdAt: new Date(),
      };

      await addDoc(collection(db, `chats/${activeCharacter.name}/messages`), aiMessage);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chat_window}>
      <div className={styles.messages}>
        {messages
          .filter(message => message.text && message.text.trim())
          .map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${message.sender === "user" ? styles.sent : ""}`}
            >
              {message.text}
            </div>
        ))}
        {isLoading && (
          <ProgressBar animated now={100} label="로딩 중..." />
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.input_container} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={handleChange}
          disabled={isLoading}
        />
        <button type="submit" className={styles.send_button} disabled={isLoading}>
          전송
        </button>
      </form>
    </div>
  );
}

export default Chat;
