// enable strict mode
'use strict';

// create redips container
let redips = {};

// initialization
redips.init = function () {
	// set reference to the progress bar DIV
	redips.div = document.getElementById('progress');
	// create XML HTTP request object
	redips.xhr = new XMLHttpRequest();
	// set interval ID to false
	redips.intervalID = false;
};


// send request to server
redips.sendRequest = function () {
	let numberMax = 20, // limit number of requests (needed only for demo)
		xhr = redips.xhr;
	// if server is asked less than numberMax
	if (redips.number < numberMax) {
		xhr.open('GET', 'ajax-progress-bar.php', true); // open asynchronus request
		xhr.onreadystatechange = redips.requestHandler; // set request handler
		xhr.send(null);									// send request
		redips.number++;								// increase counter
	}
	// otherwise stop polling
	else {
		redips.pollingStop();
	}
};


// request handler
redips.requestHandler = function () {
	let xhr = redips.xhr;
	// if operation is completed (readyState === 4)
	if (xhr.readyState === XMLHttpRequest.DONE) {
		// if HTTP status is OK
		if (xhr.status === 200) {
			// get progress level from JSON output
			let level = JSON.parse(xhr.responseText).progress;
			// set progress bar width and innerHTML
			redips.div.style.width = redips.div.innerHTML = level + '%';
		}
		// if request status is not OK
		else {
			redips.div.style.width = '100%';
			redips.div.innerHTML = 'Error:[' + xhr.status + ']' + xhr.statusText;
		}
	}
};


// button start
redips.pollingStart = function () {
	if (!redips.intervalID) {
		// reset number of requests
		redips.number = 0;
		// start polling
		redips.intervalID = window.setInterval(redips.sendRequest, 1000);
	}
};


// button stop
redips.pollingStop = function () {
	let xhr = redips.xhr;
	// abort current request if status is 1, 2, 3
	// 0: request not initialized
	// 1: server connection established
	// 2: request received
	// 3: processing request
	// 4: request finished and response is ready
	if (xhr.readyState > 0 && xhr.readyState < 4) {
		xhr.abort();
	}
	window.clearInterval(redips.intervalID);
	redips.intervalID = false;
	// display 'Demo stopped'
	redips.div.style.width = '100%';
	redips.div.innerHTML = 'Reload the Progress to be continued';
};


// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redips.init, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redips.init);
}
