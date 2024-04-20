import mongoose from 'mongoose';

const { Schema } = mongoose;

// Schema definition
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String,
        required: true
    },
    accidentreason: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model('notes', NotesSchema);

export default Notes;
