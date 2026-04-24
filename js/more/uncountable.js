const questions = [
    { q: "Which of the following is an uncountable noun?", a: "Water", options: ["Water", "Apple", "Chair", "Dog"] },

    { q: "Which word is uncountable?", a: "Milk", options: ["Milk", "Book", "Pen", "Car"] },

    { q: "Which noun does NOT have a plural form?", a: "Sugar", options: ["Chairs", "Books", "Sugar", "Pens"] },

    { q: "Which of these cannot be counted individually?", a: "Rice", options: ["Rice", "Egg", "Bottle", "Student"] },

    { q: "Which sentence uses an uncountable noun correctly?", a: "I need some water.", options: ["I need many water.", "I need some water.", "I need three water.", "I need a water."] },

    { q: "Which word fits: 'much ___'?", a: "Milk", options: ["Apples", "Chairs", "Milk", "Pens"] },

    { q: "Which is NOT an uncountable noun?", a: "Car", options: ["Water", "Rice", "Car", "Sugar"] },

    { q: "Which noun refers to a concept, not a physical object?", a: "Knowledge", options: ["Table", "Pen", "Knowledge", "Chair"] },

    { q: "Which is the correct usage?", a: "She has a lot of information.", options: ["She has many informations.", "She has a lot of information.", "She has informations.", "She has an information."] },

    { q: "Which word is uncountable?", a: "Advice", options: ["Advice", "Idea", "Book", "Car"] },

    { q: "Which cannot be pluralized?", a: "Furniture", options: ["Chairs", "Tables", "Furniture", "Books"] },

    { q: "Which is an uncountable noun?", a: "Air", options: ["Air", "Bottle", "Student", "Teacher"] },

    { q: "Which sentence is correct?", a: "There is some sugar on the table.", options: ["There are sugars on the table.", "There is some sugar on the table.", "There are many sugar.", "There is a sugar."] },

    { q: "Which word is uncountable?", a: "Money", options: ["Money", "Coins", "Dollars", "Bills"] },

    { q: "Which noun is uncountable?", a: "Information", options: ["Information", "Book", "Pen", "Chair"] }
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
    
    if(finalScore > 80) document.getElementById('scoreText').innerText = "Excellent! You understand countable nouns well.";
    else if(finalScore > 50) document.getElementById('scoreText').innerText = "Good job! Keep practicing.";
}

loadQuestion();