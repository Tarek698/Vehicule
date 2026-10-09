# Gestion de parc automobile — atelier

Application web de gestion d'un atelier de réparation : véhicules, techniciens, affectations et historique des réparations.

## Fonctionnalités

- Ajout et suppression de véhicules (plaque, modèle, année, état)
- Ajout et suppression de techniciens
- Association véhicule ↔ technicien
- Saisie des réparations et suivi de leur statut
- Historique des réparations par véhicule

## Stack

- **Back-end** : Node.js, Express, MySQL
- **Front-end** : HTML / CSS / JavaScript (dossier `Public/`)
- Requêtes SQL paramétrées (protection contre l'injection SQL)

## Installation

```bash
npm install
```

Configurer la connexion à la base via des variables d'environnement (valeurs par défaut entre parenthèses) :

| Variable | Rôle |
|---|---|
| `DB_HOST` | hôte MySQL (`localhost`) |
| `DB_USER` | utilisateur (`root`) |
| `DB_PASSWORD` | mot de passe (vide) |
| `DB_NAME` | base de données (`test`) |

```bash
DB_USER=atelier DB_PASSWORD=******** DB_NAME=atelier npm start
```

Le serveur écoute sur http://localhost:5000.

Tables utilisées : `voitures`, `techniciens`, `associations`, `reparations`.
