const questions = [
    { q: "Which of the following is a common noun?", a: "City", options: ["City", "London", "Google", "Sarah"] },
    { q: "Which word is a common noun?", a: "Teacher", options: ["Teacher", "Mr. Brown", "Einstein", "Indonesia"] },
    { q: "Identify the common noun:", a: "Dog", options: ["Dog", "Max", "Paris", "Amazon"] },
    { q: "Which of these is a general name?", a: "Car", options: ["Toyota", "BMW", "Car", "Honda"] },
    { q: "The word 'school' is a:", a: "Common Noun", options: ["Proper Noun", "Common Noun", "Verb", "Adjective"] },
    { q: "Which one refers to any place?", a: "City", options: ["Jakarta", "Indonesia", "City", "Asia"] },
    { q: "A name for any general thing is a:", a: "Common Noun", options: ["Proper Noun", "Common Noun", "Pronoun", "Adverb"] },
    { q: "Identify the common noun:", a: "Book", options: ["Harry Potter", "Book", "Qur'an", "Titanic"] },
    { q: "Which is NOT a specific name?", a: "River", options: ["Nile", "Amazon", "River", "Mississippi"] },
    { q: "Which one does NOT need capitalization?", a: "Common Noun", options: ["Proper Noun", "Common Noun", "Both", "None"] },
    { q: "Which word is the most general name for something you can eat?", a: "Food", options: ["Bread", "Food", "Apple", "Rice"] },
    { q: "The word 'idea' is a:", a: "Common Noun", options: ["Proper Noun", "Common Noun", "Verb", "Adjective"] },
    { q: "Which of these is a general object?", a: "Phone", options: ["Oppo", "Samsung", "Phone", "Nokia"] },
    { q: "Which is a common noun?", a: "Country", options: ["Indonesia", "Japan", "Country", "Egypt"] },
    { q: "Identify the common noun:", a: "Student", options: ["Ali", "Fatimah", "Student", "Ahmad"] }
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
    
    if(finalScore > 80) document.getElementById('scoreText').innerText = "Excellent! You understand common nouns well.";
    else if(finalScore > 50) document.getElementById('scoreText').innerText = "Good job! Keep practicing.";
}

loadQuestion();