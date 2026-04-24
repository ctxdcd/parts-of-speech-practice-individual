const questions = [
    { q: "Which of the following is a countable noun?", a: "Apple", options: ["Apple", "Water", "Rice", "Milk"] },

    { q: "Which word is uncountable?", a: "Sugar", options: ["Book", "Chair", "Sugar", "Pen"] },

    { q: "Which sentence is correct?", a: "I have many books.", options: ["I have many books.", "I have many water.", "I have much books.", "I have a water."] },

    { q: "Which noun can be plural?", a: "Car", options: ["Milk", "Rice", "Car", "Sugar"] },

    { q: "Which word fits: 'much ___'?", a: "Water", options: ["Apples", "Chairs", "Water", "Pens"] },

    { q: "Which noun is countable?", a: "Student", options: ["Knowledge", "Student", "Information", "Advice"] },

    { q: "Which noun is uncountable?", a: "Information", options: ["Book", "Teacher", "Information", "Car"] },

    { q: "Which is the correct sentence?", a: "She has some rice.", options: ["She has some rice.", "She has many rice.", "She has a rice.", "She has three rice."] },

    { q: "Which word can use 'many'?", a: "Chairs", options: ["Milk", "Sugar", "Chairs", "Water"] },

    { q: "Which noun cannot be counted?", a: "Air", options: ["Bottle", "Air", "Student", "Teacher"] },

    { q: "Which is countable?", a: "Egg", options: ["Egg", "Oil", "Butter", "Flour"] },

    { q: "Which is uncountable?", a: "Furniture", options: ["Chair", "Table", "Furniture", "Desk"] },

    { q: "Which sentence is correct?", a: "There are two cars.", options: ["There are two cars.", "There is two cars.", "There are much cars.", "There is many cars."] },

    { q: "Which is NOT countable?", a: "Money", options: ["Coins", "Money", "Bills", "Dollars"] },

    { q: "Which noun is countable?", a: "Teacher", options: ["Milk", "Rice", "Teacher", "Water"] }
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
    
    if(finalScore > 80) document.getElementById('scoreText').innerText = "Excellent! You’ve mastered countable vs uncountable nouns.";
    else if(finalScore > 50) document.getElementById('scoreText').innerText = "Good job! Keep sharpening your understanding.";
}

loadQuestion();