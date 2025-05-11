const express = require('express');
const bookingRoute = require('./routes/bookingRoute.js');
const cors = require('cors');
// ... other imports

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://bug-free-cod-vpw6v4gwp9hwx55-5501.app.github.dev', // Be specific about your origin
    methods: 'POST, OPTIONS',
    allowedHeaders: 'Content-Type',
}));
app.use(express.json());

// Any authentication middleware should come AFTER cors()
// app.use(authMiddleware);

/** routes */
app.use('/api', bookingRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});