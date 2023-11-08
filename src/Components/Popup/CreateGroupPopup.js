import React, { useState, useRef, useEffect } from 'react';
import popstyle from './pop.module.css';

function CreateGroupPopup({ onClose, onGroupCreate, selectedColor, setSelectedColor }) {
  const [groupName, setGroupName] = useState('');

  const popupRef = useRef(null);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleCreateGroup = (event) => {
    event.preventDefault();

    if (groupName && selectedColor) {
      onGroupCreate(groupName, selectedColor);
      onClose();
    }
  };
  useEffect(() => {
    if (selectedColor) {
      document.body.style.border = "2px solid white";
    } else {
      document.body.style.border = '';
    }

    return () => {
      document.body.style.border = '';
    };
  }, [selectedColor]);

  return (
    <div className={popstyle.overlay} onClick={onClose}>
      <div className={popstyle.container} ref={popupRef} onClick={(e) => e.stopPropagation()}>
        <div>
          <h2 style={{ marginBottom: '20px' }}>Create New Notes Group</h2>
          <form className={popstyle.formm} onSubmit={handleCreateGroup}>
          <label style={{ marginBottom: '20px',fontWeight:'bold', fontSize: '17px' }}>Group Name</label>
          <input
          className={popstyle.inp}
           
            type="text"
            placeholder="Enter your group name...."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          /><br />
          <div className={popstyle.chose}>
         
            <label  style={{ marginBottom: '20px',fontWeight:'bold', fontSize: '17px' }}>Choose color</label>
            <div className={popstyle.color} >
              <div
                className={popstyle.circle}
                style={{ backgroundColor: '#B38BFA' }}
                onClick={() => setSelectedColor('#B38BFA')}
              ></div>
              <div
                className={popstyle.circle}
                style={{ backgroundColor: '#FF79F2' }}
                onClick={() => setSelectedColor('#FF79F2')}
              ></div>
              <div
                className={popstyle.circle}
                style={{ backgroundColor: '#43E6FC' }}
                onClick={() => setSelectedColor('#43E6FC')}
              ></div>
              <div
                className={popstyle.circle}
                style={{ backgroundColor: '#F19576' }}
                onClick={() => setSelectedColor('#F19576')}
              ></div>
              <div
                className={popstyle.circle}
                style={{ backgroundColor: '#0047FF' }}
                onClick={() => setSelectedColor('#0047FF')}
              ></div>
              <div
                className={popstyle.circle}
                style={{ backgroundColor: '#6691FF' }}
                onClick={() => setSelectedColor('#6691FF')}
              ></div>
            </div>

          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            float: 'right',
            right: '0px',
            top: '-20px',
            position: 'relative'
          }}>
            <button
              type="submit" 
                style={{

                backgroundColor: '#000000',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 13px 5px 13px',
                fontSize: '17px'
              }}
            >Create</button>
            <button
              style={{

                backgroundColor: '#000000',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '5px 13px 5px 13px',
                fontSize: '17px'
              }}
              onClick={onClose}>Close</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupPopup;
