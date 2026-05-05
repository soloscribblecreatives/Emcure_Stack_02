function runAnimationWheel() {
window.requestAnimationFrame(function () {
  
$(document).ready(function () {

var values = [8000, 7000, 6000, 5000, 4000];
var itemHeight = 80;
var visibleItems = 5;
var isSpinning = false;
var lockedValue = null;

function buildWheel() {
var html = "";

for (var i = 0; i < 30; i++) {
  for (var j = 0; j < values.length; j++) {
    html += '<div class="prize" data-value="' + values[j] + '">' + values[j] + '</div>';
  }
}

$("#wheelStrip").html(html);
$("#wheelStrip").css("top", "0px");
}

buildWheel();

$("#startBtn, #retry").on("click touchstart", function (e) {
e.preventDefault();

if (isSpinning) return;
document.getElementById("spin").play();
isSpinning = true;

$("#startBtn").addClass("disabled");
$("#resultImage").hide();
$("#retry").hide();
$("#lock").hide();

var randomIndex = Math.floor(Math.random() * values.length);
var selectedValue = values[randomIndex];

var centerOffset = 2;
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

      lockedValue = selectedValue;

      $('#lock').css("display", "block");
      $('#retry').css("display", "block");

      $("#startBtn").removeClass("disabled");
      isSpinning = false;
    }
  }
);

});

window.lock = function () {

  if (lockedValue === null) return;

  $("#resultImage")
    .attr("src", "slide3/" + lockedValue + ".png")
    .fadeIn(300);

  if (lockedValue === 4000) {
    document.getElementById("fanfare").play();

    setTimeout(function () {
      go_nav('f');
    }, 2000);
  }

  if (lockedValue === 5000 || lockedValue === 6000 || lockedValue === 7000 || lockedValue === 8000) {
    document.getElementById("wrong").play();
  }

  $('#lock').css("display", "none");
  $('#retry').css("display", "none");

  lockedValue = null;
};

});

});
}