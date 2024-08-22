const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = connection.connections[0].readyState;
    console.log('New database connection established');
  } catch (error) {
    console.error('Error connecting to database', error);
    throw error;
  }
};

module.exports = connectDB;
