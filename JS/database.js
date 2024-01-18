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
	var table = '<thead><tr><th class="duration">Date</th><th class="duration">Total Time</th></tr></thead><tbody>';
	for (var i = 0; i < days.length; i++) {
		table += '<tr onclick="loadStudies(' + days[i].id + ')">';
		table += '<td>' + days[i].date + '</td>';
		table += '<td>' + days[i].totalTime + '</td>';
		table += '</tr>';
	}
	table += '</tbody>';
	$('#daysTable').html('<table border="1">' + table + '</table>');
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
	var table = '<thead><tr><th class="duration">Total Time</th><th class="times">Start Time</th><th class="times">End Time</th><th class="notes">Summary</th><th class="notes">Notes</th></tr></thead><tbody>';
	for (var i = 0; i < studies.length; i++) {
		table += '<tr>';
		table += '<td>' + studies[i].totalTime + '</td>';
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