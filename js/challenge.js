// Get DOM elements using querySelector
const counter = document.querySelector('#counter');
const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const heartBtn = document.querySelector('#heart');
const pauseBtn = document.querySelector('#pause');
const likesList = document.querySelector('.likes');
const commentForm = document.querySelector('#comment-form');
const commentList = document.querySelector('#list');

// Initialize variables
let count = 0;
let timer;
let isPaused = false;
const likes = {};

// Start timer when page loads
function startTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            count++;
            counter.textContent = count;
        }
    }, 1000);
}

// Increment counter
plusBtn.addEventListener('click', () => {
    if (!isPaused) {
        count++;
        counter.textContent = count;
    }
});

// Decrement counter
minusBtn.addEventListener('click', () => {
    if (!isPaused) {
        count--;
        counter.textContent = count;
    }
});

// Like feature
heartBtn.addEventListener('click', () => {
    if (!isPaused) {
        // Increment like count for current number
        likes[count] = (likes[count] || 0) + 1;
        
        // Update likes display
        updateLikesDisplay();
    }
});

function updateLikesDisplay() {
    // Clear existing likes
    likesList.innerHTML = '';
    
    // Create new list items for each liked number
    for (let number in likes) {
        const li = document.createElement('li');
        li.textContent = `${number} has been liked ${likes[number]} time${likes[number] > 1 ? 's' : ''}`;
        likesList.appendChild(li);
    }
}

// Pause/Resume functionality
pauseBtn.addEventListener('click', () => {
    if (isPaused) {
        // Resume
        isPaused = false;
        pauseBtn.textContent = 'pause';
        enableButtons();
    } else {
        // Pause
        isPaused = true;
        pauseBtn.textContent = 'resume';
        disableButtons();
    }
});

function disableButtons() {
    minusBtn.disabled = true;
    plusBtn.disabled = true;
    heartBtn.disabled = true;
}

function enableButtons() {
    minusBtn.disabled = false;
    plusBtn.disabled = false;
    heartBtn.disabled = false;
}

// Comment submission
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentInput = document.querySelector('#comment-input');
    const commentText = commentInput.value.trim();
    
    if (commentText) {
        const p = document.createElement('p');
        p.textContent = commentText;
        commentList.appendChild(p);
        commentInput.value = ''; // Clear input
    }
});

// Start the timer when page loads
startTimer();