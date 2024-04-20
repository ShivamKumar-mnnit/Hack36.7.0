const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserSchema = require('./User.model');

const app = express();

// Import User model based on the schema
const User = mongoose.model('User', UserSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://AuthSystem:AuthSystem%40123@authsystem.7sbn5ra.mongodb.net/1111', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Parse JSON bodies
app.use(bodyParser.json());

// Route to handle POST requests to update distance for a user
app.post('/update-distance', async (req, res) => {
    const { username } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username: username });

        if (user) {
            // Update the distance field of the existing user
            user.distance = distance;
            await user.save();

            res.status(200).send('Distance updated successfully');
        } else {
            // User not found
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating distance:', error);
        res.status(500).send('Internal server error');
    }
});

// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
