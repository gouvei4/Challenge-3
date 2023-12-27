import mongoose, { Schema, Document } from 'mongoose';
import { Users } from './interface/userModel-interface';
import { v4 as uuidv4 } from 'uuid';

export interface UsersDocument extends Users, Document {
    _id: string;
    birthday: Date;
}

const usersSchema = new Schema<UsersDocument>(
    {
        _id: { type: String, default: uuidv4, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        birthday: { type: Date, required: true},
        city: { type: String, required: true},
        country: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        confirmPassword: { type: String, required: true}
    }
);

export default mongoose.model('Users', usersSchema);