// Global variables for tracking game progress
let currentTask = 1;
const taskList = document.getElementById('taskList');
const taskStatus = document.getElementById('taskStatus');
let completedTasks = [];

// Home Screen
const homeScreen = document.getElementById('homeScreen');
const taskPage = document.getElementById('taskPage');
const leaderboardButton = document.getElementById('leaderboardButton');

// Task Detail Popup
const taskDetailPopup = document.getElementById('taskDetailPopup');
const downloadButton = document.getElementById('downloadButton');
const flagInput = document.getElementById('flagInput');
const submitFlagButton = document.getElementById('submitFlagButton');

// Leaderboard (Just a placeholder for now)
leaderboardButton.addEventListener('click', () => {
    alert('Leaderboard feature is coming soon!');
});

// Start Game
document.getElementById('startButton').addEventListener('click', () => {
    const nickname = prompt('Enter your nickname:');
    if (nickname) {
        homeScreen.style.display = 'none';
        taskPage.style.display = 'block';
        displayTasks();
    }
});

// Continue Button
document.getElementById('continueButton').addEventListener('click', () => {
    taskPage.style.display = 'block';
    displayTasks();
});

// Show Tasks List
function displayTasks() {
    taskList.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const taskButton = document.createElement('button');
        taskButton.textContent = `Task ${i}`;
        taskButton.classList.add('button');
        taskButton.addEventListener('click', () => showTaskDetail(i));
        if (completedTasks.includes(i)) {
            taskButton.style.backgroundColor = 'green';
        }
        taskList.appendChild(taskButton);
    }
}

// Show Task Detail Popup for Task 1
function showTaskDetail(taskNumber) {
    if (taskNumber === 1 && !completedTasks.includes(1)) {
        taskDetailPopup.style.display = 'block';
    } else {
        alert('Task already completed or not available yet!');
    }
}

// Download PNG (Task 1)
downloadButton.addEventListener('click', () => {
    alert('Image has been downloaded successfully!');
    taskStatus.textContent = 'Download Complete! Now, enter the correct flag to complete this task.';
});

// Flag Submission (Task 1)
submitFlagButton.addEventListener('click', () => {
    const enteredFlag = flagInput.value.trim();
    const correctFlag = 'correct_flag'; // Set the correct flag here

    if (enteredFlag === correctFlag) {
        completedTasks.push(1);
        alert('Correct flag! Task 1 complete.');
        taskDetailPopup.style.display = 'none';
        displayTasks();
    } else {
        alert('Incorrect flag. Try again.');
    }
});

// Home Button
document.getElementById('homeButton').addEventListener('click', () => {
    taskPage.style.display = 'none';
    homeScreen.style.display = 'block';
    if (completedTasks.length > 0) {
        document.getElementById('continueButton').style.display = 'block';
    } else {
        document.getElementById('continueButton').style.display = 'none';
    }
});
