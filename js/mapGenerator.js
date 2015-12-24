var MIN_HEIGHT = 5;
var MAX_HEIGHT = 1;

$(document).ready(function() {
	var mapHeight = $("#bodyMap").height();
	var mapWidth = $("#bodyMap").width();
	MAX_HEIGHT = (mapHeight / 30) - 4;
	console.log(mapWidth + "x" + mapHeight);
	var squared = [];

	//showUnavailableSpot();

	for (var i = 0; i < mapWidth; i += 30) {
		var lineSquare = [];
		for (var j = 0; j < mapHeight; j += 30) {
			lineSquare.push(j / 30);
		};
		squared.push(lineSquare);
	};


	var start = Math.floor(Math.random() * (squared[0].length - MIN_HEIGHT)) + 1;

	if (start < MIN_HEIGHT)
		start = MIN_HEIGHT;

	console.log(squared);

	for (var i = 0; i < squared.length; i++) {
		populateGroundColumn(i, squared, start);
		start = generateNewIndex(start);
	};

});


function generateNewIndex(index, min, max) {
	var direction = Math.floor(Math.random() * 10) % 3;

	if (direction == 0 && index < MAX_HEIGHT) {
		return index + 1;
	} else if (direction == 1) {
		return index;
	} else if (direction == 2 && index > MIN_HEIGHT) {
		return index - 1;
	}
	return index;
}

function populateGroundColumn(column, squared, height) {

	for (var i = height; i < squared[0].length; i++) {
		var top = i * 30;
		var left = column * 30;
		if (i > 45)
			$("#bodyMap").append("<div class='square-field' style='background-color:blue;top:" + top + "px;left:" + left + "px'></div>");
		else
			$("#bodyMap").append("<div class='square-field' style='top:" + top + "px;left:" + left + "px'></div>");
	};
}