import { MongoClient, Db } from 'mongodb';

const url = 'mongodb+srv://miqueasdavidgentile:tIZkFrbFbGDeH7D9@clustergentile.tsdi0w6.mongodb.net/?retryWrites=true&w=majority'; // Cambia la URL si tu base de datos está alojada en otro lugar
const dbName = 'mydatabase'; // Cambia el nombre de la base de datos según tu preferencia

export async function connect(): Promise<Db> {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}
