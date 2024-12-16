// Global variables
let currentTask = 0; // Keeps track of the last completed task
let completedTasks = []; // List of completed task numbers

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
    10: { question: "Who discovered penicillin?", answer: "Fleming" }
};

// Function to start the game
function startGame() {
    currentTask = 1; // Start from task 1
    completedTasks = []; // Reset completed tasks
    showTaskPage(); // Show the task page directly
}

// Function to show the task page
function showTaskPage() {
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("task-page").classList.remove("hidden");

    const taskButtonsContainer = document.getElementById("task-buttons");
    taskButtonsContainer.innerHTML = ''; // Clear any previous task buttons

    // Create task buttons (task 1 to task 10)
    for (let i = 1; i <= 10; i++) {
        const taskButton = document.createElement("button");
        taskButton.textContent = `Task ${i}`;
        taskButton.addEventListener("click", () => showTaskDetail(i));
        if (completedTasks.includes(i)) {
            taskButton.style.backgroundColor = "green"; // Mark completed tasks
        }
        taskButtonsContainer.appendChild(taskButton);
    }

    // Handle home button to go back to the home page
    document.getElementById("home-button").addEventListener("click", showHomePage);
}

// Function to show task details
function showTaskDetail(taskNumber) {
    const task = tasks[taskNumber];
    document.getElementById("task-page").classList.add("hidden");
    document.getElementById("task-detail-page").classList.remove("hidden");

    // Display the task question
    document.getElementById("task-question").textContent = task.question;

    // Handle answer submission
    const submitButton = document.getElementById("submit-answer-button");
    submitButton.onclick = function() {
        checkAnswer(taskNumber, task.answer);
    };

    // Handle going back to the task list
    document.getElementById("task-back-button").addEventListener("click", showTaskPage);
}

// Function to check the answer
function checkAnswer(taskNumber, correctAnswer) {
    const userAnswer = document.getElementById("answer-input").value.trim();
    if (userAnswer === correctAnswer) {
        alert("Correct! Well done.");
        completedTasks.push(taskNumber);
        currentTask = taskNumber + 1; // Update the current task number
        showTaskPage(); // Go back to the task list with updated task buttons
    } else {
        alert("Incorrect. Try again.");
    }
}

// Function to show the home page
function showHomePage() {
    document.getElementById("task-page").classList.add("hidden");
    document.getElementById("home-page").classList.remove("hidden");
}

// Event listener for the Start button
document.getElementById("start-button").addEventListener("click", startGame);
