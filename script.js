// DOM Elements
const flame = document.getElementById('flame');
const glow = document.getElementById('glow');
const instruction = document.getElementById('instruction');
const confettiContainer = document.getElementById('confetti');
const candle = document.querySelector('.candle');
const cardOverlay = document.getElementById('cardOverlay');
const birthdayCard = document.getElementById('birthdayCard');
const closeCard = document.getElementById('closeCard');
const birthdayMusic = document.getElementById('birthdayMusic');

let isFlameOn = true;

// Blow out the candle when flame is clicked/tapped
flame.addEventListener('click', blowCandle);
flame.addEventListener('touchstart', (e) => {
    e.preventDefault();
    blowCandle();
});

function blowCandle() {
    if (!isFlameOn) return;
    
    isFlameOn = false;
    
    // Hide flame
    flame.classList.add('off');
    
    // Hide glow
    glow.classList.add('off');
    
    // Hide instruction
    instruction.classList.add('opacity-0');
    
    // Create smoke effect
    createSmoke();
    
    // Show card and play music after a short delay
    setTimeout(() => {
        showBirthdayCard();
        playMusic();
        createConfetti();
    }, 800);
}

// Show birthday card
function showBirthdayCard() {
    cardOverlay.classList.remove('opacity-0', 'invisible');
    cardOverlay.classList.add('opacity-100', 'visible');
    
    setTimeout(() => {
        birthdayCard.classList.add('show');
        createSparkles();
    }, 200);
}

// Hide birthday card
function hideBirthdayCard() {
    birthdayCard.classList.remove('show');
    birthdayCard.style.transform = 'scale(0)';
    birthdayCard.style.opacity = '0';
    
    // Stop music with fade out
    stopMusic();
    
    setTimeout(() => {
        cardOverlay.classList.add('opacity-0', 'invisible');
        cardOverlay.classList.remove('opacity-100', 'visible');
        // Reset for next time
        birthdayCard.style.opacity = '';
        
        // Relight the candle after card closes
        relightCandle();
    }, 500);
}

// Close card button
closeCard.addEventListener('click', () => {
    hideBirthdayCard();
});

// Play birthday music with fade in effect
function playMusic() {
    birthdayMusic.volume = 0;
    birthdayMusic.play().catch(e => {
        console.log('Audio play failed:', e);
    });
    
    // Fade in effect
    let currentVolume = 0;
    const targetVolume = 0.7;
    const fadeInterval = setInterval(() => {
        currentVolume += 0.02;
        if (currentVolume >= targetVolume) {
            currentVolume = targetVolume;
            clearInterval(fadeInterval);
        }
        birthdayMusic.volume = currentVolume;
    }, 100); // Fade in over ~3.5 seconds
}

// Stop music with fade out effect
function stopMusic() {
    let currentVolume = birthdayMusic.volume;
    const fadeOutInterval = setInterval(() => {
        currentVolume -= 0.05;
        if (currentVolume <= 0) {
            currentVolume = 0;
            birthdayMusic.pause();
            birthdayMusic.currentTime = 0;
            clearInterval(fadeOutInterval);
        }
        birthdayMusic.volume = currentVolume;
    }, 50); // Fade out over ~0.7 seconds
}

// Relight the candle
function relightCandle() {
    isFlameOn = true;
    flame.classList.remove('off');
    glow.classList.remove('off');
    instruction.textContent = 'tap to blow again 🎂';
    instruction.classList.remove('opacity-0');
}

// Create smoke particles
function createSmoke() {
    const candleRect = candle.getBoundingClientRect();
    const smokeX = candleRect.left + candleRect.width / 2;
    const smokeY = candleRect.top;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            smoke.style.left = (smokeX + (Math.random() - 0.5) * 20) + 'px';
            smoke.style.top = (smokeY - 30 + Math.random() * 10) + 'px';
            document.body.appendChild(smoke);
            
            setTimeout(() => smoke.remove(), 1000);
        }, i * 100);
    }
}

// Create confetti
function createConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff85a2', '#a66cff', '#ff9f43', '#54a0ff'];
    
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4500);
        }, i * 50);
    }
}

// Create sparkles on card
function createSparkles() {
    const sparkleContainer = document.querySelector('.sparkle-container');
    if (!sparkleContainer) return;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            sparkle.style.width = (Math.random() * 6 + 4) + 'px';
            sparkle.style.height = sparkle.style.width;
            
            sparkleContainer.appendChild(sparkle);
        }, i * 100);
    }
}

// Create floating hearts when closing
function createFloatingHearts() {
    const hearts = ['❤️', '💖', '💕', '💗', '💝'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '20%';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 100);
    }
}

// Relight candle on double tap (Easter egg)
document.addEventListener('dblclick', () => {
    if (isFlameOn) return;
    
    isFlameOn = true;
    flame.classList.remove('off');
    glow.classList.remove('off');
    instruction.textContent = 'tap again to blow! 🎂';
    instruction.classList.remove('opacity-0');
});

// Tap anywhere on overlay to close (optional)
cardOverlay.addEventListener('click', (e) => {
    if (e.target === cardOverlay) {
        createFloatingHearts();
        hideBirthdayCard();
    }
});
