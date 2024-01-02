import mongoose, { Schema } from 'mongoose';
import Events from '../types/events.type';

 const eventModelSchema = new Schema<Events>(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dayOfWeek: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

 const Event = mongoose.model('Events', eventModelSchema);

 export default Event;