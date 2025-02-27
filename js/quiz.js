class FantasyQuiz {
    constructor() {
        this.questions = [
            {
                question: "What is the most important factor to consider when selecting a team captain?",
                options: [
                    "Recent form and consistency",
                    "Player's popularity",
                    "Team ranking",
                    "Player's age"
                ],
                correct: 0
            },
            {
                question: "Which strategy is most effective for managing your fantasy sports budget?",
                options: [
                    "Spend all credits on star players",
                    "Balance between star players and consistent performers",
                    "Choose only low-cost players",
                    "Pick players from one team only"
                ],
                correct: 1
            },
            {
                question: "How often should you check team news and updates before a match?",
                options: [
                    "Only after team announcement",
                    "Once a week",
                    "Right before the deadline",
                    "Regularly, including just before the deadline"
                ],
                correct: 3
            },
            {
                question: "What is the best approach for tournament selection?",
                options: [
                    "Join all available tournaments",
                    "Select based on entry fee and prize pool ratio",
                    "Only join free tournaments",
                    "Join tournaments with most participants"
                ],
                correct: 1
            },
            {
                question: "Which factor is least important when selecting players?",
                options: [
                    "Recent performance",
                    "Player's social media following",
                    "Match conditions",
                    "Head-to-head records"
                ],
                correct: 1
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);

        // DOM Elements
        this.elements = {
            questionText: document.getElementById('questionText'),
            optionsContainer: document.getElementById('optionsContainer'),
            prevButton: document.getElementById('prevButton'),
            nextButton: document.getElementById('nextButton'),
            submitButton: document.getElementById('submitButton'),
            restartButton: document.getElementById('restartButton'),
            resultContainer: document.getElementById('resultContainer'),
            scoreText: document.getElementById('scoreText'),
            feedbackText: document.getElementById('feedbackText'),
            currentQuestionNum: document.getElementById('currentQuestion'),
            totalQuestions: document.getElementById('totalQuestions'),
            progressBar: document.querySelector('.quiz-progress-bar .progress')
        };

        // Initialize
        this.initializeQuiz();
        this.setupEventListeners();
    }

    initializeQuiz() {
        this.elements.totalQuestions.textContent = this.questions.length;
        this.showQuestion();
        this.updateProgress();
    }

    setupEventListeners() {
        this.elements.prevButton.addEventListener('click', () => this.previousQuestion());
        this.elements.nextButton.addEventListener('click', () => this.nextQuestion());
        this.elements.submitButton.addEventListener('click', () => this.submitQuiz());
        this.elements.restartButton.addEventListener('click', () => this.restartQuiz());
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        this.elements.questionText.textContent = question.question;
        this.elements.currentQuestionNum.textContent = this.currentQuestion + 1;
        
        // Clear and create new options
        this.elements.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            if (this.userAnswers[this.currentQuestion] === index) {
                optionDiv.classList.add('selected');
            }
            optionDiv.textContent = option;
            optionDiv.addEventListener('click', () => this.selectOption(index));
            this.elements.optionsContainer.appendChild(optionDiv);
        });

        // Update button states
        this.elements.prevButton.disabled = this.currentQuestion === 0;
        this.elements.nextButton.disabled = this.userAnswers[this.currentQuestion] === null;
        this.elements.submitButton.style.display = this.currentQuestion === this.questions.length - 1 ? 'inline-block' : 'none';
        this.elements.nextButton.style.display = this.currentQuestion === this.questions.length - 1 ? 'none' : 'inline-block';
    }

    selectOption(index) {
        this.userAnswers[this.currentQuestion] = index;
        
        // Update option styling
        const options = this.elements.optionsContainer.children;
        Array.from(options).forEach((option, i) => {
            option.classList.toggle('selected', i === index);
        });

        // Enable next/submit button
        if (this.currentQuestion === this.questions.length - 1) {
            this.elements.submitButton.disabled = false;
        } else {
            this.elements.nextButton.disabled = false;
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
            this.updateProgress();
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
            this.updateProgress();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
    }

    submitQuiz() {
        this.score = 0;
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.score++;
            }
        });

        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Hide quiz content and show results with animation
        this.elements.optionsContainer.style.display = 'none';
        this.elements.questionText.style.display = 'none';
        this.elements.submitButton.style.display = 'none';
        this.elements.prevButton.style.display = 'none';
        
        // Generate detailed feedback
        let feedback = '';
        let title = '';
        if (percentage === 100) {
            title = 'Perfect Score!';
            feedback = 'Outstanding! You have mastered fantasy sports knowledge. Ready to dominate the tournaments!';
        } else if (percentage >= 80) {
            title = 'Excellent Performance!';
            feedback = 'Great job! You have a strong understanding of fantasy sports. Keep up the great work!';
        } else if (percentage >= 60) {
            title = 'Good Effort!';
            feedback = 'You have a good foundation. Review the learning materials to improve your knowledge further.';
        } else if (percentage >= 40) {
            title = 'Keep Learning!';
            feedback = 'You\'re on the right track. Focus on the basics and try again to improve your score.';
        } else {
            title = 'Time to Practice!';
            feedback = 'Don\'t worry! Everyone starts somewhere. Review our learning materials and try again.';
        }

        // Update result elements
        this.elements.resultContainer.innerHTML = `
            <h3>${title}</h3>
            <div id="scoreText">${percentage}%</div>
            <div id="feedbackText">${feedback}</div>
            <p style="margin-top: 1rem; color: #e2e8f0;">Correct Answers: ${this.score} out of ${this.questions.length}</p>
        `;

        // Show results and restart button
        this.elements.resultContainer.style.display = 'block';
        this.elements.restartButton.style.display = 'inline-block';
        this.elements.restartButton.classList.add('primary');
    }

    restartQuiz() {
        // Reset quiz state
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);

        // Reset display
        this.elements.resultContainer.style.display = 'none';
        this.elements.restartButton.style.display = 'none';
        this.elements.optionsContainer.style.display = 'block';
        this.elements.questionText.style.display = 'block';
        this.elements.nextButton.style.display = 'inline-block';
        this.elements.prevButton.style.display = 'inline-block';
        this.elements.prevButton.disabled = true;

        // Reset progress bar
        if (this.elements.progressBar) {
            this.elements.progressBar.style.width = '0%';
        }

        // Show first question
        this.showQuestion();
        this.updateProgress();
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FantasyQuiz();
}); 