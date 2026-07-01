import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_DB_URL || process.env.mongo_db_url;

if (!MONGO_URI) {
  // Do not throw during import on serverless; throw when trying to connect instead
}

const options = {
  // recommended options
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const cached = globalThis._mongoose || (globalThis._mongoose = { conn: null, promise: null });

export default async function dbConnect() {
  if (!MONGO_URI) {
    throw new Error('MONGO_DB_URL environment variable is not set');
  }
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, options).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
