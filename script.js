// Global variables
let nickname = "";
let currentTask = 0;
let completedTasks = [];
let leaderboardData = [];

// Dictionary for the tasks with their answers
const tasks = {
    1: { question: "What is 2 + 2?", answer: "4" },
    2: { question: "What is the capital of France?", answer: "Paris" },
    3: { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
    4: { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
    5: { question: "What is the square root of 16?", answer: "4" },
    6: { question: "Who painted the Mona Lisa?", answer: "Da Vinci" },
    7: { question: "What is the currency of Japan?", answer: "Yen" },
    8: { question: "What is the hardest natural substance?", answer: "Diamond" },
    9: { question: "What is the longest river in the world?", answer: "Nile" },
    10: { question: "Who discovered penicillin?", answer: "Fleming" },
};

// Function to start the game
document.getElementById("start-button").addEventListener("click", () => {
    nickname = prompt("Please enter your nickname:");
    if (nickname) {
        currentTask = 1;
        completedTasks = [];
        showTaskPage();
    }
});

// Function to show the task page
function showTaskPage() {
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("task-page").classList.remove("hidden");
    document.getElementById("nickname-display").textContent = nickname;
    displayTaskButtons();
}

// Function to display the task buttons
function displayTaskButtons() {
    const taskButtonsDiv = document.getElementById("task-buttons");
    taskButtonsDiv.innerHTML = ""; // Clear any previous buttons
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement("button");
        button.textContent = `Task ${i}`;
        button.addEventListener("click", () => showTaskDetail(i));
        if (completedTasks.includes(i)) {
            button.style.backgroundColor = 'green';
        }
        taskButtonsDiv.appendChild(button);
    }
}

// Function to show task details
function showTaskDetail(taskNumber) {
    document.getElementById("task-page").classList.add("hidden");
    document.getElementById("task-detail-page").classList.remove("hidden");

    const task = tasks[taskNumber];
    document.getElementById("task-question").textContent = task.question;

    document.getElementById("submit-answer-button").onclick = () => checkAnswer(taskNumber, task.answer);
    document.getElementById("task-back-button").onclick = showTaskPage;
}

// Function to check the answer
function checkAnswer(taskNumber, correctAnswer) {
    const userAnswer = document.getElementById("answer-input").value.trim();
    if (userAnswer === correctAnswer) {
        alert("Correct! Task completed.");
        completedTasks.push(taskNumber);
        document.getElementById("task-detail-page").classList.add("hidden");
        showTaskPage();
        if (completedTasks.length === 10) {
            alert("Congratulations! All tasks completed.");
            showLeaderboard();
        }
    } else {
        alert("Incorrect answer. Try again.");
    }
}

// Function to show the leaderboard
document.getElementById("leaderboard-button").addEventListener("click", showLeaderboard);
document.getElementById("back-to-home-button").addEventListener("click", showHomePage);

function showLeaderboard() {
    document.getElementById("task-page").classList.add("hidden");
    document.getElementById("leaderboard-page").classList.remove("hidden");

    const leaderboardDiv = document.getElementById("leaderboard");
    leaderboardDiv.innerHTML = ""; // Clear previous leaderboard

    leaderboardData.forEach(entry => {
        const entryElement = document.createElement("div");
        entryElement.textContent = `${entry.nickname} - ${entry.time}`;
        leaderboardDiv.appendChild(entryElement);
    });
}

// Function to go back to home
function showHomePage() {
    document.getElementById("leaderboard-page").classList.add("hidden");
    document.getElementById("home-page").classList.remove("hidden");
}
