import mongoose, { Schema } from 'mongoose';
import Users from '../types/users.types';

const usersSchema = new Schema<Users>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

export default mongoose.model('Users', usersSchema);
