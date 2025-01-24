const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Middleware pour analyser le corps de la requête (JSON)
app.use(bodyParser.json());
app.use(express.static('public'));  // Sert les fichiers statiques (HTML, CSS, JS)

// Créer ou ouvrir la base de données SQLite
const db = new sqlite3.Database('./contacts.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données SQLite:', err.message);
  } else {
    console.log('Connexion à la base de données SQLite réussie');
  }
});

// Créer la table "contacts" si elle n'existe pas
db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT ,
    message TEXT 
  )
`);

// Route pour recevoir les données du formulaire et les enregistrer dans la base de données
app.post('/submit', (req, res) => {
    const { prenom, nom, email, tel, message } = req.body;
  
    // Insertion dans la base de données avec les noms corrects
    const query = 'INSERT INTO contacts (firstname, name, email, phone, message) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [prenom, nom, email, tel, message], function (err) {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données:', err.message);
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(200).json({ message: 'Données enregistrées avec succès' });
      }
    });
  });  

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
