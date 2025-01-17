const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const nextCardButton = document.getElementById('next-card');
const flipCardButton = document.getElementById('flip-card');
const music = document.getElementById('background-music');
let currentCardIndex = 0;
const cards = [
    { front: "images/front_1.png", back: "images/back_1.png" },
    { front: "images/front_2.png", back: "images/back_2.png" },
    // ... more cards
];

function loadCard(index) {
    front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
    fetch(cards[index].back)
        .then(response => response.blob()) //Or response.blob() for images; response.text for texts.
        .then(data => {
            back.innerHTML = "https://raw.githubusercontent.com/tuprak100/Sozluklar/main/images/"; // Or set the image source for image files
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