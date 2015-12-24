$(document).ready(function(){
	var top = 0;
	var left = 0;

	$(document).keydown(function(event){
		switch(event.keyCode) {
		    case 40:
		        top = parseInt($(".square").css('top').split("p")[0]);
		        top = top + 2;
		        $(".square").css('top',top+"px");
		        break;
		    case 38:
		        top = parseInt($(".square").css('top').split("p")[0]);
		        top = top - 2;
		        $(".square").css('top',top);
		        break;
		    case 39:
		    	left = parseInt($(".square").css('left').split("p")[0]);
		        left = left + 2;
		        $(".square").css('left',left);
		        break;
		    case 37:
		        left = parseInt($(".square").css('left').split("p")[0]);
		        left = left - 2;
		        $(".square").css('left',left);
		        break;
		        break;
		    default:
		        console.log(event.keyCode);
		}
	})
});