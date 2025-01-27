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
let numCards = 20;
const cards = [];
const repoUrl = "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs";

for (let i = 1; i <= numCards; i++) {
    cards.push({
        front: `images/fronts/front_${i}.png`,
        back: `${repoUrl}/back_${i}.png`,
        isFavorited: false
    });
}

function loadCard(index) {
    front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
    cardNumberDisplay.textContent = `Card ${index + 1} of ${cards.length}`;
    
    fetch(cards[index].back)
        .then(response => response.blob())
        .then(data => {
            const imageUrl = URL.createObjectURL(data);
            back.innerHTML = `<img src="${imageUrl}" alt="Back">`;
        });

    favoriteButton.classList.toggle('favorited', cards[index].isFavorited);
}
    
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
    }
});

allCardsButton.addEventListener('click', () => {
    numCards = 20;  // Set numCards to 20 to show all the cards
    cards.length = 0;  // Clear the current cards array

    // Populate the cards array with all the 19 cards
    for (let i = 1; i <= numCards; i++) {
        cards.push({
            front: `images/fronts/front_${i}.png`,
            back: `${repoUrl}/back_${i}.png`,
            isFavorited: false // Add a property to track favorited cards
        });
    }

    // Reset the current card index and load the first card
    currentCardIndex = 0;
    loadCard(currentCardIndex);
});
const music = document.getElementById('music');
    music.loop = true;
    music.play();


loadCard(currentCardIndex);
