function runAnimation() {
  window.requestAnimationFrame(function () {
   /* slide 1 animation script starts here */
   // const restartButton = document.getElementById("sec1");
     var sec1 = document.getElementById("sec1");
    if(sec1){
    const elaxTimeline = gsap.timeline({
      defaults: { duration: 1, ease: "easeInOut" }
    });

    
    
    gsap.set("#sec1 .top-right-logo", { transform: "translateX(40px)", opacity: 0 });
    gsap.set("#sec1 .secLogo", { transform: "translateY(-40px)", opacity: 0 });
    gsap.set("#sec1 .left-top", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec1 .center-top", { transform: "scale(0)", opacity: 0 });
    gsap.set("#sec1 .right-top", { transform: "translateX(40px)", opacity: 0 });
    gsap.set("#sec1 .left-bottom", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec1 .center-bottom", { transform: "scale(0)", opacity: 0 });
    gsap.set("#sec1 .right-bottom", { transform: "translateX(40px)", opacity: 0 });

    elaxTimeline
     
      
      .to("#sec1 .top-right-logo", { transform: "translateX(0)", opacity: 1, duration: 0.4 })
      .to("#sec1 .secLogo", { transform: "translateY(0)", opacity: 1, duration: 0.4 },"-=0.1")
      .to("#sec1 .left-top", { transform: "translateX(0)", opacity: 1, duration: 0.4 },"-=0.1")
      .to("#sec1 .center-top", { transform: "scale(1)", opacity: 1, duration: 0.4 },"-=0.1")
      .to("#sec1 .right-top", { transform: "translateX(0)", opacity: 1, duration: 0.4 },"-=0.1")
      .to("#sec1 .left-bottom", { transform: "translateX(0)", opacity: 1, duration: 0.4 },"-=0.1")
      .to("#sec1 .center-bottom", { transform: "scale(1)", opacity: 1, duration: 0.4 },"-=0.1")
      .to("#sec1 .right-bottom", { transform: "translateX(0)", opacity: 1, duration: 0.4 },"-=0.1")    
      
    }
      
    /* slide 1 animation script ends here */

      
      /* slide 3 animation script starts here */
      var sec3 = document.getElementById("sec3");
    if(sec3){
    const elaxTimelineOne = gsap.timeline({
      defaults: { duration: 1, ease: "easeInOut" }
    });

    gsap.set("#sec3 .top-right-logo", { transform: "translateX(40px)" });
    gsap.set("#sec3 .left-bottle", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec3 .right-bottle", { transform: "translateX(40px)", opacity: 0 });
    gsap.set("#sec3 .left-border", { opacity: 0 });
    gsap.set("#sec3 .right-border", { opacity: 0 });
    gsap.set("#sec3 .left-top", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec3 .right-top", { transform: "translateX(40px)", opacity: 0 });
    gsap.set("#sec3 .left-2", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec3 .right-2", { transform: "translateX(40px)", opacity: 0 });
    gsap.set("#sec3 .left-3", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec3 .right-3", { transform: "translateX(40px)", opacity: 0 });    
    gsap.set("#sec3 .left-bottom", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec3 .right-bottom", { transform: "translateX(40px)", opacity: 0 });     
    gsap.set("#sec3 .bottom-txt", { transform: "translateY(40px)", opacity: 0 });     
        
        
      
    elaxTimelineOne
      .to("#sec3 .top-right-logo", { transform: "translateX(0)", duration: 0.4 })
      .to("#sec3 .left-bottle", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")
      .to("#sec3 .right-bottle", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")
      .to("#sec3 .left-border", { opacity: 1, duration: 0.4 }, "-=0.1")
      .to("#sec3 .right-border", { opacity: 1, duration: 0.4 }, "-=0.4")
      .to("#sec3 .left-top", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")  
      .to("#sec3 .right-top", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.4")  
      .to("#sec3 .left-2", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")  
      .to("#sec3 .right-2", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.4")  
      .to("#sec3 .left-3", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")  
      .to("#sec3 .right-3", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.4")      
      .to("#sec3 .left-bottom", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")  
      .to("#sec3 .right-bottom", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.4")      
      .to("#sec3 .bottom-txt", { transform: "translateY(0)", opacity: 1, duration: 0.4 }, "-=0.1")      
        
    }
      
      
    /* slide 3 animation script ends here */
      
      
      /* slide 4 animation script starts here */
      var sec4 = document.getElementById("sec4");
    if(sec4){
    const elaxTimelineFour = gsap.timeline({
      defaults: { duration: 1, ease: "easeInOut" }
    });

    gsap.set("#sec4 .top-right-logo", { transform: "translateX(40px)" });
    gsap.set("#sec4 .top-txt", { transform: "translateY(40px)", opacity: 0 });
    gsap.set("#sec4 .center-container", { transform: "scale(0)", opacity: 0 });
    gsap.set("#sec4 .left-container", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec4 .right-container", { transform: "translateX(40px)", opacity: 0 });
    gsap.set("#sec4 .center-container", { width: "32%", opacity: 1 });    
    gsap.set("#sec4 .bottom-txt", { transform: "translateY(40px)", opacity: 0 });
      
      
    elaxTimelineFour
      .to("#sec4 .top-right-logo", { transform: "translateX(0)", duration: 0.4 })
      .to("#sec4 .top-txt", { transform: "translateY(0)", opacity: 1, duration: 0.4 })   
      .to("#sec4 .center-container", { transform: "scale(1)", opacity: 1, duration: 0.4 })
      .to("#sec4 .left-container", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")
      .to("#sec4 .right-container", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")
      .to("#sec4 .center-container", { width: "38%", opacity: 1, duration: 0.4 }, "-=0.1")
      .to("#sec4 .bottom-txt", { transform: "translateY(0)", opacity: 1, duration: 0.4 }) 
        
    }
      
      
    /* slide 4 animation script ends here */
        
      /* slide 6 animation script starts here */
      var sec6 = document.getElementById("sec6");
    if(sec6){
    const elaxTimelineSix = gsap.timeline({
      defaults: { duration: 1, ease: "easeInOut" }
    });

    gsap.set("#sec6 .top-right-logo", { transform: "translateX(40px)" });
    gsap.set("#sec6 .top-block img", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec6 .bottom-block img", { transform: "translateX(-40px)", opacity: 0 });
    
      
      
    elaxTimelineSix
      .to("#sec6 .top-right-logo", { transform: "translateX(0)", duration: 0.4 })
      .to("#sec6 .top-block img", { transform: "translateX(0)", stagger: 0.1, opacity: 1, duration: 0.5 }, "-=0.1")   
      .to("#sec6 .bottom-block img", { transform: "translateX(0)", opacity: 1, stagger: 0.1, duration: 0.6 }, "-=0.1")   
      
        
    }
      
      
    /* slide 6 animation script ends here */
      
      
      /* slide 7 animation script starts here */
      var sec7 = document.getElementById("sec7");
    if(sec7){
    const elaxTimelineSeven = gsap.timeline({
      defaults: { duration: 1, ease: "easeInOut" }
    });

    gsap.set("#sec7 .top-right-logo", { transform: "translateX(40px)" });
    gsap.set("#sec7 .left-block", { transform: "translateX(-40px)", opacity: 0 });
    gsap.set("#sec7 .right-block img", { transform: "translateX(40px)", opacity: 0 });
    
      
      
    elaxTimelineSeven
      .to("#sec7 .top-right-logo", { transform: "translateX(0)", duration: 0.4 })
      .to("#sec7 .left-block", { transform: "translateX(0)", opacity: 1, duration: 0.4 }, "-=0.1")   
      .to("#sec7 .right-block img", { transform: "translateX(0)", opacity: 1, stagger: 0.1, duration: 0.5 }, "-=0.1")   
      
        
    }
      
      
    /* slide 7 animation script ends here */
      
   
  });
}



  