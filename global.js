var arrSurveyQuestions = {
   5: "Do you think this patient is at a risk of thrombosis?",
   6: "How did you assess the thrombosis risk in this patient?",
   7: "Which risk assessment tool do you like to use in this case?",
   8: "Will you prescribe or advise thromboprophylaxis in this patient?",
   10: "What dose of Enoxaparin would you give this patient?",
   11: "What dose of Dalteparin would you give this patient?",
   12: "What dose of UFH would you give this patient?",
   13: "What dose of Fondaparinux would you give this patient?",
   14: "What dose of Rivaroxaban would you give this patient?",
   15: "What dose of Apixaban would you give this patient?",
   16: "What dose of Dabigatran would you give this patient?",
   17: "How long will you continue thromboprophylaxis in this patient?"
};
/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
var currentContentNSlide ='';

//custom slides changes begins here....

//console.log("+++++currentContentId+++++++"+currentContentId+"+++++++contentName+++++++"+contentName);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&  localStorage.getItem("currentcustomslideflag") =='true'){
		var custcomslideid1=parseInt(localStorage.getItem("currentcontentcustomslideId"));
		//step 2:

		currentContentNSlide = currentContentId+"_"+contentName+"_"+custcomslideid1;
		//step 2 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",custcomslideid1);

	}else{
		//step 3 :
		currentContentNSlide = currentContentId+"_"+contentName+"_"+'1';
		//step 3 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",'1');
	}
checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		  //step 4:-
		console.log("swipeleft"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 4 ends here
		
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		//alert("swipeleft"+page_id);
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
		  //step 5:-
		console.log("swiperight"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 5 ends here 
		
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});


});

//step 6:-
function toCaptureTime(page_id){
	var currentSlideNo = page_id;
	var startTime = Date.now();
	
	//alert("===currentSlideNo===="+currentSlideNo);
	//alert("===startTime===="+startTime);
	var temp = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	if(temp == null){
		if (currentSlideNo!=0){
			localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo ,startTime);
			var startTimeInDBFormat = currentTimeInDatabaseFormat();
			localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+currentSlideNo ,startTimeInDBFormat);
		}
}
else{
	var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	var newTime = Date.now();
	var newSlideTime = (newTime - existingTime);
	var endTimeInDBFormat = currentTimeInDatabaseFormat();
    var EndTimeNext = localStorage.getItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
		//alert("===newSlideTime===="+newSlideTime);
	//alert("===EndTimeNext===="+EndTimeNext);
    console.log("++++++++EndTimeNext++++++++"+EndTimeNext+"++++++currentContentId+++"+currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
   
   if(EndTimeNext == null){
	localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
	localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);
	}

    if (typeof(localStorage.getItem('currentslide'))!='undefined' && localStorage.getItem('currentslide')!='' && localStorage.getItem('currentslide')>= currentSlideNo){
	var nextSlideNo = currentSlideNo;

    }else{
	var nextSlideNo = currentSlideNo + 1 ;
	
 } 
 
	if(nextSlideNo <= 22){//number 3 is number of total slides present
	// alert(nextSlideNo);
	var tempNext = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo);

		if(tempNext == null){
			
			if (nextSlideNo!=0)	{
				var nextSlideStartTime =  Date.now();
				localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo ,nextSlideStartTime);
				localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+nextSlideNo ,0);
				var startTimeNextInDBFormat = currentTimeInDatabaseFormat();
				localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+nextSlideNo ,startTimeNextInDBFormat);
			}
		}
	}
}

}
//step ends..

function go_nav(direction) {
var page_id =  parseInt($("#wrapper").attr("rel"));
			
		
var flag=0;
if(direction == 'b') {


	if(page_id >= 0){
		page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
            flag=2;
        }
	}
	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
	
		//window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
	}
	
}else {
	
	if(page_id <= 22){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 23){
            flag=1;
        }
	}
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
		 var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };


	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
		 //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
  
    }


}



$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		/* $(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	}); */
		
	}
	 checkClickThrough(page_id);
}

