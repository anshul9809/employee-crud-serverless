const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: true,
    unique: true,
    match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
    ]
  },
  password: { type: String, required: true },
  salary: {type:Number, required:true},
  department: {type:String, required:true}
  
},{
  timestamps:true
});

employeeSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

employeeSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Employee', employeeSchema);
