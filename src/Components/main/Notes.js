import React from 'react';
import { BiSolidLock } from 'react-icons/bi';
import bg from '/Users/harshtyagi/Desktop/cuvette/pocket_notes/src/Assets/bg.png';


import notestyle from './notes.module.css';

function Notes() {
  

  return (
    <div className={notestyle.container}>
      <img
        className={notestyle.img}
        src={bg}
        alt='img.png'
      />
      <div className={notestyle.sub}>
        <h1>Pocket Notes</h1>
        <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
      </div>
      <p style={{ position: 'relative', bottom: '-35%', textAlign: 'center' }}><BiSolidLock />  end-to-end encrypted</p>

    
    </div>
  );
}

export default Notes;
