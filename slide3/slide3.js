function runAnimationWheel() {
window.requestAnimationFrame(function () {

$(document).ready(function () {

var values = [8000, 7000, 6000, 5000, 4000];
var itemHeight = 80;
var visibleItems = 5;
var isSpinning = false;
var isSelected = false;
var lockedValue = null;
var currentTop = 0;
var slowSpeed = 0.7;
var animationId = null;

var spinAudio = document.getElementById("spin");

function playSpinAudioNormal() {
  spinAudio.pause();
  spinAudio.currentTime = 0;
  spinAudio.volume = 0.6;
  spinAudio.playbackRate = 1;
  spinAudio.play();
}

function speedUpSpinAudio() {
  spinAudio.playbackRate = 1.8;
}

function stopSpinAudio() {
  spinAudio.pause();
  spinAudio.currentTime = 0;
  spinAudio.playbackRate = 1;
}

spinAudio.addEventListener("timeupdate", function () {
  if (!spinAudio.duration) return;

  if (spinAudio.currentTime >= spinAudio.duration - 0.15) {
    spinAudio.currentTime = 0.01;
  }
});

function buildWheel() {
  var html = "";

  for (var i = 0; i < 50; i++) {
    for (var j = 0; j < values.length; j++) {
      html += '<div class="prize" data-value="' + values[j] + '">' + values[j] + '</div>';
    }
  }

  $("#wheelStrip").html(html);
  $("#wheelStrip").css("top", "0px");
}

buildWheel();

function startWheel() {

  if (isSpinning) return;

  isSpinning = true;
  isSelected = false;
  lockedValue = null;

  $(".prize").removeClass("selected");

  $("#resultImage").hide();
  $("#brandImage").hide();
  $("#retry").hide();
  $("#lock").hide();
  $("#startBtn").addClass("disabled");

  playSpinAudioNormal();

  moveWheelSlow();
}

function moveWheelSlow() {

  if (!isSpinning || isSelected) return;

  currentTop -= slowSpeed;

  var totalCycleHeight = values.length * itemHeight;

  if (Math.abs(currentTop) >= totalCycleHeight) {
    currentTop = 0;
  }

  $("#wheelStrip").css("top", currentTop + "px");

  updateCenterResult();

  animationId = requestAnimationFrame(moveWheelSlow);
}

function updateCenterResult() {

  var centerOffset = 2;
  var centerIndex = Math.round((Math.abs(currentTop) / itemHeight) + centerOffset);
  var valueIndex = centerIndex % values.length;
  var centerValue = values[valueIndex];

  $("#resultImage")
    .attr("src", "slide3/" + centerValue + ".png")
    .show();
}

function stopAtSelectedValue(selectedValue) {

  if (!isSpinning || isSelected) return;

  isSelected = true;
  isSpinning = false;
  lockedValue = selectedValue;

  cancelAnimationFrame(animationId);

  speedUpSpinAudio();

  $(".prize").removeClass("selected");

  var centerOffset = 2;
  var selectedIndex = values.indexOf(selectedValue);

  var safeCycle = 20;

  var finalIndex = (safeCycle * values.length) + selectedIndex;
  var finalTop = -((finalIndex - centerOffset) * itemHeight);

  $("#wheelStrip").stop(true, true).animate(
    { top: finalTop + "px" },
    {
      duration: 600,
      easing: "swing",
      complete: function () {

        currentTop = finalTop;

        stopSpinAudio();

        $(".prize").eq(finalIndex).addClass("selected");

        $("#resultImage")
          .attr("src", "slide3/" + selectedValue + ".png")
          .show();

        afterValueSelected(selectedValue);

        setTimeout(function () {
          $("#resultImage").hide();

          $("#retry").css("display", "block");
          $("#lock").css("display", "block");

          $("#startBtn").addClass("disabled");
        }, 1000);
      }
    }
  );
}

function afterValueSelected(selectedValue) {
/*if (selectedValue === 4000) {
	  document.getElementById("fanfare").play();
  }

  if (selectedValue === 5000) {
	  document.getElementById("wrong").play();
  }

  if (selectedValue === 6000) {
	  document.getElementById("wrong").play();
  }

  if (selectedValue === 7000) {
	  document.getElementById("wrong").play();
  }

  if (selectedValue === 8000) {
	  document.getElementById("wrong").play();
  }*/
}

$("#startBtn, #retry").on("click touchstart", function (e) {
  e.preventDefault();
  startWheel();
});

$(document).on("click touchstart", ".prize", function (e) {
  e.preventDefault();

  if (!isSpinning || isSelected) return;

  var selectedValue = parseInt($(this).attr("data-value"));
  stopAtSelectedValue(selectedValue);
});

$("#lock").on("click touchstart", function (e) {
  e.preventDefault();
  
  if (lockedValue === 4000) {
	  document.getElementById("fanfare").play();
  }

  if (lockedValue === 5000) {
	  document.getElementById("wrong").play();
  }

  if (lockedValue === 6000) {
	  document.getElementById("wrong").play();
  }

  if (lockedValue === 7000) {
	  document.getElementById("wrong").play();
  }

  if (lockedValue === 8000) {
	  document.getElementById("wrong").play();
  }
  
  if (lockedValue === null) return;

  $("#lock").addClass("disabled");
  $("#retry").addClass("disabled");
  setTimeout(function () {
	 begin();
  }, 1500);
});

});
});
}