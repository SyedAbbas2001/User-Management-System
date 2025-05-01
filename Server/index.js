const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = 'mongodb+srv://syedabbas1618:abbas0335@cluster0.ivjmcld.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);
app.post('https://user-management-system-production-a059.up.railway.app//submit', async (req, res) => {
    console.log('Received data:', req.body);
    const { name, age, email } = req.body;
    const newUser = new User({ name, age, email });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(400).json({ error: 'Error creating user', details: err.message });
    }
});

app.get('https://user-management-system-production-a059.up.railway.app//users', async (req, res) => {
  const searchQuery = req.query.search || '';

  const filter = {
    $or: [
      { name: { $regex: searchQuery, $options: 'i' } },
      { email: { $regex: searchQuery, $options: 'i' } },
      { age: isNaN(searchQuery) ? undefined : parseInt(searchQuery) }
    ].filter(Boolean) // remove undefined filters (like invalid age input)
  };

  try {
    const users = await User.find(searchQuery ? filter : {});
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});



app.delete('https://user-management-system-production-a059.up.railway.app//users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('https://user-management-system-production-a059.up.railway.app/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user); // Send the user data as a response
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, age, email },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
