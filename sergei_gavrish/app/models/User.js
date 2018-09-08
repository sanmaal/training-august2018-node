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
  catched: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
      },
      date: {
        type: Object
      }
    }
  ]
});

export default mongoose.model('User', UserSchema);
