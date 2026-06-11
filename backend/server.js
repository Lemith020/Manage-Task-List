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

app.use(cors({
  origin: true, 
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Management System API is running...');
});


if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080; 
  app.listen(PORT, () => {
    console.log(`Server is running properly on port ${PORT}`);
  });
}


module.exports = app;