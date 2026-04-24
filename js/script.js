/**
 * AZARGUIDE - CORE NAVIGATION LOGIC
 * Includes: Modal System, Dynamic Content Injection, and Scroll Locking
 */

const modules = {
    nouns: { 
        title: "Nouns Lab", 
        exercises: [
            { name: "Common vs. Proper Nouns", link: "practice/nouns/common-proper.html" },
            { name: "Countable & Uncountable", link: "practice/nouns/countable-uncountable.html" },
            { name: "Pluralization Rules", link: "practice/nouns/plurals.html" },
            { name: "Possessive Case", link: "practice/nouns/possessive.html" }
        ] 
    },
    pronouns: { 
        title: "Pronouns Lab", 
        exercises: [
            { name: "Subject & Object Pronouns", link: "practice/pronouns/cases.html" },
            { name: "Possessive Pronouns", link: "practice/pronouns/possessive.html" },
            { name: "Reflexive Pronouns", link: "practice/pronouns/reflexive.html" },
            { name: "Relative Pronouns", link: "practice/pronouns/relative.html" }
        ] 
    },
    verbs: { 
        title: "Verbs Lab", 
        exercises: [
            { name: "Major Tenses Review", link: "practice/verbs/tenses.html" },
            { name: "Irregular Verbs Drill", link: "practice/verbs/irregular.html" },
            { name: "Passive vs. Active Voice", link: "practice/verbs/voice.html" },
            { name: "Subject-Verb Agreement", link: "practice/verbs/agreement.html" }
        ] 
    },
    adjectives: { 
        title: "Adjectives Lab", 
        exercises: [
            { name: "Adjective Order", link: "practice/adjectives/order.html" },
            { name: "Comparative & Superlative", link: "practice/adjectives/degrees.html" },
            { name: "Proper Adjectives", link: "practice/adjectives/proper.html" },
            { name: "Participial (-ing/-ed)", link: "practice/adjectives/participial.html" }
        ] 
    },
    adverbs: { 
        title: "Adverbs Lab", 
        exercises: [
            { name: "Adverbs of Frequency", link: "practice/adverbs/frequency.html" },
            { name: "Placement in Sentences", link: "practice/adverbs/placement.html" },
            { name: "Adverbs vs. Adjectives", link: "practice/adverbs/comparison.html" },
            { name: "Intensifiers", link: "practice/adverbs/intensifiers.html" }
        ] 
    },
    prepositions: { 
        title: "Prepositions Lab", 
        exercises: [
            { name: "Prepositions of Place", link: "practice/prepositions/place.html" },
            { name: "Prepositions of Time", link: "practice/prepositions/time.html" },
            { name: "Dependent Prepositions", link: "practice/prepositions/dependent.html" },
            { name: "Phrasal Verbs Intro", link: "practice/prepositions/phrasal.html" }
        ] 
    },
    conjunctions: { 
        title: "Conjunctions Lab", 
        exercises: [
            { name: "Coordinating (FANBOYS)", link: "practice/conjunctions/coordinating.html" },
            { name: "Subordinating Conjunctions", link: "practice/conjunctions/subordinating.html" },
            { name: "Correlative Conjunctions", link: "practice/conjunctions/correlative.html" },
            { name: "Linking Adverbs", link: "practice/conjunctions/linking.html" }
        ] 
    },
    interjections: { 
        title: "Interjections Lab", 
        exercises: [
            { name: "Common Interjections", link: "practice/interjections/common.html" },
            { name: "Punctuating Emotion", link: "practice/interjections/punctuation.html" },
            { name: "Formal vs. Informal", link: "practice/interjections/style.html" }
        ] 
    }
};
/**
 * Opens the practice modal and locks the main page scroll
 */
function openModal(id) {
    const data = modules[id];
    const overlay = document.getElementById('practiceModal');
    const content = document.getElementById('modalContent');
    
    // Safety check if module doesn't exist
    if (!data) return;

    // Generate HTML for the practice grid
    let html = `
        <span class="modal-tag">Practice Session</span>
        <h2 class="modal-title">${data.title}</h2>
        <div class="practice-grid">
    `;

    data.exercises.forEach((ex, index) => {
        html += `
            <div class="chip">
                <div>
                    <div style="font-weight: 800; font-size: 0.7rem; color: #ccc; margin-bottom: 5px;">MODULE ${index + 1}</div>
                    <div class="chip-title">${ex.name}</div>
                </div>
                <a href="${ex.link}" class="start-link">Start Practice</a>
            </div>
        `;
    });

    html += `</div>`;
    
    // Inject the content
    content.innerHTML = html;
    
    // Show Modal
    overlay.classList.add('active');
    
    // FIX: Lock the main body scroll entirely
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
}

/**
 * Closes the modal and restores page scroll
 */
function closeModal() {
    const overlay = document.getElementById('practiceModal');
    overlay.classList.remove('active');
    
    // FIX: Restore scroll when modal is gone
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
}

/**
 * Event Listener: Close modal when clicking on the blurred overlay background
 */
window.onclick = function(event) {
    const overlay = document.getElementById('practiceModal');
    if (event.target === overlay) {
        closeModal();
    }
};

/**
 * Accessibility: Close modal on 'Escape' key press
 */
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});