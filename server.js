// Require les modules
const path = require('path');
const express = require('express');

// Crée le serveur web avec express
const app = express();

// Lie la route principal au dossier public puis cherche le index.html
app.use(express.static(path.join(__dirname, 'public')));

// Initialise le port à 3000
const PORT = 3000 || process.env.PORT;

// Le serveur écoute sur le port initialisé précédemment & console.log via un callback l'url
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT} \nApp running at:\n- Local: http://localhost:${PORT}/`));