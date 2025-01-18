const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const cardNumberDisplay = document.getElementById('card-number');
const nextCardButton = document.getElementById('next-card-button'); // Corrected IDs
const prevCardButton = document.getElementById('prev-card-button');
const flipCardButton = document.getElementById('flip-card-button');
const favoriteButton = document.getElementById('favoriteButton');
const reviewFavoritesButton = document.getElementById('reviewFavorites');
const allCardsButton = document.getElementById('allCardsButton'); // Added
let isFavorited = false; // Track favorite state
const music = document.getElementById('background-music');
let currentCardIndex = 0;

// Corrected cards array to use correct image names and full paths
const numCards = 8;
const cards = [];
const repoUrl = "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs"; // Base URL for back images

for (let i = 1; i <= numCards; i++) {
  cards.push({
    front: `images/fronts/front_${i}.png`,
    back: `${repoUrl}/back_${i}.png` // Use the raw URL
  });
}

function loadCard(index) {
  front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
  cardNumberDisplay.textContent = `Card ${currentCardIndex + 1} of ${cards.length}`; // Use cards.length for total cards
  fetch(cards[index].back)
    .then(response => response.blob())
    .then(data => {
      const imageUrl = URL.createObjectURL(data);
      back.innerHTML = `<img src="${imageUrl}" alt="Back">`;
    });
}

nextCardButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % cards.length; // Use modulo for looping
  loadCard(currentCardIndex);
  card.classList.remove('flipped');
});

prevCardButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length; // Corrected previous card logic.
  loadCard(currentCardIndex);
  card.classList.remove('flipped');
});

flipCardButton.addEventListener('click', () => {
  card.classList.toggle('flipped');
});

favoriteButton.addEventListener('click', () => {
  isFavorited = !isFavorited;
  favoriteButton.classList.toggle('favorited', isFavorited); // Toggle the class
  console.log("Card favorited:", isFavorited); // For testing
});

reviewFavoritesButton.addEventListener('click', () => {
  console.log("Reviewing favorites..."); // Placeholder for review logic
  // Add your logic to display only favorited cards here
});

allCardsButton.addEventListener('click', () => {
  // Add your logic to show all cards here (optional)
  console.log("Show all cards button clicked!");
});

music.play();
loadCard(currentCardIndex);
