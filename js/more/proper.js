const questions = [
    { q: "Which of the following is a proper noun?", a: "Jakarta", options: ["City", "Country", "Jakarta", "Place"] },
    { q: "Identify the proper noun:", a: "Monday", options: ["Monday", "Week", "Day", "Time"] },
    { q: "Which word names a specific person?", a: "Aisha", options: ["Girl", "Friend", "Student", "Aisha"] },
    { q: "Which of these is a specific brand?", a: "Samsung", options: ["Samsung", "Device", "Phone", "Screen"] },
    { q: "The word 'Indonesia' is a:", a: "Proper Noun", options: ["Common Noun", "Proper Noun", "Verb", "Adjective"] },
    { q: "Which refers to a specific place?", a: "Bali", options: ["Island", "Beach", "Ocean", "Bali"] },
    { q: "A proper noun always:", a: "Begins with a capital letter", options: ["Is plural", "Begins with a capital letter", "Is a verb", "Is an adjective"] },
    { q: "Identify the proper noun:", a: "Ramadan", options: ["Month", "Fasting", "Ramadan", "Time"] },
    { q: "Which word is a proper noun?", a: "Google", options: ["Search engine", "Website", "Google", "Internet"] },
    { q: "Which one names a specific book?", a: "The Qur'an", options: ["Book", "Story", "The Qur'an", "Text"] },
    { q: "Which of these is a proper noun?", a: "Mount Fuji", options: ["Mountain", "Hill", "Mount Fuji", "Land"] },
    { q: "Identify the proper noun:", a: "Friday", options: ["Weekend", "Friday", "Holiday", "Evening"] },
    { q: "Which is a specific organization?", a: "NASA", options: ["Agency", "NASA", "Company", "Group"] },
    { q: "Which one names a specific event?", a: "Eid al-Fitr", options: ["Celebration", "Holiday", "Festival", "Eid al-Fitr"] },
    { q: "Which of these is a proper noun?", a: "Asia", options: ["Asia", "Region", "Continent", "Area"] }
];

let currentIdx = 0;
let score = 0;

function loadQuestion() {
    const q = questions[currentIdx];
    document.getElementById('currentQNum').innerText = currentIdx + 1;
    document.getElementById('questionCounter').innerText = `${currentIdx + 1}/${questions.length}`;
    document.getElementById('questionText').innerText = q.q;
    
    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = '';
    
    const prefixes = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="prefix">${prefixes[i]}</span> ${opt}`;
        btn.onclick = () => checkAnswer(opt, btn);
        grid.appendChild(btn);
    });

    const progress = ((currentIdx) / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function checkAnswer(selected, btn) {
    const correct = questions[currentIdx].a;
    const allBtns = document.querySelectorAll('.option-btn');
    
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (selected === correct) {
        score++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        allBtns.forEach(b => {
            if(b.innerText.includes(correct)) b.classList.add('correct');
        });
    }

    setTimeout(() => {
        currentIdx++;
        if (currentIdx < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    document.getElementById('progressBar').style.width = `100%`;
    const finalScore = Math.round((score / questions.length) * 100);
    document.getElementById('resultScreen').classList.remove('hidden');
    document.getElementById('scorePercent').innerText = `${finalScore}%`;
    
    if(finalScore > 80) document.getElementById('scoreText').innerText = "Excellent! You're mastering proper nouns.";
    else if(finalScore > 50) document.getElementById('scoreText').innerText = "Good progress. Keep sharpening.";
}

loadQuestion();