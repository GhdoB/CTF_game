// Global variables for tracking game progress
let currentTask = 1;
let completedTasks = [];

// Tasks: These should be replaced with your own tasks later
const tasks = [
    { taskNumber: 1, taskDescription: 'What is 2 + 2?', correctFlag: '4' },
    { taskNumber: 2, taskDescription: 'What is the color of the sky?', correctFlag: 'blue' },
    { taskNumber: 3, taskDescription: 'What is the capital of France?', correctFlag: 'paris' },
    { taskNumber: 4, taskDescription: 'What is 10 * 2?', correctFlag: '20' },
    { taskNumber: 5, taskDescription: 'What is 5 + 3?', correctFlag: '8' },
    { taskNumber: 6, taskDescription: 'What is the sum of 7 and 3?', correctFlag: '10' },
    { taskNumber: 7, taskDescription: 'What is 20 divided by 4?', correctFlag: '5' },
    { taskNumber: 8, taskDescription: 'What is 15 - 3?', correctFlag: '12' },
    { taskNumber: 9, taskDescription: 'What is the capital of Germany?', correctFlag: 'berlin' },
    { taskNumber: 10, taskDescription: 'What is 3 * 3?', correctFlag: '9' }
];

// DOM Elements
const homeScreen = document.getElementById('homeScreen');
const taskPage = document.getElementById('taskPage');
const celebrationPage = document.getElementById('celebrationPage');
const taskList = document.getElementById('taskList');
const taskText = document.getElementById('taskText');
const answerInput = document.getElementById('answerInput');
const submitAnswerButton = document.getElementById('submitAnswerButton');
const feedback = document.getElementById('feedback');
const nicknameInput = document.getElementById('nicknameInput');
const submitNicknameButton = document.getElementById('submitNicknameButton');
const leaderboardList = document.getElementById('leaderboardList');

// Start the game
function startGame() {
    homeScreen.style.display = 'none';
    taskPage.style.display = 'block';
    displayTasks();
}

// Display the tasks on the home screen
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskButton = document.createElement('button');
        taskButton.textContent = `Task ${task.taskNumber}`;
        taskButton.classList.add('button');
        taskButton.addEventListener('click', () => startTask(task));
        if (completedTasks.includes(task.taskNumber)) {
            taskButton.style.backgroundColor = 'green';
        }
        taskList.appendChild(taskButton);
    });
}

// Start a specific task
function startTask(task) {
    taskText.textContent = task.taskDescription;
    feedback.textContent = '';
    answerInput.value = '';
    submitAnswerButton.disabled = false;
    
    submitAnswerButton.onclick = () => submitAnswer(task);
}

// Submit the answer for the current task
function submitAnswer(task) {
    const userAnswer = answerInput.value.trim().toLowerCase();
    if (userAnswer === task.correctFlag) {
        feedback.textContent = 'Correct answer!';
        feedback.style.color = 'green';
        completedTasks.push(task.taskNumber); // Mark the task as complete
        displayTasks(); // Update the task list
        if (completedTasks.length === tasks.length) {
            goToCelebrationPage(); // Go to celebration page when all tasks are completed
        }
    } else {
        feedback.textContent = 'Incorrect answer. Try again!';
        feedback.style.color = 'red';
    }
}

// Go to the celebration page when all tasks are completed
function goToCelebrationPage() {
    taskPage.style.display = 'none';
    celebrationPage.style.display = 'block';
}

// Submit the nickname to the leaderboard
submitNicknameButton.onclick = function() {
    const nickname = nicknameInput.value.trim();
    if (nickname) {
        // Store the nickname in the leaderboard
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        const timeTaken = Math.floor(Math.random() * 100); // Random time for now (replace with actual time)
        leaderboard.push({ nickname, timeTaken });
        leaderboard.sort((a, b) => a.timeTaken - b.timeTaken); // Sort leaderboard by time
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        updateLeaderboard();
    }
};

// Update the leaderboard display
function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboardList.innerHTML = '';
    leaderboard.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.nickname}: ${player.timeTaken} seconds`;
        leaderboardList.appendChild(listItem);
    });
}

// Show the home screen when the page is loaded
window.onload = () => {
    updateLeaderboard();
    homeScreen.style.display = 'block';
    taskPage.style.display = 'none';
    celebrationPage.style.display = 'none';
};

// Set up the start button to trigger the game
document.getElementById('startButton').addEventListener('click', startGame);
