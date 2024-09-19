const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});

app.post('/modifier_voiture', (req, res) => {
    const { voitureId, reparations, etat } = req.body;
    console.log('POST /modifier_voiture called with:', req.body);

    if (!voitureId || !reparations || !etat) {
        console.log('Missing required fields:', { voitureId, reparations, etat });
        res.status(400).send('Missing required fields.');
        return;
    }

    const query = `INSERT INTO reparations (ID_Voiture, Description, Statut) VALUES (?, ?, ?)`;
    console.log('Executing query:', query);

    db.query(query, [voitureId, reparations, etat], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Error inserting data.');
            return;
        }
        console.log('Data inserted successfully:', results);
        res.send('Data inserted successfully.');
    });
});


app.post('/voitures', (req, res) => {
    const voiture = req.body;
    console.log('Données reçues pour la voiture:', voiture); // Log des données reçues

    const sql = `
        INSERT INTO voitures (Plaque_Immatriculation, Modele, Annee, Etat_Roulant)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        Modele = VALUES(Modele),
        Annee = VALUES(Annee),
        Etat_Roulant = VALUES(Etat_Roulant)
    `;
    const values = [
        voiture.plaque,
        voiture.modele,
        voiture.annee,
        voiture.etat
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de la voiture :', err);
            res.status(500).send('Erreur lors de l\'insertion de la voiture : ' + err.sqlMessage);
            return;
        }
        res.send('Voiture ajoutée ou mise à jour');
    });
});

app.post('/techniciens', (req, res) => {
    const technicien = req.body;
    console.log('Données reçues pour le technicien:', technicien);

    const sql = `
        INSERT INTO techniciens (ID_Technicien, Nom, Specialite, Prenom, Adresse, Numero_Telephone)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        Nom = VALUES(Nom),
        Specialite = VALUES(Specialite),
        Prenom = VALUES(Prenom),
        Adresse = VALUES(Adresse),
        Numero_Telephone = VALUES(Numero_Telephone)
    `;
    const values = [
        technicien.id_technicien,
        technicien.nom,
        technicien.specialite,
        technicien.prenom,
        technicien.adresse,
        technicien.numero_telephone
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion du technicien :', err);
            res.status(500).send('Erreur lors de l\'insertion du technicien : ' + err.sqlMessage);
            return;
        }
        res.send('Technicien ajouté ou mis à jour');
    });
});

app.post('/associations', (req, res) => {
    const association = req.body;
    console.log('Données reçues pour l\'association:', association);

    const sql = 'INSERT INTO associations SET ?';
    db.query(sql, association, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de l\'association :', err.sqlMessage);
            res.status(500).send('Erreur lors de l\'insertion de l\'association : ' + err.sqlMessage);
            return;
        }
        res.send('Association ajoutée');
    });
});

app.get('/voitures', (req, res) => {
    const sql = 'SELECT Plaque_Immatriculation FROM voitures';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des voitures :', err.sqlMessage);
            res.status(500).send('Erreur lors de la récupération des voitures : ' + err.sqlMessage);
            return;
        }
        res.json(result);
    });
});

app.get('/techniciens', (req, res) => {
    const sql = 'SELECT ID_Technicien, Nom, Prenom FROM techniciens';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des techniciens :', err.sqlMessage);
            res.status(500).send('Erreur lors de la récupération des techniciens : ' + err.sqlMessage);
            return;
        }
        res.json(result);
    });
});

app.get('/associations', (req, res) => {
    const sql = `
        SELECT 
            associations.id, 
            techniciens.Nom AS technicien_nom, 
            techniciens.Prenom AS technicien_prenom, 
            voitures.Plaque_Immatriculation AS voiture_plaque 
        FROM 
            associations
        JOIN 
            techniciens ON associations.technicien_id = techniciens.ID_Technicien
        JOIN 
            voitures ON associations.voiture_id = voitures.Plaque_Immatriculation
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des associations :', err.sqlMessage);
            res.status(500).send('Erreur lors de la récupération des associations : ' + err.sqlMessage);
            return;
        }
        res.json(result);
    });
});

app.delete('/supprimer_voiture', (req, res) => {
    const voitureId = req.query.id; // Récupérer l'ID de la voiture à supprimer depuis la requête

    // Exécuter une requête SQL pour supprimer la voiture de la base de données
    const sql = 'DELETE FROM voitures WHERE Plaque_Immatriculation = ?';
    db.query(sql, voitureId, (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de la voiture :', err);
            res.status(500).send('Erreur lors de la suppression de la voiture');
            return;
        }
        res.send('Voiture supprimée avec succès');
    });
});
app.delete('/supprimer_association', (req, res) => {
    const associationId = req.query.id;
    const sql = 'DELETE FROM associations WHERE id = ?';
    db.query(sql, [associationId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'association :', err);
            res.status(500).send('Erreur lors de la suppression de l\'association');
            return;
        }
        res.send('Association supprimée');
    });
});
app.delete('/supprimer_technicien', (req, res) => {
    const technicienId = req.query.id;
    const sql = 'DELETE FROM techniciens WHERE ID_Technicien = ?';
    db.query(sql, technicienId, (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du technicien :', err);
            res.status(500).send('Erreur lors de la suppression du technicien');
            return;
        }
        res.send('Technicien supprimé');
    });
});

app.get('/historique_voitures', (req, res) => {
    const voitureId = req.query.id;

    if (!voitureId) {
        return res.status(400).json({ error: 'ID de voiture manquant' });
    }

    const sql = `
        SELECT 
            associations.id, 
            associations.date_association,  
            voitures.Plaque_Immatriculation,
            techniciens.Nom AS nom_technicien
        FROM 
            associations
        JOIN 
            voitures ON associations.voiture_id = voitures.Plaque_Immatriculation
        JOIN
            techniciens ON associations.technicien_id = techniciens.ID_Technicien
        WHERE 
            voitures.Plaque_Immatriculation = ?`;

    db.query(sql, [voitureId], (err, result) => {
        if (err) {
            console.error(`Erreur lors de la récupération de l'historique pour la voiture ${voitureId} :`, err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        res.json(result);
    });
});

app.get('/reparations_voiture', (req, res) => {
    const voitureId = req.query.id;

    if (!voitureId) {
        return res.status(400).json({ error: 'ID de voiture manquant' });
    }

    const sql = `
    SELECT 
        reparations.ID_Reparation,
        reparations.Description,
        reparations.Statut,
        reparations.Date_Constatation,
        associations.voiture_id,
        associations.reparation_id
    FROM 
        reparations
    JOIN 
        associations ON reparations.ID_Reparation = associations.reparation_id
    WHERE 
        associations.voiture_id = ?`;


    db.query(sql, [voitureId], (err, result) => {
        if (err) {
            console.error(`Erreur lors de la récupération des réparations pour la voiture ${voitureId} :`, err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        res.json(result);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});









