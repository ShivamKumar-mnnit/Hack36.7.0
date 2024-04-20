import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = 'http://localhost:8080'

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () => {
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

    // Add a Note
    const addNote = async (username, accidentreason, feedback, phone) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ username, accidentreason, feedback, phone }),
            });
            const note = await response.json();
            setNotes([...notes, note]);
            getNotes();
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // Delete a Note by Username
    const deleteNote = async (username) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${username}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            console.log(json);
            if (json.Success) {
                setNotes(notes.filter((note) => note.username !== username));
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // Edit a Note by Username
    const editNote = async (username, accidentreason, feedback, phone) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ username, accidentreason, feedback, phone })
            });
            const json = await response.json();
            console.log(json);
            // Update the notes list after successful edit
            if (json.Success) {
                setNotes(notes.map(note => {
                    if (note.username === username) {
                        return {
                            ...note,
                            accidentreason,
                            feedback,
                            phone
                        };
                    }
                    return note;
                }));
            }
        } catch (error) {
            console.error("Error editing note:", error);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
