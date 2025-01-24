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
let numCards = 19;
const cards = [];
const repoUrl = "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs";

for (let i = 1; i <= numCards; i++) {
    cards.push({
        front: `images/fronts/front_${i}.png`,
        back: `${repoUrl}/back_${i}.png`,
        isFavorited: false // Add a property to track favorited cards
    });
}

function loadCard(index) {
    // Front image path
    front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
    cardNumberDisplay.textContent = `Card ${index + 1} of ${cards.length}`;
    
    // Back image fetch with error handling
    fetch(cards[index].back)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load back image');
            }
            return response.blob();
        })
        .then(data => {
            const imageUrl = URL.createObjectURL(data);
            back.innerHTML = `<img src="${imageUrl}" alt="Back">`;
        })
        .catch(error => {
            console.error(error);
            back.innerHTML = `<p>Error loading back image</p>`; // Fallback text
        });

    // Toggle favorite state
    favoriteButton.classList.toggle('favorited', cards[index].isFavorited);
}

const cardSound = document.getElementById('background-music');

// Ensure the audio plays after the page has loaded or through user interaction
cardSound.loop = true;
cardSound.play().catch((error) => {
    console.error('Failed to play music:', error);
});

nextCardButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    loadCard(currentCardIndex);
    card.classList.remove('flipped');
});

prevCardButton.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    loadCard(currentCardIndex);
    card.classList.remove('flipped');
});

flipCardButton.addEventListener('click', () => {
    card.classList.toggle('flipped');
});

favoriteButton.addEventListener('click', () => {
    cards[currentCardIndex].isFavorited = !cards[currentCardIndex].isFavorited; // Update the card's favorite status
    favoriteButton.classList.toggle('favorited', cards[currentCardIndex].isFavorited); // Toggle the class
});

reviewFavoritesButton.addEventListener('click', () => {
    const favoriteCards = cards.filter(card => card.isFavorited);
    if (favoriteCards.length > 0) {
        currentCardIndex = cards.indexOf(favoriteCards[0])
        loadCard(currentCardIndex);
        numCards = favoriteCards.length;
        cards.length = 0;
        cards.push(...favoriteCards);
    }
});

allCardsButton.addEventListener('click', () => {
    numCards = 8;
    cards.length = 0;
    for (let i = 1; i <= numCards; i++) {
        cards.push({
            front: `images/fronts/front_${i}.png`,
            back: `${repoUrl}/back_${i}.png`,
            isFavorited: false // Add a property to track favorited cards
        });
    }
    currentCardIndex = 0;
    loadCard(currentCardIndex);
});
