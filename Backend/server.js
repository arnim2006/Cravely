const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
