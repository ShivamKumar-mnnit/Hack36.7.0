import React, { useContext, useState, useEffect } from 'react';
import noteContext from './Context/NoteContext';
import "./Noteitem.css";
import Header from '../../pages/homepage/Header';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const [notes, setNotes] = useState([]);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchAccidentReason, setSearchAccidentReason] = useState('');
  const host = 'http://localhost:8080'

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json = await response.json();
        setNotes(json);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Filtering function
  const filteredNotes = notes.filter(note => {
    return (
      note.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
      note.accidentreason.toLowerCase().includes(searchAccidentReason.toLowerCase())
    );
  });

  return (
    <>
    <Header/>
    <div className='gettable'>
      <div className="search-container">
        {/* Search inputs */}
        <input
          type="text"
          placeholder="Search by username..."
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by accident reason..."
          value={searchAccidentReason}
          onChange={(e) => setSearchAccidentReason(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Accident Reason</th>
            <th>Feedback</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through filteredNotes and render each note */}
          {filteredNotes.map((note, index) => (
            <tr key={index}>
              <td>{note.username}</td>
              <td>{note.accidentreason}</td>
              <td>{note.feedback}</td>
              <td>{note.phone}</td>
              {/* Assuming date is stored in note.date, replace it with your actual date field */}
              <td>{new Date(note.date).toLocaleDateString()}</td>
              <td>
                <i
                  className="fa-solid fa-pen-to-square mx-2"
                  onClick={() => {
                    updateNote(note);
                  }}
                >
                  Edit
                </i>
              </td>
              <td>
                <i
                  className="fa-solid fa-trash mx-2"
                  onClick={() => {
                    deleteNote(note._id);
                    props.showAlert('Deleted Successfully', 'success');
                  }}
                >
                  Delete
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Noteitem;
