/**
 * AZARGUIDE - SMART MULTI-MODE ENGINE
 * Unit 1: Common vs Proper Nouns
 */

const wordBank = [
    // --- MODE: BINARY (Basic Recognition) ---
    { word: "Jakarta", type: "proper", level: "binary" },
    { word: "city", type: "common", level: "binary" },
    { word: "Lenovo", type: "proper", level: "binary" },
    { word: "programmer", type: "common", level: "binary" },

    // --- MODE: MULTIPLE (Identification with Distractors) ---
    // Meskipun pilihannya variasi, kuncinya tetap 'common' atau 'proper'
    { word: "happiness", type: "common", level: "multiple", options: ["Common Noun", "Proper Noun", "Verb", "Adjective"] },
    { word: "Syria", type: "proper", level: "multiple", options: ["Common Noun", "Proper Noun", "Pronoun", "Preposition"] },
    { word: "university", type: "common", level: "multiple", options: ["Proper Noun", "Common Noun", "Not a Noun", "Adverb"] },
    { word: "Friday", type: "proper", level: "multiple", options: ["Common Noun", "Proper Noun", "Collective Noun", "Verb"] },

    // --- MODE: WRITING (Spelling & Production) ---
    { word: "Arabic", type: "proper", level: "writing" },
    { word: "language", type: "common", level: "writing" },
    { word: "Gusion", type: "proper", level: "writing" },
    { word: "classroom", type: "common", level: "writing" }
];

let currentIndex = 0;
let score = 0;
let currentMode = 'binary'; 
let currentPool = []; 

// DOM Elements
const wordEl = document.getElementById('wordDisplay');
const progressEl = document.getElementById('progressBar');
const accuracyEl = document.getElementById('accuracy');
const countEl = document.getElementById('currentCount');
const controlLayer = document.getElementById('controlLayer');

/**
 * Berpindah mode dan menyaring soal yang sesuai
 */
function changeMode(newMode) {
    currentMode = newMode;
    currentIndex = 0;
    score = 0;

    // Filter soal berdasarkan level yang dipilih
    currentPool = wordBank.filter(item => item.level === newMode);

    updateDisplay();
}

/**
 * Render tampilan kata dan statistik
 */
function updateDisplay() {
    if (currentIndex < currentPool.length) {
        const item = currentPool[currentIndex];
        wordEl.innerText = item.word;
        wordEl.className = "hero-word"; // Hapus kelas animasi sebelumnya
        
        // Update UI Progress
        const progressPercent = (currentIndex / currentPool.length) * 100;
        progressEl.style.width = `${progressPercent}%`;
        countEl.innerText = `${currentIndex}/${currentPool.length}`;
        
        const currentAccuracy = currentIndex === 0 ? 0 : Math.round((score / currentIndex) * 100);
        accuracyEl.innerText = `${currentAccuracy}%`;

        renderControls(item);
    } else {
        handleCompletion();
    }
}

/**
 * Mengatur apa yang muncul di Control Layer (Tombol/Input)
 */
function renderControls(item) {
    controlLayer.innerHTML = ""; 

    if (currentMode === 'binary') {
        controlLayer.innerHTML = `
            <div class="button-row">
                <button class="action-trigger" onclick="checkAnswer('common')">
                    <span class="label">Common</span>
                    <span class="sub-label">General</span>
                </button>
                <button class="action-trigger" onclick="checkAnswer('proper')">
                    <span class="label">Proper</span>
                    <span class="sub-label">Specific</span>
                </button>
            </div>`;
    } 
    else if (currentMode === 'multiple') {
        let html = '<div class="button-grid">';
        item.options.forEach(opt => {
            // Kita kirim teks utuh (misal: "Common Noun") ke fungsi check
            html += `
                <button class="action-trigger" style="width: 220px; padding: 18px;" onclick="checkAnswer('${opt}')">
                    <span class="label" style="font-size: 15px;">${opt}</span>
                </button>`;
        });
        html += '</div>';
        controlLayer.innerHTML = html;
    } 
    else if (currentMode === 'writing') {
        controlLayer.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                <input type="text" id="writeInput" class="writing-input" placeholder="type 'common' or 'proper'..." autocomplete="off">
                <p style="color: var(--text-secondary); font-size: 11px; letter-spacing: 1px;">PRESS ENTER TO SUBMIT</p>
            </div>`;
        
        const input = document.getElementById('writeInput');
        input.focus(); // Otomatis fokus agar user tidak perlu klik kotak input
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer(input.value.trim().toLowerCase());
            }
        });
    }
}

/**
 * Logika Validasi Jawaban
 */
function checkAnswer(userChoice) {
    // Logic Cerdas: Mengambil kata pertama saja (misal "Common Noun" -> "common")
    // Ini memastikan mode Multiple Choice dan Binary bisa pakai kunci jawaban yang sama
    const cleanInput = userChoice.split(' ')[0].toLowerCase();
    const correctAnswer = currentPool[currentIndex].type;
    
    if (cleanInput === correctAnswer) {
        score++;
        wordEl.classList.add('correct-state');
    } else {
        wordEl.classList.add('wrong-state');
    }

    currentIndex++;
    
    // Beri waktu user melihat feedback sebelum lanjut
    setTimeout(updateDisplay, 700);
}

/**
 * Layar Selesai Sesi
 */
function handleCompletion() {
    progressEl.style.width = "100%";
    const finalScore = Math.round((score / currentPool.length) * 100);
    
    controlLayer.innerHTML = `
        <button class="action-trigger" style="width: 300px; background: var(--accent-blue); text-align: center;" onclick="changeMode(currentMode)">
            <span class="label" style="display: inline;">Restart Mode</span>
        </button>`;
    
    wordEl.innerText = `${finalScore}%`;
}

// Menjalankan mode Binary saat pertama kali load
changeMode('binary');