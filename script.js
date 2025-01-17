const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const nextCardButton = document.getElementById('next-card');
const flipCardButton = document.getElementById('flip-card');
const music = document.getElementById('background-music');
let currentCardIndex = 0;
const cards = [
  { front: "images/front_1.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/back_1.png" },
  { front: "images/front_2.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/back_2.png" },
  // ... more cards
];

function loadCard(index) {
  front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
  fetch(cards[index].back)
    .then(response => response.blob()) // Or response.blob() for images; response.text for texts.
    .then(data => {
      const imageUrl = URL.createObjectURL(data); // Create a temporary URL for the image blob
      back.innerHTML = `<img src="${imageUrl}" alt="Back">`;
    });
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
