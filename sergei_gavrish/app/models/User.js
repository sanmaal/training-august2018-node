import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  catchedPokemons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pokemon'
  }],
  datesOfCapture: [{
    id: {
      type: String
    },
    date: {
      type: Date
    }, 
  }],
});

export default mongoose.model('User', UserSchema);
