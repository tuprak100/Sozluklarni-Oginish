const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const nextCardButton = document.getElementById('next-card');
const prevCardButton = document.getElementById('prev-card');
const flipCardButton = document.getElementById('flip-card');
const favoriteButton = document.getElementById('favoriteButton');
const reviewFavoritesButton = document.getElementById('reviewFavorites');
const allCardsButton = document.getElementById('allCardsButton');
const music = document.getElementById('background-music');

let currentCardIndex = 0;
let isFlipped = false;

const cards = [
  { front: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/fronts/front_1.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_1.png" },
  { front: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/fronts/front_2.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_2.png" },
  // Add more cards here as needed
];

function loadCard(index) {
  front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
  back.innerHTML = `<img src="${cards[index].back}" alt="Back">`;
}

function flipCard() {
  isFlipped = !isFlipped;
  card.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
}

nextCardButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  loadCard(currentCardIndex);
  isFlipped = false; // Reset flip when moving to next card
  flipCard(); // Reset flip state
});

prevCardButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
  loadCard(currentCardIndex);
  isFlipped = false; // Reset flip when moving to previous card
  flipCard(); // Reset flip state
});

flipCardButton.addEventListener('click', () => {
  flipCard();
});

// Initialize with the first card
loadCard(currentCardIndex);
music.play();
