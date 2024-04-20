import express from 'express';
import Note from '../model/feedback.js';
import Auth from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

//Route1: get all the notes using: GET "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes', async (req, res) => {
    try {
        console.log(req._id);
        const notes = await Note.find({ user: req.username });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route2: add a new note using: POST "/api/notes/addnote" login required
router.post('/addnote', [
    body('username', 'Enter a valid UserName').isLength({ min: 2 }),
    body('accidentreason', 'Enter a valid accidentreason').isLength({ min: 2 }),
    body('feedback', 'Enter a valid feedback').isLength({ min: 2 }),
    body('phone', 'Enter valid phone phone').isLength({ min: 4 }),
], async (req, res) => {
    try {
        const { username, accidentreason, feedback, phone } = req.body;
        //if there are errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            username, accidentreason, feedback, phone
        });
        const savedNote = await note.save();
        res.json({ savedNote });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route3: Update an existing note using: PUT "/api/notes/updatenote/:id" login required


router.put('/updatenote/:username', async (req, res) => {
    const { username, accidentreason, feedback, phone } = req.body;
    try {
        // Create a new note object
        const newNote = {};
        if (username) { newNote.username = username };
        if (accidentreason) { newNote.accidentreason = accidentreason };
        if (feedback) { newNote.feedback = feedback };
        if (phone) { newNote.phone = phone };

        // Find the note to be updated by username and update it 
        console.log(req.params.username);
        let note = await Note.findOneAndUpdate({ username: req.params.username }, { $set: newNote }, { new: true });
        console.log(note); // Log the updated note
        if (!note) { return res.status(404).send("Not Found") }

        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});



//Route4: Delete an existing note using: DELETE "/api/notes/deletenote/:id" login required
router.delete('/deletenote/:username', async (req, res) => {
    try {
        // Find the note to be deleted by username
        let note = await Note.findOneAndDelete({ username: req.params.username });
        if (!note) { return res.status(404).send("Note not found") }

        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


export default router;
