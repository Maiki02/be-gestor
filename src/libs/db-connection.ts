import mongoose from 'mongoose';

const url = 'mongodb+srv://miqueasdavidgentile:tIZkFrbFbGDeH7D9@clustergentile.tsdi0w6.mongodb.net/?retryWrites=true&w=majority'; // Cambia la URL si tu base de datos está alojada en otro lugar
const dbName = 'gestor'; // Cambia el nombre de la base de datos según tu preferencia

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
