import PouchDB from 'pouchdb'

const db = new PouchDB('db');


// Open the database
(async () => {
  try {
    await db.info(); // Using info() to check if the database is accessible
    console.log('Database opened successfully.');
  } catch (error) {
    console.error('Failed to open database:', error);
    process.exit(1);
  }
})();

export default db;
