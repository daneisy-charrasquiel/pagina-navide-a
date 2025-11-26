// Crear copos de nieve
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    snowflake.style.opacity = Math.random() * 0.5 + 0.5;
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    
    const snowContainer = document.getElementById('snowContainer');
    snowContainer.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Crear nieve continuamente
setInterval(createSnowflake, 100);

// Crear luces navideñas
const tree = document.querySelector('.tree');
const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];

const lightPositions = [
    // Segunda capa
    { bottom: 320, left: 40 }, { bottom: 320, left: 48 }, { bottom: 320, left: 56 },
    { bottom: 300, left: 38 }, { bottom: 300, left: 44 }, { bottom: 300, left: 52 }, { bottom: 300, left: 58 },
    
    // Tercera capa
    { bottom: 260, left: 35 }, { bottom: 260, left: 43 }, { bottom: 260, left: 51 }, { bottom: 260, left: 59 },
    { bottom: 240, left: 33 }, { bottom: 240, left: 40 }, { bottom: 240, left: 48 }, { bottom: 240, left: 56 }, { bottom: 240, left: 63 },
    
    // Cuarta capa
    { bottom: 200, left: 30 }, { bottom: 200, left: 38 }, { bottom: 200, left: 46 }, { bottom: 200, left: 54 }, { bottom: 200, left: 62 },
    { bottom: 180, left: 28 }, { bottom: 180, left: 36 }, { bottom: 180, left: 44 }, { bottom: 180, left: 52 }, { bottom: 180, left: 60 }, { bottom: 180, left: 68 },
    
    // Base del árbol
    { bottom: 140, left: 25 }, { bottom: 140, left: 34 }, { bottom: 140, left: 43 }, { bottom: 140, left: 52 }, { bottom: 140, left: 61 }, { bottom: 140, left: 70 },
    { bottom: 120, left: 22 }, { bottom: 120, left: 32 }, { bottom: 120, left: 42 }, { bottom: 120, left: 52 }, { bottom: 120, left: 62 }, { bottom: 120, left: 72 }
];

for (let i = 0; i < lightPositions.length; i++) {
    const light = document.createElement('div');
    light.className = `light ${colors[Math.floor(Math.random() * colors.length)]}`;
    light.style.bottom = lightPositions[i].bottom + 'px';
    light.style.left = lightPositions[i].left + '%';
    light.style.animationDelay = (Math.random() * 1.5) + 's';
    tree.appendChild(light);
}

// Control de luces
const lights = document.querySelectorAll('.light');
let lightsOn = true;

document.getElementById('lightsOnBtn').addEventListener('click', () => {
    lightsOn = true;
    lights.forEach(light => {
        light.classList.remove('off');
    });
});

document.getElementById('lightsOffBtn').addEventListener('click', () => {
    lightsOn = false;
    lights.forEach(light => {
        light.classList.add('off');
    });
});

// Animación de las luces
setInterval(() => {
    if (lightsOn) {
        lights.forEach(light => {
            if (Math.random() > 0.7) {
                light.style.opacity = light.style.opacity === '0.3' ? '1' : '0.3';
            }
        });
    }
}, 300);

// Contador regresivo para Navidad
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25);
    
    if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25);
    }

    const timeLeft = christmas - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Control de música
