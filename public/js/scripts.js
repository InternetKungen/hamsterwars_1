// scripts.js 

const hamsterContainer = document.getElementById('hamster-container');
let hamsterPair = null;

// Hämta hamsterparet och spara dem
fetch('http://localhost:3000/hamsters/pair')
    .then(response => response.json())
    .then(hamsters => {
        hamsterPair = hamsters;
        hamsters.forEach(hamster => {
            const hamsterCard = document.createElement('div');
            hamsterCard.classList.add('hamster-card');
            hamsterCard.innerHTML = `
                <h2>${hamster.name}</h2>
                <div class="score-container">
                <h3>Vinster: <strong>${hamster.votes[0].won}</strong></h3>
                <h3>Förluster: <strong>${hamster.votes[0].lost}</strong></h3>
                </div>
                <img src="${hamster.ref}" alt="${hamster.name}" width="200">
            `;
            hamsterCard.dataset.id = hamster.id; // Lägg till data-id attribut
            hamsterCard.addEventListener('click', () => vote(hamster.id));
            hamsterContainer.appendChild(hamsterCard);
        });
    });

// Rösta på en hamster
function vote(wonId) {
    const lostId = hamsterPair.find(hamster => hamster.id !== wonId).id;
    fetch(`http://localhost:3000/hamsters/pair/${wonId}/${lostId}`, { method: 'PATCH' })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Hamster pair updated') {
                alert('Tack för din röst!');
                hamsterContainer.innerHTML = '';
                location.reload();
            } else {
                alert('Något gick fel. Försök igen.');
            }
        });
}


// Lista hamstrarna

const hamsterList = document.getElementById('hamster-list');
const addHamsterButton = document.getElementById('add-hamster');

// Funktion för att visa samtliga hamstrar
function displayAllHamsters() {
    fetch('http://localhost:3000/hamsters')
        .then(response => response.json())
        .then(hamsters => {
            hamsterList.innerHTML = ''; // Rensa listan innan du lägger till nya hamstrar
            hamsters.forEach(hamster => {
                const hamsterItem = document.createElement('div');
                hamsterItem.classList.add('hamster-item');
                hamsterItem.innerHTML = `
                    <h2>${hamster.name}</h2>
                    <div class="score-container">
                    <h3>Vinster: ${hamster.votes[0].won}</h3>
                    <h3>Förluster: ${hamster.votes[0].lost}</h3>
                    </div>
                    <img src="${hamster.ref}" alt="${hamster.name}" width="200">
                    <button class="delete-button" data-id="${hamster.id}">🚮</button>
                `;
                hamsterList.appendChild(hamsterItem);
            });
        });
}

// Ladda samtliga hamstrar när sidan laddas
window.onload = displayAllHamsters;

function addHamster(event) {
    event.preventDefault(); // Förhindra att formuläret skickar vanlig POST-förfrågan

    // Hämta formulärdata
    const hamsterId = document.getElementById('hamster-id').value;
    const hamsterName = document.getElementById('hamster-name').value;
    const hamsterImage = document.getElementById('hamster-image').value;

    // Skapa ett objekt med formulärdata
    const newHamster = {
        id: parseInt(hamsterId),
        name: hamsterName,
        ref: hamsterImage,
        votes: [{ lost: 0, won: 0 }] // Lägg till en standardvotes-array för den nya hamstern
    };

    // Skicka POST-förfrågan till servern för att lägga till den nya hamstern
    fetch('http://localhost:3000/hamsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newHamster)
    })
    .then(response => {
        if (response.ok) {
            alert('Ny hamster har lagts till!');
            displayAllHamsters(); // Uppdatera listan med hamstrar efter tillägg
        } else {
            alert('Något gick fel. Försök igen.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Något gick fel. Försök igen.');
    });
}

// Lyssna på submit-eventet för formuläret för att lägga till en ny hamster
const addHamsterForm = document.getElementById('add-hamster-form');
addHamsterForm.addEventListener('submit', addHamster);

// Lyssna på klick på "Ta bort"-knapparna för varje hamster
hamsterList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-button')) {
        const hamsterId = event.target.dataset.id;
        deleteHamster(hamsterId);
    }
});

// Funktion för att ta bort en hamster
function deleteHamster(id) {
    fetch(`http://localhost:3000/hamsters/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Hamstern har tagits bort!');
                displayAllHamsters(); // Uppdatera listan med hamstrar efter borttagning
            } else {
                alert('Något gick fel. Försök igen.');
            }
        });
}
