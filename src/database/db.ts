import mongoose from 'mongoose';
import { config } from '../config/configDb';

export async function connectToMongoDb() {
    try {
        const user = await mongoose.connect(config.mongo.uri, {
            retryWrites: true,
            w: 'majority',
        });

        console.log('MongoDB server connected 📡');

        return user;
    } catch (err: unknown) {
        console.error('Error',  err);
        throw err;
}
}