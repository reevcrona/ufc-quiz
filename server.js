const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9000; // Use port 3000 by default

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
