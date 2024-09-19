document.getElementById('modifierVoitureForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const voitureId = urlParams.get('id'); // Suppose que l'ID de la voiture est passé en paramètre dans l'URL
    const reparations = document.getElementById('reparations').value;
    const etat = document.getElementById('etat').value;

    const data = { voitureId, reparations, etat };

    console.log('Sending data to server:', data); // Log avant l'envoi

    fetch('http://localhost:5000/modifier_voiture', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log('Response received from server:', response);
        if (response.ok) {
            window.location.href = 'voitures.html'; // Redirection vers voitures.html
        } else {
            return response.text();
        }
    })
    .then(data => {
        console.log('Response data:', data);
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    });



