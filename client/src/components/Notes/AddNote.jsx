import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from './Context/NoteContext';
import './AddNote.css';

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote, getNotes } = context;
  const navigate = useNavigate();

  const [note, setNote] = useState({ username: '', accidentreason: '', feedback: '', phone: '' });

  useEffect(() => {
    // Define a function to fetch notes only once when the component mounts
    const fetchNotes = async () => {
      await getNotes();
    };

    // Call the fetchNotes function to fetch notes when the component mounts
    fetchNotes();
  }, []); // Empty dependency array to run effect only once

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.username, note.accidentreason, note.feedback, note.phone, new Date().toISOString());
    setNote({ username: '', accidentreason: '', feedback: '', phone: '' });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className='add-note-container'>
      <div className="login-box">
        <h2>Give feedback</h2>
        <form>
          <div className="user-box">
            <select
              className='accidentreason'
              id="accidentreason"
              name="accidentreason"
              value={note.accidentreason}
              onChange={onChange}
              required
            >
              <option value="">Select a reason for road accidents</option>
              <option value="Speeding">Speeding</option>
              <option value="Distracted Driving">Distracted Driving</option>
              <option value="Drunk Driving">Drunk Driving</option>
              <option value="Weather Conditions">Weather Conditions</option>
              <option value="Reckless Driving">Reckless Driving</option>
              <option value="Running Red Lights">Running Red Lights</option>
              <option value="Poor Road Conditions">Poor Road Conditions</option>
              <option value="Vehicle Defects">Vehicle Defects</option>
              <option value="Fatigue">Fatigue</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="user-box">
            <input
              type="number"
              id="phone"
              name="phone"
              required
              value={note.phone}
              onChange={onChange}
              placeholder="Enter your phone number"
            />
            <label>Phone</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              id="username"
              name="username"
              required
              value={note.username}
              onChange={onChange}
              minLength={5}
              placeholder="Enter more information"
            />
            <label>More Information</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              id="feedback"
              name="feedback"
              required
              value={note.feedback}
              onChange={onChange}
              minLength={5}
              placeholder="Enter feedback"
            />
            <label>Enter a feedback</label>
          </div>
          <button className='button2' onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
