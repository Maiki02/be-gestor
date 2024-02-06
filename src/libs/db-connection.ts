import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../mongodb.env') });
// Lee la URI de conexión desde las variables de entorno
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'test';

// Conecta a la base de datos MongoDB
export async function connectToDatabase(): Promise<void> {
  try {
    // Conexión a la base de datos
    await mongoose.connect(url, {
      dbName: dbName,
      autoIndex: true, // Crea índices automáticamente para acelerar las consultas      
      //useCreateIndex: true, // Usar índices para acelerar las consultas

      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      //useFindAndModify: false // Deshabilitar findAndModify para usar findOneAndUpdate, findOneAndDelete
    });
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Propaga el error para que pueda ser manejado por el código que llama a esta función
  }
}

// Desconecta de la base de datos MongoDB
export async function disconnectFromDatabase(): Promise<void> {
  try {
    // Desconexión de la base de datos
    await mongoose.disconnect();
    console.log('Desconexión de la base de datos exitosa');
  } catch (error) {
    console.error('Error al desconectar de la base de datos:', error);
    throw error; // Propaga el error para que pueda ser manejado por el código que llama a esta función
  }
}
