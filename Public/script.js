document.addEventListener('DOMContentLoaded', async () => {
    const responseVoitures = await fetch('/voitures');
    const voitures = await responseVoitures.json();

    const responseTechniciens = await fetch('/techniciens');
    const techniciens = await responseTechniciens.json();

    const voitureSelect = document.getElementById('voiture');
    const technicienSelect = document.getElementById('technicien');

    voitures.forEach(voiture => {
        const option = document.createElement('option');
        option.value = voiture.Plaque_Immatriculation;
        option.textContent = voiture.Plaque_Immatriculation;
        voitureSelect.appendChild(option);
    });

    techniciens.forEach(technicien => {
        const option = document.createElement('option');
        option.value = technicien.ID_Technicien;
        option.textContent = `${technicien.Nom} ${technicien.Prenom}`;
        technicienSelect.appendChild(option);
    });

    document.getElementById('associationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const association = {
            technicien_id: document.getElementById('technicien').value,
            voiture_id: document.getElementById('voiture').value
        };
        const response = await fetch('/associations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(association)
        });
        if (response.ok) {
            alert('Association ajoutée');
        } else {
            alert('Erreur lors de l\'ajout de l\'association');
        }
    });
});



