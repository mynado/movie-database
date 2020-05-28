/**
 * Models
 */

const mongoose = require('mongoose');

// Connect to database
// FAnXsyu1ltIclVXv
mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('We are connected to MongoDB Atlas')
});

// Set up the models we want to use in our app

// Export all the things
module.exports = {
	mongoose,
}
