document.addEventListener('DOMContentLoaded', async () => {
    // Function to load and display associations
    async function loadAssociations() {
        const responseAssociations = await fetch('/associations');
        const associations = await responseAssociations.json();

        const associationList = document.getElementById('associationList');

        // Clear existing options
        associationList.innerHTML = '<option value="">Sélectionnez une Association</option>';

        associations.forEach(association => {
            const option = document.createElement('option');
            option.value = association.id; // You may want to set value to association ID
            option.textContent = `Technicien: ${association.technicien_nom} ${association.technicien_prenom} - Voiture: ${association.voiture_plaque}`;
            associationList.appendChild(option);
        });
    }

    // Load associations on page load
    await loadAssociations();
});
document.getElementById('supprimerBtn').addEventListener('click', async () => {
    const associationSelect = document.getElementById('associationList'); // Ajout de cette ligne pour récupérer l'élément associationList
    const selectedAssociationId = associationSelect.value;
    if (selectedAssociationId) {
        const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette association ?');
        if (confirmation) {
            // Envoyer une requête pour supprimer l'association sélectionnée
            const response = await fetch(`/supprimer_association?id=${selectedAssociationId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Association supprimée avec succès.');
                // Recharger la page pour mettre à jour la liste des associations
                window.location.reload();
            } else {
                alert('Erreur lors de la suppression de l\'association.');
            }
        }
    } else {
        alert('Veuillez sélectionner une association.');
    }
});
