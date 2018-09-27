import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  id: Number,
  name: String,
  date: Date,
  captured: Boolean,
});

export default mongoose.model('Pokemon', PokemonSchema);
