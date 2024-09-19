document.getElementById('voitureForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const voiture = {
        plaque: document.getElementById('plaque').value,
        modele: document.getElementById('modele').value,
        annee: document.getElementById('annee').value,
        etat: document.getElementById('etat').value
    };

    console.log('Envoi des données de la voiture:', voiture); // Ajoutez cette ligne

    fetch('/voitures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(voiture)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('voitureForm').reset();
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout de la voiture :', error);
    });
});



