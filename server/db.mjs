import { Level } from 'level'

const db = new Level('db', { repair: true });

try {
  await db.open();
  console.log('Database opened successfully.');
} catch (error) {
  console.error('Failed to open database:', error);
  if (error.code === 'LEVEL_LOCKED') {
    console.log('Another process or instance has opened the database.');
  } else if (error.code === 'LEVEL_IO_ERROR') {
    console.error('Database error:', error);
    console.log('Please check if the database file exists and has the correct permissions.');
  }
  process.exit(1);
}

// Compact the database to reduce disk usage
db.on('ready', () => {
  db.compactRange([], (err) => {
    if (err) {
      console.error('Failed to compact database:', err);
    } else {
      console.log('Database compacted successfully.');
    }
  });
});

export default db;
