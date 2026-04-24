const questions = [
    { q: "Which of the following is a Common Noun?", a: "City", options: ["London", "City", "Microsoft", "Sarah"] },
    { q: "Identify the Proper Noun in this list:", a: "Gusion", options: ["Gusion", "Warrior", "Assassin", "Hero"] },
    { q: "The word 'Smart-phone' is a...", a: "Common Noun", options: ["Common Noun", "Proper Noun", "Action Verb", "Adjective"] },
    { q: "Which brand is a Proper Noun?", a: "Lenovo", options: ["Laptop", "Lenovo", "Screen", "Keyboard"] },
    { q: "The 'University' is large. 'University' is a:", a: "Common Noun", options: ["Proper Noun", "Common Noun", "Pronoun", "Adverb"] },
    { q: "Which of these refers to a specific place?", a: "Jakarta", options: ["Village", "Jakarta", "Country", "Capital"] },
    { q: "A name for any general group of people is a:", a: "Common Noun", options: ["Collective Noun", "Proper Noun", "Common Noun", "Abstract Noun"] },
    { q: "Identify the Proper Noun:", a: "Friday", options: ["Month", "Friday", "Weekday", "Afternoon"] },
    { q: "Is 'English' a Common or Proper noun?", a: "Proper Noun", options: ["Common Noun", "Proper Noun", "Verb", "Preposition"] },
    { q: "Which one should ALWAYS be capitalized?", a: "Proper Noun", options: ["Proper Noun", "Common Noun", "Both", "None"] },
    { q: "Identify the Common Noun:", a: "Teacher", options: ["Teacher", "Mr. Smith", "Einstein", "Indonesia"] },
    { q: "Select the Proper Noun:", a: "Egypt", options: ["Desert", "River", "Egypt", "Mountain"] },
    { q: "The word 'Idea' is which type of noun?", a: "Common Noun", options: ["Common Noun", "Proper Noun", "It's a Verb", "It's an Adjective"] },
    { q: "Which of these is NOT a Proper Noun?", a: "Computer", options: ["Apple", "Computer", "Windows", "Google"] },
    { q: "Is 'Mount Everest' a Common or Proper Noun?", a: "Proper Noun", options: ["Common Noun", "Proper Noun", "Adjective", "Pronoun"] }
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
    
    // Disable all buttons immediately
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (selected === correct) {
        score++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        // Optional: Highlight the correct one
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
    
    if(finalScore > 80) document.getElementById('scoreText').innerText = "Excellent! You're a Noun Master.";
    else if(finalScore > 50) document.getElementById('scoreText').innerText = "Good job! A little more study helps.";
}

loadQuestion();