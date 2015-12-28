var MIN_HEIGHT = 5;
var MAX_HEIGHT = 1;
var event = new Event('mapCreated');
$(document).ready(function() {
	var mapHeight = $("#bodyMap").height();
	var mapWidth = $("#bodyMap").width();
	// -4 pour les case en bas
	MAX_HEIGHT = (mapHeight / 30) - 4;
	console.log(mapWidth + "x" + mapHeight);
	var squared = [];

	//on fait une boucle pour parcourir(de case en case) toute les colones 
	for (var i = 0; i < mapWidth; i += 30) {
		var lineSquare = [];
		//on fait une boucle pour parcourir(de case en case) toute les lignes		
		for (var j = 0; j < mapHeight; j += 30) {
			lineSquare.push({type : "BOLCK_AIR"});
		};
		squared.push(lineSquare);
	};

	// calculate the bigining of the first dirt bolock column
	var start = Math.floor(Math.random() * (squared[0].length - MIN_HEIGHT)) + 1;


	if (start < MIN_HEIGHT)
		start = MIN_HEIGHT;


	for (var i = 0; i < squared.length; i++) {
		populateGroundColumn(i, squared, start);
		start = generateNewIndex(start);
	};
	console.log(squared);

	// tirriger the event of the map created and the map as a param
	$(document).trigger("mapCreated",{map:squared});
});


function generateNewIndex(index) {
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
			squared[column][i].type = "BLOCK_DIRT";
			$("#bodyMap").append("<div class='square-field' style='top:" + top + "px;left:" + left + "px'>"+left/30+","+top/30+"</div>");
	};
}