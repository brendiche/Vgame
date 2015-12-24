$(document).ready(function(){
	var direction = "";
	var keys_down = {};
	var top = 0;
	var left = 0;
	var interval ={};
	var movementSpeed = 50;

	// Managerment of the keyboard press
	$(document).keydown(function (e) {
		if(!(keys_down[e.which] == true)){
	    	keys_down[e.which] = true;
			/* Start movment thread */
			moving(e.which);
		}
		/* JUMP */
		if(e.which == 38){
			jump();
		}
	});

	$(document).keyup(function (e) {
		/* Stop movement thread */
		clearInterval(interval);

	    lookPerso(e.which);
	    delete keys_down[e.which];
	});

	/*FUNCTION FOR MOVING*/

	/* Asynchronous moving*/
	function moving(key){
		lookPerso(key);
		interval = setInterval(function(){
			movePerso();
		},movementSpeed)
	}

	function lookPerso(key){
		if(key == 39){
			direction = "right"
			$(".perso").removeClass("move-left");
		    $(".perso").removeClass("move-right");
			$(".perso").removeClass("look-left");
		    $(".perso").addClass("look-right");
		}
		if(key == 37){
			direction = "left"
			$(".perso").removeClass("move-left");
		    $(".perso").removeClass("move-right");
		    $(".perso").removeClass("look-right");
		    $(".perso").addClass("look-left");
		}
	}

	function movePerso(){
		for (var i in keys_down) {
	        if (!keys_down.hasOwnProperty(i)) continue;
	        // move right
	        if(i == 39){
	        	left = parseInt($(".perso").css('left').split("p")[0]);
		        left = left + 5;
		        $(".perso").css('left',left);
		        $(".perso").removeClass("move-left");
		        $(".perso").addClass("move-right");
		        
	        }
	        //move left
	        if(i == 37){
	        	left = parseInt($(".perso").css('left').split("p")[0]);
		        left = left - 5;
		        $(".perso").css('left',left);
		       	$(".perso").removeClass("move-right");
		        $(".perso").addClass("move-left");
	        }

	    }
	}


	function jump(){
		top = parseInt($(".perso").css('top').split("p")[0]);
		top = top - 30;
		$(".perso").css('top',top+"px");
		setTimeout(function(){
			top = parseInt($(".perso").css('top').split("p")[0]);
			top = top + 30;
			$(".perso").css('top',top+"px");
		},100);
	}
});