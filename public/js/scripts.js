//scripts.js

// const hamsterContainer = document.getElementById('hamster-container');

// // Hämta hamsterparet
// fetch('http://localhost:3000/hamsters/pair')
//     .then(response => response.json())
//     .then(hamsters => {
//         hamsters.forEach(hamster => {
//             const hamsterCard = document.createElement('div');
//             hamsterCard.classList.add('hamster-card');
//             hamsterCard.innerHTML = `
//                 <h2>${hamster.name}</h2>
//                 <img src="${hamster.ref}" alt="${hamster.name}" width="200">
//             `;
//             hamsterCard.dataset.id = hamster.id; // Lägg till data-id attribut
//             hamsterCard.addEventListener('click', () => vote(hamster.id));
//             hamsterContainer.appendChild(hamsterCard);
//         });
//     });

// // Rösta på en hamster
// function vote(wonId) {
//     const lostId = Array.from(hamsterContainer.children)
//         .find(card => card.dataset.id !== wonId).dataset.id; // Hitta förlorande hamster-ID
//     fetch(`http://localhost:3000/hamsters/pair/${wonId}/${lostId}`, { method: 'PATCH' })
//         .then(response => response.json())
//         .then(data => {
//             if (data.message === 'Hamster pair updated') {
//                 alert('Tack för din röst!');
//                 hamsterContainer.innerHTML = '';
//                 location.reload();
//             } else {
//                 alert('Något gick fel. Försök igen.');
//             }
//         });
// }




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
















// // Rösta på en hamster
// function vote(wonId) {
//     const lostId = Array.from(hamsterContainer.children)
//         .find(card => card.dataset.id !== wonId).dataset.id; // Hitta förlorande hamster-ID
//     fetch(`http://localhost:3000/hamsters/pair/${wonId}/${lostId}`, { method: 'PATCH' })
//         .then(() => {
//             alert('Tack för din röst!');
//             hamsterContainer.innerHTML = '';
//             location.reload();
//         });
// }

// // Rösta på en hamster
// function vote(wonId) {
//     const lostId = Array.from(hamsterContainer.children)
//         .find(card => card.dataset.id !== wonId).dataset.id; // Hitta förlorande hamster-ID
//     fetch(`http://localhost:3000/hamsters/pair/${wonId}/${lostId}`, { method: 'PATCH' })
//         .then(response => response.json())
//         .then(updatedPair => {
//             // Uppdatera vinst och förlust för den vinnande hamstern
//             const wonHamster = updatedPair.find(hamster => hamster.id === parseInt(wonId));
//             const lostHamster = updatedPair.find(hamster => hamster.id === parseInt(lostId));
//             // Uppdatera den vinnande hamsterns poäng
//             const updatedWonHamster = {
//                 ...wonHamster,
//                 votes: [{
//                     lost: wonHamster.votes[0].lost,
//                     won: wonHamster.votes[0].won + 1 // Öka vinst med 1
//                 }]
//             };
//             // Uppdatera den förlorande hamsterns poäng
//             const updatedLostHamster = {
//                 ...lostHamster,
//                 votes: [{
//                     lost: lostHamster.votes[0].lost + 1, // Öka förlust med 1
//                     won: lostHamster.votes[0].won
//                 }]
//             };
//             // Uppdatera DOM:en eller meddela användaren om uppdateringen
//             if (updatedWonHamster && updatedLostHamster) {
//                 alert('Tack för din röst!');
//                 hamsterContainer.innerHTML = '';
//                 location.reload();
//             } else {
//                 alert('Något gick fel. Försök igen.');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Något gick fel. Försök igen.');
//         });
// }

// // Rösta på en hamster
// function vote(wonId) {
//     const lostId = Array.from(hamsterContainer.children)
//         .find(card => card.dataset.id !== wonId).dataset.id; // Hitta förlorande hamster-ID
//     fetch(`http://localhost:3000/hamsters/pair/${wonId}/${lostId}`, { method: 'PATCH' })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(updatedPair => {
//             // Uppdatera DOM:en eller meddela användaren om uppdateringen
//             if (updatedPair) {
//                 const updatedWonHamster = updatedPair.find(hamster => hamster.id === parseInt(wonId));
//                 const updatedLostHamster = updatedPair.find(hamster => hamster.id === parseInt(lostId));
//                 if (updatedWonHamster && updatedLostHamster) {
//                     alert('Tack för din röst!');
//                     hamsterContainer.innerHTML = '';
//                     location.reload();
//                 } else {
//                     alert('Något gick fel. Försök igen.');
//                 }
//             } else {
//                 alert('Något gick fel. Försök igen.');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Något gick fel. Försök igen.');
//         });
// }
