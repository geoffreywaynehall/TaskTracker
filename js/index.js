// Initialize the storage to default values if there is nothing already stored.

var storage = data;

// Clear fields
document.getElementById("Name").value = '';
document.getElementById("Date").value = '';
document.getElementById("Assigned").value = '';

// Create and set today's date, if datepicker is supported
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if(dd <= 9) dd = '0' + dd;
if(mm <= 9) mm = '0' + mm;

today = (yyyy + '-' + mm + '-' + dd);

if(document.getElementById("Date").type == 'date') document.getElementById("Date").value = today;

// Function to update the task list in the html
var update = function() {

  var tasks = '';

  for(task = 0; task < storage.length; task++) {

    if(task % 2) {
      tasks = tasks.concat('<div class="btask"><span class="name"><b>' + storage[task].name + '</b></span>\
      <span class="date">' + storage[task].date + '</span>\
      <span class="assigned"><b>' + storage[task].assigned + '</b></span></div>');
    }
    else {
      tasks = tasks.concat('<div class="wtask"><span class="name"><b>' + storage[task].name + '</b></span>\
      <span class="date">' + storage[task].date + '</span>\
      <span class="assigned"><b>' + storage[task].assigned + '</b></span></div>');
    }
  }

  document.getElementById("output").innerHTML = tasks;
};

// Output the initial list
update();

// Listen for button click to add new task.
document.getElementById("submit").addEventListener("click", function () {

	// If HTML Datepicker is supported
	var rawDate = /[0-9][0-9][0-9][0-9]\-[0-3][0-9]\-[0-1][0-9]/
	if(rawDate.test(document.getElementById("Date").value)) {
		var origDate = document.getElementById("Date").value.split('-')

		storage.push({"name" : document.getElementById("Name").value , "date" : (origDate[1] + '/' + origDate[2] + '/' + origDate[0]) , "assigned" : document.getElementById("Assigned").value});
		update();

		document.getElementById("Name").value = '';
		document.getElementById("Date").value = today;
		document.getElementById("Assigned").value = '';
	}

	// If HTML Datepicker is not supported
	var date = /[0-1][0-9]\/[0-3][0-9]\/[0-9][0-9][0-9][0-9]/;
	if(document.getElementById("Name").value != '' && date.test(document.getElementById("Date").value) && document.getElementById("Assigned").value != '') {
  	storage.push({"name" : document.getElementById("Name").value , "date" : document.getElementById("Date").value , "assigned" : document.getElementById("Assigned").value});
  	update();
		document.getElementById("Name").value = '';
		document.getElementById("Date").value = '';
		document.getElementById("Assigned").value = '';
	}
});
