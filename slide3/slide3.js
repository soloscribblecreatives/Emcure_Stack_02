function runAnimationWheel() {
window.requestAnimationFrame(function () {
  
$(document).ready(function () {

var values = [8000, 7000, 6000, 5000, 4000];
var itemHeight = 80;
var visibleItems = 5;
var isSpinning = false;

function buildWheel() {
var html = "";

// Repeat values many times for smooth scrolling strip
for (var i = 0; i < 30; i++) {
  for (var j = 0; j < values.length; j++) {
	html += '<div class="prize" data-value="' + values[j] + '">' + values[j] + '</div>';
  }
}

$("#wheelStrip").html(html);
$("#wheelStrip").css("top", "0px");
}

buildWheel();

$("#startBtn").on("click touchstart", function (e) {
e.preventDefault();

if (isSpinning) return;
document.getElementById("spin").play();
isSpinning = true;

$("#startBtn").addClass("disabled");
$("#resultImage").hide();
$("#brandImage").hide();

var randomIndex = Math.floor(Math.random() * values.length);
var selectedValue = values[randomIndex];

/*
  Pointer is at center item.
  Visible window has 5 items.
  Center item index offset = 2.
*/
var centerOffset = 2;

// Add extra loops for spinning effect
var loops = 12;
var finalIndex = loops * values.length + randomIndex;
var finalTop = -((finalIndex - centerOffset) * itemHeight);

$("#wheelStrip").stop(true, true).css("top", "0px");

$("#wheelStrip").animate(
  { top: finalTop + "px" },
  {
	duration: 2500,
	easing: "swing",
	complete: function () {

	  //alert(selectedValue);

	  $("#resultImage")
		.attr("src", "slide3/" + selectedValue + ".png")
		.fadeIn(300);
	  
	  if (selectedValue === 4000) {
		document.getElementById("fanfare").play();
		setTimeout(function () {
		  //$("#brandImage").fadeIn(300);
		  go_nav('f');
		}, 2000);
	  }
	  
	  if (selectedValue === 5000 || selectedValue === 6000 || selectedValue === 7000 || selectedValue === 8000) {
		document.getElementById("wrong").play();
	  }

	  $("#startBtn").removeClass("disabled");
	  isSpinning = false;
	}
  }
);
});

});

});
}