const music = document.getElementById('christmasMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;
let userInteracted = false;

// Configurar volumen
if (music) {
    music.volume = 0.5;
    
    // Intentar cargar la música
    music.load();

    // Manejar errores de carga
    music.addEventListener('error', (e) => {
        console.log('Error al cargar música:', e);
        console.log('Error code:', music.error ? music.error.code : 'unknown');
        if (music.error) {
            switch(music.error.code) {
                case 1:
                    console.log('MEDIA_ERR_ABORTED - El usuario abortó la carga');
                    break;
                case 2:
                    console.log('MEDIA_ERR_NETWORK - Error de red');
                    break;
                case 3:
                    console.log('MEDIA_ERR_DECODE - Error al decodificar');
                    break;
                case 4:
                    console.log('MEDIA_ERR_SRC_NOT_SUPPORTED - Formato no soportado');
                    break;
            }
        }
    });

    // Manejar cuando la música está lista
    music.addEventListener('canplaythrough', () => {
        console.log('Música lista para reproducir');
    });

    // Permitir reproducción después de cualquier interacción del usuario
    const enableAudio = () => {
        if (!userInteracted && music) {
            userInteracted = true;
            // Intentar reproducir y pausar inmediatamente para "desbloquear" el audio
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    music.pause();
                    music.currentTime = 0;
                }).catch(err => {
                    console.log('Error al desbloquear audio:', err);
                });
            }
        }
    };

    // Escuchar cualquier interacción
    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true });
    document.addEventListener('keydown', enableAudio, { once: true });

    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            enableAudio();
            
            if (isPlaying) {
                music.pause();
                musicBtn.textContent = '▶ Reproducir';
                isPlaying = false;
            } else {
                const playPromise = music.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        musicBtn.textContent = '⏸ Pausar';
                        isPlaying = true;
                    }).catch(error => {
                        console.log('Error al reproducir:', error);
                        musicBtn.textContent = '⚠ Error - Clic de nuevo';
                        // Intentar de nuevo después de un segundo
                        setTimeout(() => {
                            musicBtn.textContent = '▶ Reproducir';
                        }, 2000);
                    });
                } else {
                    // Fallback para navegadores antiguos
                    music.play();
                    musicBtn.textContent = '⏸ Pausar';
                    isPlaying = true;
                }
            }
        });
    }
} else {
    console.error('Elemento de audio no encontrado');
}

// ========== JUEGO DE MEMORIA NAVIDEÑO ==========
const memoryGame = document.getElementById('memoryGame');
const scoreElement = document.getElementById('score');
const pairsElement = document.getElementById('pairs');
const resetGameBtn = document.getElementById('resetGame');

// Función para obtener emoji de respaldo si la imagen falla
function getEmojiForId(id) {
    const emojiMap = {
        'tree': '🎄',
        'santa': '🎅',
        'gift': '🎁',
        'snowflake': '❄️',
        'reindeer': '🦌',
        'bell': '🔔'
    };
    return emojiMap[id] || '🎄';
}

// Imágenes navideñas - Usar imágenes locales
// Las imágenes están en: static/images/
const imageBasePath = '/static/images/';

