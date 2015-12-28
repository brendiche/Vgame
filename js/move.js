$(document).on("mapCreated",function(event,data){
	var direction = "";
	var keys_down = {};
	var top = 0;
	var left = 0;
	var movingThread =false;
	var movementSpeed = 60;
	var map = data.map;
	
	
	gravity();


	/*Managerment of the keyboard press*/
	$(document).keydown(function (e) {
		if(!(keys_down[e.which] == true)){
	    	keys_down[e.which] = true;
			/* Start movment thread */
			moving(e.which);
		}
		/* JUMP */
		if(e.which == 38){
			jump(direction);
		}
	});

	$(document).keyup(function (e) {
		/* Stop movement thread */
		clearInterval(movingThread);
		movingThread = false;
	    lookPerso(e.which);
	    delete keys_down[e.which];
	});



	/*FUNCTION FOR MOVING*/

	/* Asynchronous moving*/
	function moving(key){
		lookPerso(key);

		if(movingThread){
			clearInterval(movingThread);
			movingThread = false;
		}

		movingThread = setInterval(function(){
			movePerso();
		},movementSpeed)
	}
	/* Looking left and right */
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

	/* Moving the perso */
	function movePerso(){
		for (var i in keys_down) {
	        if (!keys_down.hasOwnProperty(i)) continue;
	        // move right
	        if(i == 39){
	        	left = parseInt($(".perso").css('left').split("p")[0]);
		        left = left + 2;
		        // if the block on the right is air
		        if(map[Math.trunc(left/30)+1][Math.trunc(top/30)+1].type === "BOLCK_AIR"){
			        $(".perso").css('left',left);
			        $(".perso").removeClass("move-left");
			        $(".perso").addClass("move-right");
		        }
		        // if the perso should fall
		        if(map[Math.floor(left/30)][Math.trunc(top/30)+2].type === "BOLCK_AIR"){
		        	gravity()
		        }
	        }
	        //move left
	        if(i == 37){
	        	left = parseInt($(".perso").css('left').split("p")[0]);
		        left = left - 2;
		        // if the block on the left is air
		        if(map[Math.trunc(left/30)][Math.trunc(top/30)+1].type === "BOLCK_AIR"){
			        $(".perso").css('left',left);
			       	$(".perso").removeClass("move-right");
			        $(".perso").addClass("move-left");
			    }
			    // if the perso should fall
		        if(map[Math.floor(left/30)+1][Math.trunc(top/30)+2].type === "BOLCK_AIR"){
		        	gravity()
		        }
	        }

	    }
	}

	/* Jumping */
	function jump(direction){
		top = parseInt($(".perso").css('top').split("p")[0]);
		top = top - 30;
		$(".perso").css('top',top+"px");
		setTimeout(function(){
			if(direction === 'left'){
				if(map[Math.trunc(left/30)][Math.trunc(top/30)+2].type === "BOLCK_AIR"){
					top = parseInt($(".perso").css('top').split("p")[0]);
					top = top + 30;
					$(".perso").css('top',top+"px");
				}
			}else{
				if(map[Math.trunc(left/30)+1][Math.trunc(top/30)+2].type === "BOLCK_AIR"){
					top = parseInt($(".perso").css('top').split("p")[0]);
					top = top + 30;
					$(".perso").css('top',top+"px");
				}
			}
		},150);
	}

	 // Function to put the perso on the dirt 
	function gravity(){
		if(map[Math.trunc(left/30)][Math.trunc(top/30)+2].type === "BOLCK_AIR"){
			top += 30;
			$(".perso").css('top',top);
			gravity()
		}
	}
});