function set_pg_content(pg_id){
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide1/s1.png" width="1080" height="810" alt=""/></div>';
	break;
	case 2:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide2/s1.png" width="1080" height="810" alt=""/></div>';
	break;
	case 3:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide3/s1.png" width="1080" height="810" alt=""/></div>';
	break;
	case 4:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide4/s1.png" width="1080" height="810" alt=""/></div>';
	break;
	case 5:
	content='<link rel="stylesheet" type="text/css" href="slide5/slide1.css" media="screen"/><div class="s1"><img src="slide5/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide5/s2.png"/></div><div class="s3"><img src="slide5/s3.png"/></div>';
	break;
	case 6:
	content='<link rel="stylesheet" type="text/css" href="slide6/slide1.css" media="screen"/><div class="s1"><img src="slide6/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide6/s2.png"/></div><div class="s3"><img src="slide6/s3.png"/></div>';
	break;
	case 7:
	content='<link rel="stylesheet" type="text/css" href="slide7/slide1.css" media="screen"/><div class="s1"><img src="slide7/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide7/s2.png"/></div><div class="s3"><img src="slide7/s3.png"/></div><div class="s4"><img src="slide7/s4.png"/></div><div class="s5"><img src="slide7/s5.png"/></div><div class="s6"><img src="slide7/s6.png"/></div><div class="s7"><img src="slide7/s7.png"/></div>';
	break;
	case 8:
	content='<link rel="stylesheet" type="text/css" href="slide8/slide1.css" media="screen"/><div class="s1"><img src="slide8/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide8/s2.png"/></div><div class="s3"><img src="slide8/s3.png"/></div>';
	break;
	case 9:
	content='<link rel="stylesheet" type="text/css" href="slide9/slide1.css" media="screen"/><div class="s1"><img src="slide9/s1.png" width="1080" height="810" alt=""/></div><div class="s2" onclick="nav1();"><img src="slide9/s2.png"/></div><div class="s3" onclick="nav2();"><img src="slide9/s3.png"/></div><div class="s4" onclick="nav3();"><img src="slide9/s4.png"/></div><div class="s5" onclick="nav4();"><img src="slide9/s5.png"/></div><div class="s6" onclick="nav5();"><img src="slide9/s6.png"/></div><div class="s7" onclick="nav6();"><img src="slide9/s7.png"/></div><div class="s8" onclick="nav7();"><img src="slide9/s8.png"/></div><div class="s9" onclick="nav8();"><img src="slide9/s9.png"/></div>';
	break;
	case 10:
	content='<link rel="stylesheet" type="text/css" href="slide10/slide1.css" media="screen"/><div class="s1"><img src="slide10/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide10/s2.png"/></div><div class="s3"><img src="slide10/s3.png"/></div>';
	break;
	case 11:
	content='<link rel="stylesheet" type="text/css" href="slide11/slide1.css" media="screen"/><div class="s1"><img src="slide11/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide11/s2.png"/></div><div class="s3"><img src="slide11/s3.png"/></div>';
	break;
	case 12:
	content='<link rel="stylesheet" type="text/css" href="slide12/slide1.css" media="screen"/><div class="s1"><img src="slide12/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide12/s2.png"/></div><div class="s3"><img src="slide12/s3.png"/></div>';
	break;
	case 13:
	content='<link rel="stylesheet" type="text/css" href="slide13/slide1.css" media="screen"/><div class="s1"><img src="slide13/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide13/s2.png"/></div><div class="s3"><img src="slide13/s3.png"/></div>';
	break;
	case 14:
	content='<link rel="stylesheet" type="text/css" href="slide14/slide1.css" media="screen"/><div class="s1"><img src="slide14/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide14/s2.png"/></div><div class="s3"><img src="slide14/s3.png"/></div>';
	break;
	case 15:
	content='<link rel="stylesheet" type="text/css" href="slide15/slide1.css" media="screen"/><div class="s1"><img src="slide15/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide15/s2.png"/></div><div class="s3"><img src="slide15/s3.png"/></div>';
	break;
	case 16:
	content='<link rel="stylesheet" type="text/css" href="slide16/slide1.css" media="screen"/><div class="s1"><img src="slide16/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide16/s2.png"/></div><div class="s3"><img src="slide16/s3.png"/></div>';
	break;
	case 17:
	content='<link rel="stylesheet" type="text/css" href="slide17/slide1.css" media="screen"/><div class="s1"><img src="slide17/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide17/s2.png"/></div><div class="s3"><img src="slide17/s3.png"/></div><div class="s4"><img src="slide17/s4.png"/></div><div class="s5"><img src="slide17/s5.png"/></div><div class="s6"><img src="slide17/s6.png"/></div><div class="s7"><img src="slide17/s7.png"/></div>';
	break;
	case 18:
	content='<link rel="stylesheet" type="text/css" href="slide18/slide1.css" media="screen"/><div class="s1"><img src="slide18/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide18/s2.png"/></div>';
	break;
	case 19:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide19/s1.png" width="1080" height="810" alt=""/></div>';
	break;
	case 20:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide20/s1.png" width="1080" height="810" alt=""/></div>';
	break;
	case 21:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide21/s1.png" width="1080" height="810" alt=""/></div>';
	break;
	case 22:
	content='<link rel="stylesheet" type="text/css" href="slide22/slide1.css" media="screen"/><div class="s1"><img src="slide22/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide22/s2.png"/></div><div class="s3"><img src="slide22/s3.gif"/></div><div class="s4"><img src="slide22/s4.png"/></div><div class="s5"><img src="slide22/s5.png"/></div><div class="s6"><img src="slide22/s6.png"/></div><div class="s7"><img src="slide22/s7.png"/></div><div class="s8"><img src="slide22/s8.png"/></div>';
	break;
}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}

