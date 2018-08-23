import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  catched: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pokemon'
  }]
});

export default mongoose.model('User', UserSchema);
