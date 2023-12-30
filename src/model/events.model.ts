import mongoose from 'mongoose';

const EventModelSchema = new mongoose.Schema(
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

export const EventSchema = mongoose.model('Events', EventModelSchema);
