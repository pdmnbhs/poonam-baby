const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Requirement: Password stored in a constant
const CORRECT_PASSWORD = 'poonam123';

// Requirement: Use express.urlencoded() for form parsing
app.use(express.urlencoded({ extended: true }));

// Requirement: res.sendFile() for serving HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Logic for password verification
app.post('/login', (req, res) => {
    const { password } = req.body;
    
    if (password === CORRECT_PASSWORD) {
        // Requirement: Serve secret.html if correct
        res.sendFile(path.join(__dirname, 'public', 'secret.html'));
    } else {
        // Requirement: Show error message with retry link
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 100px;">
                <h1 style="color: #dc2626;">Access Denied</h1>
                <p style="color: #4b5563; margin-bottom: 20px;">The password you entered is incorrect.</p>
                <a href="/" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Try Again</a>
            </div>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});