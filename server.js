if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production'   
    ? [/^https:\/\/.*\.vercel\.app$/, 'https://rujenamatya.com', 'http://localhost:5173']
    : '*'
}));
app.use(express.json());

const uri = process.env.MONGODB_URI; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("portfolio");
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// GET endpoint to fetch all projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await db.collection('my_projects').find({}).toArray();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET endpoint to fetch about me
app.get('/about', async (req, res) => {
  try {
    const about = await db.collection('about_me').findOne({}, { projection: { info: 1, _id: 0 } });
    res.json(about);
  } catch (error) { 
    console.error('Error fetching about me:', error);
    res.status(500).json({ error: 'Failed to fetch about me' });
  }
});

// POST endpoint to submit contact form
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const submission = {
      name,
      email,
      message,
      submittedAt: new Date()
    };

    const result = await db.collection('form_submission').insertOne(submission);
    
    res.json({ 
      success: true, 
      message: 'Form submitted successfully',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

process.on('SIGINT', async () => {
  console.log('\nClosing MongoDB connection...');
  await client.close();
  process.exit(0);
});
