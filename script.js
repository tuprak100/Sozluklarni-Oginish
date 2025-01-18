const card = document.getElementById('card');
const front = document.getElementById('front');
const back = document.getElementById('back');
const nextCardButton = document.getElementById('next-card-button'); // Corrected IDs
const prevCardButton = document.getElementById('prev-card-button');
const flipCardButton = document.getElementById('flip-card-button');
const music = document.getElementById('background-music');
let currentCardIndex = 0;

// Corrected cards array to use correct image names and full paths
const cards = [
    { front: "images/fronts/front_1.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_1.png" },
    { front: "images/fronts/front_2.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_2.png" },
    { front: "images/fronts/front_3.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_3.png" },
    { front: "images/fronts/front_4.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_4.png" },
    { front: "images/fronts/front_5.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_5.png" },
    { front: "images/fronts/front_6.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_6.png" },
    { front: "images/fronts/front_7.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_7.png" },
    { front: "images/fronts/front_8.png", back: "https://raw.githubusercontent.com/tuprak100/Sozluklarni-Oginish/main/images/backs/back_8.png" },
];

function loadCard(index) {
    front.innerHTML = `<img src="${cards[index].front}" alt="Front">`;
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

music.play();
loadCard(currentCardIndex);
