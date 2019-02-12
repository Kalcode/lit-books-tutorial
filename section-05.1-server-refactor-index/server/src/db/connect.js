import mongoose from 'mongoose';

export async function connect() {
  const { DB_URL, DB_NAME } = process.env;

  const uri = `${DB_URL}/${DB_NAME}`;

  await mongoose.connect(uri, { useNewUrlParser: true });
  
  console.log(`Connected to MongoDB: ${uri}`);
}
