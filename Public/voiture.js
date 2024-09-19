document.addEventListener('DOMContentLoaded', async () => {
    // Récupérer la liste des voitures depuis le serveur
    const responseVoitures = await fetch('/voitures');
    const voitures = await responseVoitures.json();

    const voitureSelect = document.getElementById('voiture');

    // Ajouter chaque voiture comme une option dans la liste déroulante
    voitures.forEach(voiture => {
        const option = document.createElement('option');
        option.value = voiture.Plaque_Immatriculation;
        option.textContent = voiture.Plaque_Immatriculation;
        voitureSelect.appendChild(option);
    });

    // Écouter l'événement de clic sur le bouton "Historique"
    document.getElementById('historiqueBtn').addEventListener('click', () => {
        const selectedVoitureId = voitureSelect.value;
        if (selectedVoitureId) {
            // Rediriger vers l'historique de la voiture sélectionnée
            window.location.href = `/historique_voitures.html?id=${selectedVoitureId}`;
        } else {
            alert('Veuillez sélectionner une voiture.');
        }
    });

    // Écouter l'événement de clic sur le bouton "Supprimer"
    document.getElementById('supprimerBtn').addEventListener('click', async () => {
        const selectedVoitureId = voitureSelect.value;
        if (selectedVoitureId) {
            const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?');
            if (confirmation) {
                // Envoyer une requête pour supprimer la voiture sélectionnée
                const response = await fetch(`/supprimer_voiture?id=${selectedVoitureId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Voiture supprimée avec succès.');
                    // Recharger la page pour mettre à jour la liste des voitures
                    window.location.reload();
                } else {
                    alert('Erreur lors de la suppression de la voiture.');
                }
            }
        } else {
            alert('Veuillez sélectionner une voiture.');
        }
    });

    // Écouter l'événement de clic sur le bouton "Modifier"
    document.getElementById('modifierBtn').addEventListener('click', async () => {
        const selectedVoitureId = voitureSelect.value;
        if (selectedVoitureId) {
            // Rediriger vers la page de modification de la voiture sélectionnée
            window.location.href = `/modifier_voiture.html?id=${selectedVoitureId}`;
        } else {
            alert('Veuillez sélectionner une voiture.');
        }
    });
});
