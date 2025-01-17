const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const nextCardButton = document.getElementById('next-button');
const flipCardButton = document.getElementById('flip-button');
const favoriteButton = document.getElementById('favoriteButton');
const reviewFavoritesButton = document.getElementById('reviewFavorites');
const allCardsButton = document.getElementById('allCardsButton'); // Add this button
const congratulationsMessage = document.createElement('p');
congratulationsMessage.textContent = "Congratulations! You've finished all the flashcards!";
congratulationsMessage.style.display = 'none';
congratulationsMessage.style.fontSize = '2em';
congratulationsMessage.style.color = 'green';
congratulationsMessage.style.textAlign='center';
document.getElementById('card-container').appendChild(congratulationsMessage);

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

// Flip the card
flipButton.addEventListener('click', () => {
  card.classList.toggle('flipped');
});

// Move to the next card
nextCardButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  loadCard(currentCardIndex);
  card.classList.remove('flipped'); // Reset flip when moving to next card
});


favoriteButton.addEventListener('click', () => {
    images[currentCard].favorite = !images[currentCard].favorite;
    favoriteButton.textContent = images[currentCard].favorite ? "★" : "☆";
        if (images[currentCard].favorite) {
        favoriteButton.classList.add("favorited");
      } else {
        favoriteButton.classList.remove("favorited");
      }
    showCard();
});

reviewFavoritesButton.addEventListener('click', () => {
    favoriteWords = images.filter(card => card.favorite);
    if (favoriteWords.length === 0) {
        alert("No favorite words selected yet.");
        return;
    }
    images = favoriteWords;
    currentCard = 0;
    isReviewingFavorites = true; // Set the flag
    showCard();
});

allCardsButton.addEventListener('click', () => { // Add event listener for the new button
    images = originalImages;// Restore the original images
    currentCard = 0;
    isReviewingFavorites = false;// Reset the flag
    showCard();
});

// Initialize with the first card
loadCard(currentCardIndex);

music.play();
loadCard(currentCardIndex); // Load the first card
