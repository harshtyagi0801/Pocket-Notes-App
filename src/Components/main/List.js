import React, { useState, useEffect } from 'react';
import liststyle from './list.module.css';
import CreateGroupPopup from '../Popup/CreateGroupPopup';
import { NavLink } from 'react-router-dom';

function List() {
  const [showPopup, setShowPopup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedColor, setSelectedColor] = useState();
  const [clickedIndex, setClickedIndex] = useState(null);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.backgroundColor = '#2F2F2FBF';
    }

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [showPopup]);

  useEffect(() => {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []);

 
  useEffect(() => {
    const storedClickedIndex = localStorage.getItem('clickedIndex');
    if (storedClickedIndex !== null) {
      setClickedIndex(Number(storedClickedIndex));
    }
  }, []);

  const addGroup = (groupName) => {
    console.log( groupName);
    console.log( selectedColor);

    if (groupName && selectedColor) {
      const newGroup = { name: groupName, color: selectedColor };
      const updatedGroups = [...groups, newGroup];

      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));

      closePopup();
    }
  };

  const handleGroupClick = (group, index) => {
    window.location.reload();
    setClickedIndex(index);
    localStorage.setItem('clickedIndex', index.toString());
    console.log('Clicked on group:', group);
    localStorage.setItem('selectedGroup', JSON.stringify(group));
  };

  return (
    <div className={liststyle.container}>
      <h1 style={{ width: '80%' }}>Pocket Notes</h1>
      <button className={liststyle.btn} onClick={openPopup}>
        + Create Notes group
      </button>

      {showPopup && (
        <CreateGroupPopup
          onClose={closePopup}
          onGroupCreate={addGroup}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}

      <div className={liststyle.list}>
        <ul style={{ marginLeft: '20px' }}>
          {groups.map((group, index) => (
            <li
              style={{ display: "flex", gap: '10px', paddingBottom: '10px', cursor: 'pointer' }}
              key={index}
              className={liststyle.map}
              onClick={() => handleGroupClick(group, index)}
            >
              <NavLink
                to={`/GroupNotes/${group.name}`}
                className={`${liststyle.item} ${clickedIndex === index ? liststyle.activeNavLink : ''}`}
                activeClassName="active"
              >
                <div
                  className={liststyle.circle}
                  style={{ backgroundColor: group.color }}
                >
                  {group.name.slice(0, 2)}
                </div>
                <div
                  style={{ padding: '10px 5px 5px 10px', fontFamily: "sans-serif", fontSize: '20px' }}
                >{group.name}</div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default List;
