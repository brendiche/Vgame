$(document).ready(function(){
	var keys = {};
	var top = 0;
	var left = 0;


	$(document).keydown(function (e) {
	    keys[e.which] = true;
	    moveSquare();
	});

	$(document).keyup(function (e) {
	    delete keys[e.which];
	    moveSquare();
	});

	function moveSquare(){
		for (var i in keys) {
	        if (!keys.hasOwnProperty(i)) continue;
	        //move donw
	        if(i == 40){
				top = parseInt($(".perso").css('top').split("p")[0]);
		        top = top + 30;
		        $(".perso").css('top',top+"px");
	        }
	        //move up
	        if(i == 38){
	        	top = parseInt($(".perso").css('top').split("p")[0]);
		        top = top - 30;
		        $(".perso").css('top',top);
	        }
	        //move right
	        if(i == 39){
	        	left = parseInt($(".perso").css('left').split("p")[0]);
		        left = left + 30;
		        $(".perso").css('left',left);
		        $(".perso").removeClass("move-left");
		        $(".perso").addClass("move-right");
		        
	        }
	        //move left
	        if(i == 37){
	        	left = parseInt($(".perso").css('left').split("p")[0]);
		        left = left - 30;
		        $(".perso").css('left',left);
		       	$(".perso").removeClass("move-right");
		        $(".perso").addClass("move-left");
	        }

	    }
	}
});