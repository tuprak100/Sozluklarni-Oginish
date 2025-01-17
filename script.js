const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const nextCardButton = document.getElementById('next-card');
const prevCardButton = document.getElementById('prev-card');
const flipCardButton = document.getElementById('flip-card');
const favoriteButton = document.getElementById('favoriteButton');
const reviewFavoritesButton = document.getElementById('reviewFavorites');
const allCardsButton = document.getElementById('allCardsButton');
const congratulationsMessage = document.getElementById('congratulationsMessage');

let currentCardIndex = 0;
const cards = [
    { front: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/fronts/front_1.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_1.png" },
    { front: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/fronts/front_2.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_2.png" },
    // Add more cards as needed
];

function loadCard(index) {
    front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
    back.innerHTML = `<img src="${cards[index].back}" alt="Back">`;
}

// Flip the card
flipCardButton.addEventListener('click', () => {
    card.classList.toggle('flipped');
});

// Move to the next card
nextCardButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    loadCard(currentCardIndex);
    card.classList.remove('flipped'); // Reset flip when moving to next card
    checkCompletion();
});

// Move to the previous card
prevCardButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length; // Wrap around if index is less than 0
    loadCard(currentCardIndex);
    card.classList.remove('flipped'); // Reset flip when moving to previous card
    checkCompletion();
});

// Check if all cards have been reviewed
function checkCompletion() {
    if (currentCardIndex === cards.length - 1) {
        congratulationsMessage.textContent = "Congratulations! You've finished all the flashcards!";
        congratulationsMessage.style.display = 'block';
    } else {
        congratulationsMessage.style.display = 'none';
    }
}

// Favorite button logic
favoriteButton.addEventListener('click', () => {
    favoriteButton.textContent = favoriteButton.textContent === '☆' ? '★' : '☆';
});

// Review favorites button
reviewFavoritesButton.addEventListener('click', () => {
    alert("Review favorites is not implemented yet.");
});

// Show all cards button
allCardsButton.addEventListener('click', () => {
    currentCardIndex = 0;
    loadCard(currentCardIndex);
    card.classList.remove('flipped'); // Reset flip when showing all cards
    congratulationsMessage.style.display = 'none'; // Hide congratulations message
});

// Initialize with the first card
loadCard(currentCardIndex);

// Background music (optional feature)
const music = document.getElementById('background-music');
music.play();
