import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from './Context/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import SearchBar from './Searchbar';

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", username: "", accidentreason: "", feedback: "", phone: "" });
  const [searchInput, setSearchInput] = useState('');

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, username: currentNote.username, accidentreason: currentNote.accidentreason, feedback: currentNote.feedback, phone: currentNote.phone });
  }

  const handleClick = (e) => {
    editNote(note.id, note.username, note.accidentreason, note.feedback, note.phone);
    refClose.current.click();
    props.showAlert("Updated Succesfully", "success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const handleSearch = (searchTerm) => {
    setSearchInput(searchTerm);
  };

  const filteredNotes = notes.filter((note) =>
    note.username && note.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <AddNote/>
      
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Feedback</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Update Username</label>
                  <input type="text" className="form-control" id="username" name='username' aria-describedby="emailHelp" value={note.username} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Update AccidentReason</label>
                  <input type="text" className="form-control" id="accidentreason" name='accidentreason' value={note.accidentreason} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="feedback" className="form-label">Update Feedback</label>
                  <input type="text" className="form-control" id="feedback" name='feedback' value={note.feedback} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Update Phone</label>
                  <input type="text" className="form-control" id="phone" name='phone' value={note.phone} onChange={onChange} minLength={5} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.username.length < 5 || note.phone.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2 className='px-5 addnote'>Your feedback</h2>
        <div className="container mx-2 px-5">
          {notes.length === 0 && 'No Notes to display'}
        </div>
        {filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date)).map((note, _id) => {
          return <NoteItem key={_id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes;