function open_page(url,page_id){
	count3=2;
    count4=0;
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		//to checked previous slide has god end time...
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);	
	}

	// toCaptureTime(page_id);
	 localStorage.setItem("currentslide",page_id);
	 currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	 localStorage.setItem("current",currentContentNSlide);
	//step 10 ends here
	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	/*  if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 } */
	  checkClickThrough();
	}
var count3=2,count4=0;

function open_page2(url,page_id,count){
    count1=0;
    count3=page_id+count-2;
    count4=page_id+1;
	 // alert(page_id);
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);
	}
    count2=page_id;
    count1=page_id+count-1;

	localStorage.setItem("currentslide",page_id);
	currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	localStorage.setItem("current",currentContentNSlide);

	$("#wrapper").attr("rel",page_id);
	var content="";
	var pg_content = set_pg_content(page_id);
	$("#main_content").html(pg_content);
	checkClickThrough();
}

	function checkClickThrough(page_id){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';
	
	if(page_id == 5){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Yes"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="No"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,5,\'' + page_id + '\');endTime1(5);hidesubmitonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}	
	
	if(page_id == 6){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Clinical Judgement"/><div class="control_indicator option1" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="A Validated risk assessment tool"/><div class="control_indicator option2" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,6,\'' + page_id + '\');endTime1(6);skipnextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 7){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Padua Prediction Score"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Khorana Risk Score"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_03" name="checkB01" value="IMPROVE Risk Assessment Model"/><div class="control_indicator" id="radio03" onclick="select3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_04" name="checkB01" value="Caprini Risk Assessment Tool"/><div class="control_indicator" id="radio04" onclick="select4()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_05" name="checkB01" value="Protecht Score"/><div class="control_indicator" id="radio05" onclick="select5()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_06" name="checkB01" value="Own Hospital/Institutional Risk Assessment Tool"/><div class="control_indicator" id="radio06" onclick="select6()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,7,\'' + page_id + '\');endTime1(7);hidesubmitonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	
	if(page_id == 8){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Yes"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="No"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,8,\'' + page_id + '\');endTime1(8);hidesubmitonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 9){
		document.getElementById("click_through").innerHTML='<div class="blocker"></div>';
	}
	
	if(page_id == 10){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Enoxaparin 40 mg SC OD"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Enoxaparin 20 mg SC OD"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,10,\'' + page_id + '\');endTime1(10);gonextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 11){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Dalteparin 5000 IU SC OD"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Dalteparin 2500 IU SC OD"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,11,\'' + page_id + '\');endTime1(11);gonextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 12){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="UFH 5000 IU SC OD"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="UFH 2500 IU SC OD"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,12,\'' + page_id + '\');endTime1(12);gonextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 13){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Fondaparinux 2.5 mg SC OD"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Fondaparinux 1.5 mg SC OD"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,13,\'' + page_id + '\');endTime1(13);gonextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 14){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Rivaroxaban  20 mg OD"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Rivaroxaban 15 mg OD"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,14,\'' + page_id + '\');endTime1(14);gonextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 15){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Apixaban 5 mg OD"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Apixaban 2.5 mg OD"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,15,\'' + page_id + '\');endTime1(15);gonextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 16){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Dabigatran 110 mg OD"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Dabigatran 75 mg OD"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,16,\'' + page_id + '\');endTime1(16);gonextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 17){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="3 to 6 months"/><div class="control_indicator" id="radio01" onclick="select1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="4 weeks"/><div class="control_indicator" id="radio02" onclick="select2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_03" name="checkB01" value="4 weeks"/><div class="control_indicator" id="radio03" onclick="select3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_04" name="checkB01" value="10 days"/><div class="control_indicator" id="radio04" onclick="select4()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_05" name="checkB01" value="1 week"/><div class="control_indicator" id="radio05" onclick="select5()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,17,\'' + page_id + '\');endTime1(17);gonextonclick();"></div>\
			<div class="goRight" onclick="goRight()"></div>\
			<div class="blocker"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 18){
		document.getElementById("click_through").innerHTML='<div class="blocker"></div><div class="goRightQuick" onclick="goRightQuick()"></div>';
	}

}

	function checkBtns(refNum){
		switch(refNum){
		case 1:
		open_page('',1); //NA
		break;
		
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

// new js

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})


/*--------------------- animation javascript -----------------------*/


function closewindowslide(currentslide)
{
	toCaptureTime(currentslide);
}
function endTime1(currentSlideNo){
		var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
		var newTime = Date.now();
		var newSlideTime = (newTime - existingTime);
		localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
		var endTimeInDBFormat = currentTimeInDatabaseFormat();
		localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);

}

function hidesubmitonclick()
{
	$('.submit_button').css("display","none");
	goRight();
}

function goRight() {
	setTimeout(function(){
		go_nav('f');
	}, 500);
}

function goRightQuick() {
	go_nav('f');
}

function gonextonclick()
{
	$('.submit_button').css("display","none");
	goBack();
}

function goBack() {
	setTimeout(function(){
		open_page('',17);
		go_nav('f');
	}, 500);
}

function skipnextonclick()
{
	$('.submit_button').css("display","none");
	skipNext();
}

function skipNext() {
	if ($(".option1").hasClass("selected")) {
		setTimeout(function(){
			open_page('',7);
			go_nav('f');
		}, 500);
	}
	else {
		goRight();
	}
}

function select1() {
	$(".s2").addClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".s9").removeClass("flashIt");
	$(".option1").addClass("selected");
	$(".submit_button").css("display","block");
}

