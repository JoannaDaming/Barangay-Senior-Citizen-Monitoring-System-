const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));

// Routes
const residentRoutes = require('./routes/residentRoutes');
const householdRoutes = require('./routes/householdRoutes');
const benefitRoutes = require('./routes/benefitRoutes');
const healthRoutes = require('./routes/healthRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/residents', residentRoutes);
app.use('/api/households', householdRoutes);
app.use('/api/benefits', benefitRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Catch-all: For any other request, serve index.html (SPA support)
// We use app.use without a path to avoid path-to-regexp issues in Express 5
app.use((req, res, next) => {
    // If it's an API request that wasn't caught by the routes above, return 404
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ message: 'API endpoint not found' });
    }
    // Otherwise, serve the frontend
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
