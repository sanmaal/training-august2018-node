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
  datesOfCapture: mongoose.Schema.Types.Mixed,
});

export default mongoose.model('User', UserSchema);
