const activeTimersContainer = document.getElementById('activeTimers');
const startTimerButton = document.getElementById('startTimer');

startTimerButton.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time!!!');
        return;
    }
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    createTimer(totalSeconds);
});

function createTimer(totalSeconds) {
    const timerElement = document.createElement('div');
    timerElement.classList.add("timer");

    timerElement.className = 'timer';
    activeTimersContainer.appendChild(timerElement);

    const timeLeftText = document.createElement('span');
    timeLeftText.textContent = 'Time Left:';
    timerElement.appendChild(timeLeftText);

    const timeDisplay = document.createElement('span');
    timerElement.appendChild(timeDisplay);

    let countdownInterval = setInterval(() => {
        totalSeconds--;

        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            timerElement.className = 'timer timer-end';
            timerElement.innerHTML = 'Time\'s up! ';
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Timer';
            deleteButton.addEventListener('click', () => {
                clearInterval(countdownInterval);
                timerElement.remove();
            });
            timerElement.appendChild(deleteButton);
            playAudioAlert();   //Add the audio alert function
        } else {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            //timerElement.textContent = `Time Left : ${(hours)}:${(minutes)}:${(seconds)}`;
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timerElement.textContent = `Time Left:  ${formattedTime}`;

            const stopButton = document.createElement('button');
            stopButton.innerText = 'Stop Timer';
            stopButton.addEventListener('click', () => {
                clearInterval(countdownInterval);
                timerElement.remove();
            });
            timerElement.appendChild(stopButton);
        }
    }, 1000);
    // stopButton.addEventListener('click', () => {
    //     clearInterval(countdownInterval);
    //     timerElement.remove();
    // });
    
}

function playAudioAlert() { // audio play
    const audio = new Audio('alert.mp3');
    audio.play();
}
