import mongoose, { Schema } from 'mongoose';
import Events from '../types/events.type';

const eventModelSchema = new Schema<Events>(
  {
    description: {
      type: String,
      required: true,
    },
    dayOfWeek: {
      type: String,
      required: true,
    },
    userId: {
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
