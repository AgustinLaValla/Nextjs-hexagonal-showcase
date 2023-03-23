import { config } from '@/config';
import { connect, disconnect, connections } from 'mongoose';
import { green, yellow, blue } from 'colors';

const db_connections = {
  isConnected: 0
}

export const db = {
  connect: async () => {

    const { isConnected } = db_connections;

    if (isConnected) return console.log(`${blue('Database is already connected')}`)

    if (!!connections.length) {
      db_connections.isConnected = connections[0].readyState;
      if (db_connections.isConnected === 1) return console.log(`${blue('Using previous connection')}`);

      await disconnect();
    }

    await connect(config.dbConnectionURL);
    db_connections.isConnected = 1;
    console.log(`${green('Server on port: ')} ${yellow(String(config.httpPort))}`)
  },

  disconnect: async () => await disconnect()
}
