const questions = [
    { q: "Which noun can form a plural by adding -s?", a: "Chair", options: ["Water", "Rice", "Chair", "Air"] },

    { q: "Which word is a countable noun?", a: "Book", options: ["Milk", "Book", "Sugar", "Sand"] },

    { q: "Which noun has a plural form?", a: "Dog", options: ["Advice", "Information", "Dog", "Furniture"] },

    { q: "Which of these can be counted individually?", a: "Pen", options: ["Pen", "Oil", "Water", "Salt"] },

    { q: "Which sentence uses a countable noun correctly?", a: "I have three apples.", options: ["I have water.", "I have three apples.", "I have rice.", "I have milk."] },

    { q: "Which noun changes form in plural (irregular)?", a: "Man → Men", options: ["Chair → Chairs", "Book → Books", "Man → Men", "Pen → Pens"] },

    { q: "Which word fits: 'many ___'?", a: "Cars", options: ["Milk", "Rice", "Cars", "Sugar"] },

    { q: "Which noun can be counted?", a: "Student", options: ["Knowledge", "Student", "Water", "Money"] },

    { q: "Which is NOT a countable noun?", a: "Water", options: ["Table", "Water", "Chair", "Phone"] },

    { q: "Which is the correct plural form?", a: "Mice", options: ["Mouses", "Mice", "Mouse", "Mices"] },

    { q: "Which word is countable?", a: "Egg", options: ["Egg", "Flour", "Oil", "Butter"] },

    { q: "Which noun can become plural?", a: "Idea", options: ["Advice", "Information", "Idea", "Rice"] },

    { q: "Which of these is countable?", a: "Bottle", options: ["Water", "Bottle", "Air", "Sand"] },

    { q: "Which sentence is correct?", a: "She has two houses.", options: ["She has two houses.", "She has two furniture.", "She has many water.", "She has much apples."] },

    { q: "Which noun is countable?", a: "Teacher", options: ["Knowledge", "Teacher", "Milk", "Rice"] }
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