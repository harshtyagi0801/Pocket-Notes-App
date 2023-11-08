import React, { useState, useEffect } from 'react';
import { BiSolidSend } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa'; 
import grupstyle from './group.module.css';
import { useNavigate } from 'react-router-dom';

function GroupNotes() {
  const [note, setNote] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(() => {
    const storedSelectedGroup = JSON.parse(localStorage.getItem('selectedGroup'));
    return storedSelectedGroup || { name: '', color: '' };
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(selectedGroup.name));
    if (storedNotes) {
      setMessages(storedNotes);
    }
  }, [selectedGroup]);

  const handleSend = () => {
    if (note.trim() !== '') {
      const now = new Date();
      const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      const optionsDate = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };

      const timestampTime = now.toLocaleString('en-IN', optionsTime);
      const timestampDate = now.toLocaleString('en-IN', optionsDate);

      const message = {
        text: note,
        timestamp: {
          time: timestampTime,
          date: timestampDate,
        },
      };

      setMessages([...messages, message]);
      setNote('');
      setSelectedGroup('')

      const updatedNotes = [...messages, message];
      localStorage.setItem(selectedGroup.name, JSON.stringify(updatedNotes));
    }
  };

  const handleTextareaKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
 

  const isMobile = window.innerWidth <= 460;

  const renderBackButton = () => {
    if (isMobile && selectedGroup.name) {
      return (
        <button
          onClick={() => navigate('/')}
          className={grupstyle.backButton}
        >
          <FaArrowLeft />
        </button>
      );
    }
    return null;
  };

  return (
    <div className={grupstyle.container}>
      {renderBackButton()}
      <ul style={{ width: '100%', height: '10vh' }}>
        <li className={grupstyle.lii}>
          <div
            className={grupstyle.list}
            style={{ backgroundColor: selectedGroup.color }}
          >
            {selectedGroup.name.slice(0, 2)}
          </div>
          <div
            style={{
              padding: '10px 5px 5px 10px',
              fontFamily: 'sans-serif',
              fontSize: '20px',
            }}
          >
            {selectedGroup.name}
          </div>
        </li>
      </ul>
      <div className={grupstyle.notess}>
        {messages.map((message, index) => (
          <div key={index} className={grupstyle.ss}>
            <div style={{ flex: 1, textAlign: 'left', display: 'block' }}>
              {message.timestamp.time}
              <br />
              {message.timestamp.date}
            </div>
            <div style={{ flex: 2, textAlign: 'left' }}>{message.text}</div>
          </div>
        ))}
      </div>
      <div className={grupstyle.texts}>
        <textarea
          className={grupstyle.area}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '20px',
            color: '#9A9A9A',
          }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyPress={handleTextareaKeyPress}
          placeholder="Enter your text here..........."
          rows="6"
          cols="70"
        />
        <BiSolidSend
          style={{
            position: 'absolute',
            bottom: '6%',
            right: '1%',
            fontSize: '30px',
          }}
          onClick={handleSend}
        />
      </div>
    </div>
  );
}

export default GroupNotes;
