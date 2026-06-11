// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes'); 

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json()); 


// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes); 

// app.get('/', (req, res) => {
//   res.send('Task Management System API is running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running properly on port ${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();


const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://lemith-task-manager.netlify.app' 
];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Management System API is running...');
});


const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
  console.log(`Server is running properly on port ${PORT}`);
});