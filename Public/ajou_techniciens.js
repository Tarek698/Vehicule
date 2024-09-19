document.getElementById('technicienForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const technicien = {
        id_technicien: document.getElementById('id_technicien').value,
        nom: document.getElementById('nom').value,
        specialite: document.getElementById('specialite').value,
        prenom: document.getElementById('prenom').value,
        adresse: document.getElementById('adresse').value,
        numero_telephone: document.getElementById('numero_telephone').value
    };

    fetch('/techniciens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(technicien)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('technicienForm').reset();
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout du technicien :', error);
    });
});

