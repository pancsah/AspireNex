document.addEventListener("DOMContentLoaded", () => {
    const addQuestionBtn = document.getElementById("add-question");
    const quizForm = document.getElementById("quiz-form");
    const questionsContainer = document.getElementById("questions-container");
    const takeQuizDiv = document.getElementById("take-quiz");
    const quizTakeForm = document.getElementById("quiz-take-form");
    const quizQuestionsDiv = document.getElementById("quiz-questions");
    const resultsDiv = document.getElementById("results");
    const scoreDisplay = document.getElementById("score");

    let quizData = [];

    addQuestionBtn.addEventListener("click", () => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question-block");
        questionBlock.innerHTML = `
            <label>Question: <input type="text" name="question" required></label>
            <label>Option A: <input type="text" name="optionA" required></label>
            <label>Option B: <input type="text" name="optionB" required></label>
            <label>Option C: <input type="text" name="optionC" required></label>
            <label>Option D: <input type="text" name="optionD" required></label>
            <label>Correct Answer: 
                <select name="correctAnswer" required>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </label>
        `;
        questionsContainer.appendChild(questionBlock);
    });

    quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const formData = new FormData(quizForm);
        const questions = [];
        const blocks = questionsContainer.querySelectorAll(".question-block");

        blocks.forEach(block => {
            const question = block.querySelector('input[name="question"]').value;
            const optionA = block.querySelector('input[name="optionA"]').value;
            const optionB = block.querySelector('input[name="optionB"]').value;
            const optionC = block.querySelector('input[name="optionC"]').value;
            const optionD = block.querySelector('input[name="optionD"]').value;
            const correctAnswer = block.querySelector('select[name="correctAnswer"]').value;

            questions.push({
                question,
                options: { A: optionA, B: optionB, C: optionC, D: optionD },
                correctAnswer
            });
        });

        quizData = questions;
        quizForm.reset();
        questionsContainer.innerHTML = "";
        displayQuiz(quizData);
    });

    function displayQuiz(quiz) {
        quizQuestionsDiv.innerHTML = "";

        quiz.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question-block");
            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                <label><input type="radio" name="question${index}" value="A" required> ${q.options.A}</label><br>
                <label><input type="radio" name="question${index}" value="B"> ${q.options.B}</label><br>
                <label><input type="radio" name="question${index}" value="C"> ${q.options.C}</label><br>
                <label><input type="radio" name="question${index}" value="D"> ${q.options.D}</label><br>
            `;
            quizQuestionsDiv.appendChild(questionDiv);
        });

        takeQuizDiv.style.display = "block";
        resultsDiv.style.display = "none";
    }

    quizTakeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(quizTakeForm);
        let score = 0;

        quizData.forEach((q, index) => {
            const userAnswer = formData.get(`question${index}`);
            if (userAnswer === q.correctAnswer) {
                score++;
            }
        });

        scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}`;
        resultsDiv.style.display = "block";
        takeQuizDiv.style.display = "none";
        quizTakeForm.reset();
    });
});