const christmasImages = [
    { 
        id: 'tree', 
        imageUrl: imageBasePath + 'arbol.jpeg',
        name: 'Árbol Navideño'
    },
    { 
        id: 'santa', 
        imageUrl: imageBasePath + 'santa.jpeg',
        name: 'Santa Claus'
    },
    { 
        id: 'gift', 
        imageUrl: imageBasePath + 'galletas.jpeg',
        name: 'Galletas Navideñas'
    },
    { 
        id: 'snowflake', 
        imageUrl: imageBasePath + 'grinch.jpeg',
        name: 'Grinch'
    },
    { 
        id: 'reindeer', 
        imageUrl: imageBasePath + 'reno.jpeg',
        name: 'Reno Navideño'
    },
    { 
        id: 'bell', 
        imageUrl: imageBasePath + 'pingüino.jpeg',
        name: 'Pingüino Navideño'
    }
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let lockBoard = false;

// Duplicar imágenes y mezclar
function initGame() {
    const imagePairs = [...christmasImages, ...christmasImages];
    cards = imagePairs.sort(() => Math.random() - 0.5);
    memoryGame.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    score = 0;
    lockBoard = false;
    updateScore();

    cards.forEach((imageData, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.imageId = imageData.id;
        card.dataset.index = index;
        card.style.pointerEvents = 'auto'; // Asegurar que se puedan hacer clic
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.innerHTML = '<span style="font-size: 3em;">?</span>';
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        const img = document.createElement('img');
        img.alt = imageData.name;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.display = 'block';
        
        // Codificar URL si tiene caracteres especiales
        let imageUrl = imageData.imageUrl;
        if (imageUrl.includes('pingüino')) {
            const baseUrl = imageUrl.substring(0, imageUrl.lastIndexOf('/') + 1);
            const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            imageUrl = baseUrl + encodeURIComponent(filename);
        }
        
        img.src = imageUrl;
        
        img.onload = function() {
            console.log('✅ Imagen cargada:', imageData.name);
        };
        
        img.onerror = function() {
            console.error('❌ Error cargando imagen:', this.src);
            // Si falla, mostrar emoji como respaldo
            this.style.display = 'none';
            const emojiBackup = document.createElement('div');
            emojiBackup.style.fontSize = '4em';
            emojiBackup.style.display = 'flex';
            emojiBackup.style.alignItems = 'center';
            emojiBackup.style.justifyContent = 'center';
            emojiBackup.style.height = '100%';
            emojiBackup.style.width = '100%';
            emojiBackup.textContent = getEmojiForId(imageData.id);
            cardBack.appendChild(emojiBackup);
        };
        
        cardBack.appendChild(img);
        
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        
        card.addEventListener('click', flipCard);
        memoryGame.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        lockBoard = true;
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const isMatch = firstCard.dataset.imageId === secondCard.dataset.imageId;

    // Esperar 1 segundo para que ambas tarjetas se muestren antes de verificar
    setTimeout(() => {
        if (isMatch) {
            // Par encontrado: marcarlas como matched y deshabilitarlas
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++;
            score += 10;
            updateScore();
            
            // Deshabilitar las tarjetas para que no se puedan volver a seleccionar
            firstCard.style.pointerEvents = 'none';
            secondCard.style.pointerEvents = 'none';
            
            // Después de 1 segundo mostrándolas, voltearlas (mostrar el "?")
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
            }, 1000);
            
            // Verificar si se completó el juego
            if (matchedPairs === christmasImages.length) {
                setTimeout(() => {
                    alert(`¡Felicitaciones! 🎉 Completaste el juego con ${score} puntos!`);
                }, 2000); // Esperar a que se volteen las últimas tarjetas
            }
            lockBoard = false;
            flippedCards = [];
        } else {
            // No hay match: voltear las tarjetas después de mostrarlas
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            lockBoard = false;
            flippedCards = [];
        }
    }, 1000); // Esperar 1 segundo antes de verificar/voltear
}

// Función para voltear todas las tarjetas cuando se complete el juego
function flipAllCards() {
    const allCards = document.querySelectorAll('.memory-card');
    allCards.forEach(card => {
        if (!card.classList.contains('matched')) {
            // Voltear las tarjetas que no están matched
            card.classList.remove('flipped');
        }
    });
}

function updateScore() {
    scoreElement.textContent = score;
    pairsElement.textContent = matchedPairs;
}

resetGameBtn.addEventListener('click', initGame);
initGame();

// ========== MUÑECO BAILARÍN ==========
const dancingDoll = document.getElementById('dancingDoll');
const photoInput = document.getElementById('photoInput');
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
const danceBtn = document.getElementById('danceBtn');
const stopDanceBtn = document.getElementById('stopDanceBtn');
const faceImage = document.getElementById('faceImage');
let isDancing = false;

uploadPhotoBtn.addEventListener('click', () => {
    photoInput.click();
});

photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            faceImage.src = event.target.result;
            faceImage.style.display = 'block';
            // Ocultar la cara dibujada cuando hay foto
            document.querySelector('.doll-face').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

danceBtn.addEventListener('click', () => {
    if (!isDancing) {
        dancingDoll.classList.add('dancing');
        isDancing = true;
        danceBtn.disabled = true;
        stopDanceBtn.disabled = false;
    }
});

stopDanceBtn.addEventListener('click', () => {
    if (isDancing) {
        dancingDoll.classList.remove('dancing');
        isDancing = false;
        danceBtn.disabled = false;
        stopDanceBtn.disabled = true;
    }
});

// Inicializar botones
stopDanceBtn.disabled = true;