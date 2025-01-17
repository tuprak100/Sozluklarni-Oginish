const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const nextCardButton = document.getElementById('next-card');
const flipCardButton = document.getElementById('flip-card');
const music = document.getElementById('background-music');
let currentCardIndex = 0;

const cards = [
  { front: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/fronts/front_1.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_1.png" },
  { front: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/fronts/front_2.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_2.png" },
  // ... more cards
];

function loadCard(index) {
  front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
  back.innerHTML = `<img src="${cards[index].back}" alt="Back">`;
}

nextCardButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  loadCard(currentCardIndex);
  card.classList.remove('flipped'); // Reset flip
});

flipCardButton.addEventListener('click', () => {
  card.classList.toggle('flipped');
});

music.play();
loadCard(currentCardIndex); // Load the first card
