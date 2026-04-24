/**
 * AZARGUIDE - SMART MULTI-MODE ENGINE
 * Unit 2: Countable vs Uncountable Nouns
 */

/**
 * AZARGUIDE - SMART MULTI-MODE ENGINE
 * Unit 2: Countable vs Uncountable (Advanced Context)
 */

const wordBank = [
    // --- MODE: BINARY (Focusing on the plural/singular rules) ---
    { word: "4 chairs", type: "countable", level: "binary" },
    { word: "Some milk", type: "uncountable", level: "binary" },
    { word: "A few mice", type: "countable", level: "binary" },
    { word: "Much dirt", type: "uncountable", level: "binary" },
    { word: "Many children", type: "countable", level: "binary" },

    // --- MODE: MULTIPLE (Identification with distractors) ---
    { word: "A lot of happiness", type: "uncountable", level: "multiple", options: ["Countable", "Uncountable", "Proper Noun", "Verb"] },
    { word: "Twelve countries", type: "countable", level: "multiple", options: ["Uncountable", "Countable", "Adverb", "Preposition"] },
    { word: "Fresh air", type: "uncountable", level: "multiple", options: ["Countable", "Uncountable", "Pronoun", "Adjective"] },
    { word: "Five bottles", type: "countable", level: "multiple", options: ["Uncountable", "Countable", "Verb", "Plural Only"] },
    { word: "Little information", type: "uncountable", level: "multiple", options: ["Countable", "Uncountable", "Proper Noun", "Conjunction"] },

    // --- MODE: WRITING (Spelling & Concept Recognition) ---
    { word: "Ten men", type: "countable", level: "writing" },
    { word: "Pure water", type: "uncountable", level: "writing" },
    { word: "Three classrooms", type: "countable", level: "writing" },
    { word: "Heavy equipment", type: "uncountable", level: "writing" },
    { word: "One single apple", type: "countable", level: "writing" }
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

    // Change the binary button HTML inside renderControls(item) to this:

if (currentMode === 'binary') {
    controlLayer.innerHTML = `
        <div class="button-row">
            <button class="action-trigger" onclick="checkAnswer('countable')">
                <span class="label">Countable</span>
                <span class="sub-label">Can be counted</span>
            </button>
            <button class="action-trigger" onclick="checkAnswer('uncountable')">
                <span class="label">Uncountable</span>
                <span class="sub-label">Mass/General</span>
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
                <input type="text" id="writeInput" class="writing-input" placeholder="type 'countable' or 'uncountable'..." autocomplete="off">
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