const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const cardNumberDisplay = document.getElementById('card-number');
const nextCardButton = document.getElementById('next-card-button');
const prevCardButton = document.getElementById('prev-card-button');
const flipCardButton = document.getElementById('flip-card-button');
const favoriteButton = document.getElementById('favoriteButton');
const reviewFavoritesButton = document.getElementById('reviewFavorites');
const allCardsButton = document.getElementById('allCardsButton');

let currentCardIndex = 0;
let numCards = 350;
const cards = [];
const repoUrl = "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs";

// Populate the cards array with front and back image URLs
for (let i = 1; i <= numCards; i++) {
    cards.push({
        // Front images now also have a PNG and a JPG option
        front: `images/fronts/front_${i}.png`,
        //frontJpg: `images/fronts/front_${i}.jpg`,
        
        // Back images have the same logic
        back: `${repoUrl}/back_${i}.png`,
        //backJpg: `${repoUrl}/back_${i}.jpg`,
        
        isFavorited: false
    });
}


// Example to load the card at a specific index
function loadCard(index) {
    const front = document.getElementById('front');
    const back = document.getElementById('back');
    const card = cards[index];

    // Load the front image with a fallback from PNG to JPG
    const frontPngUrl = `images/fronts/front_${index + 1}.png`;
    const frontJpgUrl = `images/fronts/front_${index + 1}.jpg`;
    
    // Check for PNG, if it fails, check for JPG
    fetch(frontPngUrl)
        .then(response => {
            if (!response.ok) {
                // PNG failed, try JPG
                return fetch(frontJpgUrl);
            }
            return response;
        })
        .then(response => response.blob())
        .then(blob => {
            front.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="Front">`;
        })
        .catch(error => console.error('Error loading front image:', error));

    // Load the back image with a fallback from PNG to JPG
    const backPngUrl = `${repoUrl}/back_${index + 1}.png`;
    const backJpgUrl = `${repoUrl}/back_${index + 1}.jpg`;
    
    // Check for PNG, if it fails, check for JPG
    fetch(backPngUrl)
        .then(response => {
            if (!response.ok) {
                // PNG failed, try JPG
                return fetch(backJpgUrl);
            }
            return response;
        })
        .then(response => response.blob())
        .then(blob => {
            back.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="Back">`;
        })
        .catch(error => console.error('Error loading back image:', error));

    // Update card number and other elements
    cardNumberDisplay.textContent = `Card ${index + 1} of ${cards.length}`;
    favoriteButton.classList.toggle('favorited', card.isFavorited);
    const cardSound = document.getElementById('cardSound');
    cardSound.loop = true;
    cardSound.play();
}

// Load the saved progress from localStorage if available
const savedProgress = localStorage.getItem('flashcardProgress');
if (savedProgress) {
    currentCardIndex = parseInt(savedProgress);
}

// Show the current card based on the saved index or the default starting index
loadCard(currentCardIndex);

// Event listeners for navigation and actions
nextCardButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    loadCard(currentCardIndex);
    card.classList.remove('flipped');
    localStorage.setItem('flashcardProgress', currentCardIndex); // Save the progress
});

prevCardButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    loadCard(currentCardIndex);
    card.classList.remove('flipped');
    localStorage.setItem('flashcardProgress', currentCardIndex); // Save the progress
});

flipCardButton.addEventListener('click', () => {
    card.classList.toggle('flipped');
});

favoriteButton.addEventListener('click', () => {
    cards[currentCardIndex].isFavorited = !cards[currentCardIndex].isFavorited;
    favoriteButton.classList.toggle('favorited', cards[currentCardIndex].isFavorited);
});

reviewFavoritesButton.addEventListener('click', () => {
    const favoriteCards = cards.filter(card => card.isFavorited);
    if (favoriteCards.length > 0) {
        currentCardIndex = cards.indexOf(favoriteCards[0]);
        loadCard(currentCardIndex);
        numCards = favoriteCards.length;
        cards.length = 0;
        cards.push(...favoriteCards);
        localStorage.setItem('flashcardProgress', currentCardIndex); // Save the progress
    }
});

allCardsButton.addEventListener('click', () => {
    numCards = 350;  // Set numCards to 20 to show all the cards
    cards.length = 0;  // Clear the current cards array

    // Populate the cards array with all the 20 cards
    for (let i = 1; i <= numCards; i++) {
        cards.push({
            front: `images/fronts/front_${i}.png`,
            //frontJpg: `images/fronts/front_${i}.jpg`,
            back: `${repoUrl}/back_${i}.png`,
            //backJpg: `${repoUrl}/back_${i}.jpg`,
            isFavorited: false // Add a property to track favorited cards
        });
    }

    // Reset the current card index and load the first card
    currentCardIndex = 0;
    loadCard(currentCardIndex);
    localStorage.setItem('flashcardProgress', currentCardIndex); // Save the progress
});
