document.addEventListener('DOMContentLoaded', async () => {
    // Récupérer la liste des techniciens depuis le serveur
    const responseTechniciens = await fetch('/techniciens');
    const techniciens = await responseTechniciens.json();

    const technicienSelect = document.getElementById('technicien');

    // Ajouter chaque technicien comme une option dans la liste déroulante
    techniciens.forEach(technicien => {
        const option = document.createElement('option');
        option.value = technicien.ID_Technicien;
        option.textContent = `${technicien.Nom} ${technicien.Prenom}`;
        technicienSelect.appendChild(option);
    });

    // Écouter l'événement de clic sur le bouton "Historique"
    document.getElementById('historiqueBtn').addEventListener('click', () => {
        const selectedTechnicienId = technicienSelect.value;
        if (selectedTechnicienId) {
            // Rediriger vers l'historique du technicien sélectionné
            window.location.href = `/historique_technicien?id=${selectedTechnicienId}`;
        } else {
            alert('Veuillez sélectionner un technicien.');
        }
    });

    // Écouter l'événement de clic sur le bouton "Supprimer"
    document.getElementById('supprimerBtn').addEventListener('click', async () => {
        const selectedTechnicienId = technicienSelect.value;
        if (selectedTechnicienId) {
            const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce technicien ?');
            if (confirmation) {
                // Envoyer une requête pour supprimer le technicien sélectionné
                const response = await fetch(`/supprimer_technicien?id=${selectedTechnicienId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Technicien supprimé avec succès.');
                    // Recharger la page pour mettre à jour la liste des techniciens
                    window.location.reload();
                } else {
                    alert('Erreur lors de la suppression du technicien.');
                }
            }
        } else {
            alert('Veuillez sélectionner un technicien.');
        }
    });
});
document.getElementById('supprimerBtn').addEventListener('click', async () => {
    const technicienSelect = document.getElementById('technicienList');
    const selectedTechnicienId = technicienSelect.value;
    if (selectedTechnicienId) {
        const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce technicien ?');
        if (confirmation) {
            // Envoyer une requête pour supprimer le technicien sélectionné
            const response = await fetch(`/supprimer_technicien?id=${selectedTechnicienId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Technicien supprimé avec succès.');
                // Recharger la page pour mettre à jour la liste des techniciens
                window.location.reload();
            } else {
                alert('Erreur lors de la suppression du technicien.');
            }
        }
    } else {
        alert('Veuillez sélectionner un technicien.');
    }
});
