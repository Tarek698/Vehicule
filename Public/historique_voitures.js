document.addEventListener('DOMContentLoaded', async () => {
    // Récupérer l'identifiant de la voiture à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const voitureId = urlParams.get('id');

    console.log("Voiture ID:", voitureId); // Ajout du log pour vérifier l'ID de la voiture

    // Vérifier si l'identifiant de la voiture est présent dans l'URL
    if (voitureId) {
        try {
            // Envoyer une requête au serveur pour récupérer l'historique de la voiture
            const responseHistorique = await fetch(`/historique_voitures?id=${voitureId}`);
            const historique = await responseHistorique.json();
            console.log("Historique:", historique); // Ajout du log pour vérifier l'historique récupéré

            // Envoyer une requête au serveur pour récupérer les réparations de la voiture
            const responseReparations = await fetch(`/reparations_voiture?id=${voitureId}`);
            const reparations = await responseReparations.json();
            console.log("Réparations:", reparations); // Ajout du log pour vérifier les réparations récupérées

            // Créer un map pour accéder aux descriptions de réparation par leur ID de réparation
            const reparationsMap = new Map();
            reparations.forEach(reparation => {
                // Vérifier si la clé existe déjà dans la carte
                if (reparationsMap.has(reparation.ID_Reparation)) {
                    // Si la clé existe, ajouter la description à un tableau existant
                    reparationsMap.get(reparation.ID_Reparation).push(reparation.Description);
                } else {
                    // Si la clé n'existe pas, créer un nouveau tableau avec la description
                    reparationsMap.set(reparation.ID_Reparation, [reparation.Description]);
                }
            });

            // Afficher les données d'historique et de réparations dans la page HTML
            const historiqueContainer = document.getElementById('historiqueContainer');
            historique.forEach(item => {
                const listItem = document.createElement('div');
                // Utiliser l'ID de réparation pour obtenir le tableau de descriptions associées
                const reparationDescriptions = reparationsMap.get(item.ID_Reparation);

                // Convertir le tableau de descriptions en une chaîne pour affichage
                const reparationDescription = reparationDescriptions ? reparationDescriptions.join(', ') : 'Aucune réparation';
                listItem.textContent = `Plaque d'immatriculation: ${item.Plaque_Immatriculation}, Date: ${item.date_association}, Réparation: ${reparationDescription}, Technicien: ${item.nom_technicien}`;
                historiqueContainer.appendChild(listItem);
            });

        } catch (error) {
            console.error('Erreur:', error);
        }
    } else {
        // Si l'identifiant de la voiture n'est pas présent dans l'URL, afficher un message d'erreur
        const historiqueContainer = document.getElementById('historiqueContainer');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Aucune voiture sélectionnée.';
        historiqueContainer.appendChild(errorMessage);
    }

    // Ajouter un événement au bouton "Revenir"
    const revenirButton = document.getElementById('revenirButton');
    revenirButton.addEventListener('click', () => {
        // Rediriger vers la page des voitures (modifier l'URL selon vos besoins)
        window.location.href = '/voitures.html'; // Remplacez '/voitures.html' par l'URL de votre page des voitures
    });
});