function select2() {
	$(".s2").removeClass("flashIt");
	$(".s3").addClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".s9").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select3() {
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").addClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".s9").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select4() {
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").addClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".s9").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select5() {
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").addClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".s9").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select6() {
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").addClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".s9").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select7() {
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").addClass("flashIt");
	$(".s9").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select8() {
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".s9").addClass("flashIt");
	$(".submit_button").css("display","block");
}

function savedata(answer,type,questionNumber,page_id) {
	$('#radio01').css("display","none");
	$('#radio02').css("display","none");
	$('#radio03').css("display","none");
	$('#radio04').css("display","none");
	$('#radio05').css("display","none");
	$('#radio06').css("display","none");
	$('#radio07').css("display","none");
	$('#radio08').css("display","none");
	$(".submit_button").css("display","none");
	
	
	if(questionNumber == 5){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 6){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 7){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 8){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 10){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 11){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 12){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 13){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 14){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 15){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 16){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 17){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	
	
	var question = arrSurveyQuestions[questionNumber];
	//localStorage.setItem("surveyQuestion_"+currentContentId+"_"+contentName+"_"+questionNumber,question);
	//localStorage.setItem("surveyAnswer_"+currentContentId+"_"+contentName+"_"+questionNumber,varanswer);
	//alert(question+varanswer);
	
	
	var surveydata={
		"question": question,
        "answer": varanswer
    };
	
	var objectData={
		"gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id,
		 "data": `${JSON.stringify(surveydata)}`
         };
	  var params = {
	  "query" : objectData,
	  "type" : "additionalInfo",
	  "callback" : "checkLastPgFn"
	  };

	//window.messageHandler.postMessage(JSON.stringify(params));
}



function playVid1() {
	document.getElementById("startVideo").play();
}

function nav1() {
	open_page('',9);
	go_nav('f');
}

function nav2() {
	open_page('',10);
	go_nav('f');
}

function nav3() {
	open_page('',13);
	go_nav('f');
}

function nav4() {
	open_page('',11);
	go_nav('f');
}

function nav5() {
	open_page('',12);
	go_nav('f');
}

function nav6() {
	open_page('',14);
	go_nav('f');
}

function nav7() {
	open_page('',15);
	go_nav('f');
}

function nav8() {
	open_page('',16);
	go_nav('f');
}