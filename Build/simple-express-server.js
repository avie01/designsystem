const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve pre-built files from dist-example directory
app.use(express.static(path.join(__dirname, 'dist-example')));

// Serve assets
app.use('/assets', express.static(path.join(__dirname, 'dist-example/assets')));

// Serve src files if needed
app.use('/src', express.static(path.join(__dirname, 'src')));

// Default route serves the built index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist-example', 'index.html'));
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist-example', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log('\n✅ Simple Express Server Running!\n');
  console.log(`   Server: http://localhost:${PORT}/\n`);
  console.log('📄 Serving pre-built application from dist-example/\n');
  console.log('⚠️  Note: This serves the pre-built version.');
  console.log('   To see changes, you need to rebuild the project.\n');
});