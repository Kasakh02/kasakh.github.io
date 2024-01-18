// Function to load days table
function loadDays() {
	$.ajax({
		url: 'https://localhost:7180/api/GetAllDays',
		type: 'GET',
		success: function (days) {
			displayDaysTable(days);
		},
		error: function () {
			console.error('Error loading days.');
		}
	});
}

// Function to display days table
function displayDaysTable(days) {
	var table = '<thead><tr><th class="duration">Date</th><th class="duration">Total Time</th><th class="duration">Pause Time</th><th class="eff">Efficiency</th></tr></thead><tbody>';
	for (var i = 0; i < days.length; i++) {
		table += '<tr onclick="loadStudies(' + days[i].id + ')">';
		table += '<td>' + days[i].date + '</td>';
		table += '<td>' + days[i].totalTime + '</td>';
		table += '<td>' + days[i].pauseTime + '</td>';
		table += '<td>' + days[i].efficiency + '</td>';
		table += '</tr>';
	}
	table += '</tbody>';
	$('#daysTable').html(table);
}

// Function to load studies for a specific day
function loadStudies(selectedDayId) {
	$.ajax({
		url: 'https://localhost:7180/api/GetStudiesForDay?selectedDayId=' + selectedDayId,
		type: 'GET',
		success: function (studies) {
			displayStudiesTable(studies);
		},
		error: function () {
			console.error('Error loading studies.');
		}
	});
}

// Function to display studies table
function displayStudiesTable(studies) {
	var table = '<thead><tr><th class="duration">Total Time</th><th class="duration">Pause Time</th><th class="eff">Efficiency</th><th class="times">Start Time</th><th class="times">End Time</th><th class="notes">Summary</th><th class="notes">Notes</th></tr></thead><tbody>';
	for (var i = 0; i < studies.length; i++) {
		table += '<tr>';
		table += '<td>' + studies[i].totalTime + '</td>';
		table += '<td>' + studies[i].pauseTime + '</td>';
		table += '<td>' + studies[i].efficiency + '</td>';
		table += '<td>' + studies[i].startTime + '</td>';
		table += '<td>' + studies[i].endTime + '</td>';
		table += '<td>' + studies[i].summary + '</td>';
		table += '<td>' + studies[i].notes + '</td>';
		table += '</tr>';
	}
	table += '</tbody>';
	$('#studiesContainer').html('<table border="1">' + table + '</table>');
}

// Call loadDays function on page load
$(document).ready(function () {
	loadDays();
});

// Define variables for stopwatch
let stopwatchInterval;
let startTime;

// Function to toggle study (start/stop)
function toggleStudy() {
    const startStopButton = $('#startStopButton');
    const stopwatchContainer = $('#stopwatchContainer');

    if (startStopButton.text() === 'Start Study') {
        // Start Study
        startStopButton.text('Stop Study');
        startTime = new Date();
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        stopwatchContainer.show();
    } else {
        // Stop Study
        clearInterval(stopwatchInterval);
        displayStudyInfo();
        startStopButton.text('Start Study');
        stopwatchContainer.hide();
    }
}

// Function to update the stopwatch
function updateStopwatch() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);
    const formattedTime = formatTime(elapsedTime);
    $('#stopwatch').text(formattedTime);
}

// Function to format time (HH:MM:SS)
function formatTime(time) {
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();
    return (
        String(hours).padStart(2, '0') +
        ':' +
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0')
    );
}

// Function to display study information
function displayStudyInfo() {
    const endTime = new Date();
    const timePassed = formatTime(new Date(endTime - startTime));
    const startTimeString = startTime.toLocaleTimeString();
    const endTimeString = endTime.toLocaleTimeString();

    // Display the study information below the stopwatch
    $('#studiesContainer').append(`
        <p>Time Passed: ${timePassed}</p>
        <p>Start Time: ${startTimeString}</p>
        <p>End Time: ${endTimeString}</p>
    `);
}