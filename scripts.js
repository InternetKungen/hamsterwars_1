// scripts.js

document.addEventListener('DOMContentLoaded', async function() {
    const hamstersContainer = document.getElementById('hamsters-container');
    const response = await fetch('/hamsters/pair');
    const pair = await response.json();
  
    for (const hamster of pair) {
      const card = document.createElement('div');
      card.classList.add('hamster-card');
  
      const image = document.createElement('img');
      image.src = hamster.ref;
      card.appendChild(image);
  
      const voteButton = document.createElement('button');
      voteButton.textContent = 'Vote';
      voteButton.addEventListener('click', async function() {
        await vote(hamster._id);
      });
      card.appendChild(voteButton);
  
      hamstersContainer.appendChild(card);
    }
  });
  
  async function vote(hamsterId) {
    const response = await fetch(`/hamsters/pair/vote/${hamsterId}`, {
      method: 'PUT'
    });
  
    if (response.ok) {
      alert('Vote submitted successfully!');
    } else {
      alert('Failed to submit vote.');
    }
  }
  