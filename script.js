const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    let timeLine = gsap.timeline();
    timeLine.from("#nav", {
        y : 20,
        opacity : 0,
        duration : 1.5,
        ease: Expo.easeInOut

    })
    timeLine.to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
    })
    timeLine.from("#herofooter", {
        y: -20,
        opacity: 0, 
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
    })
}

function circleMouseFollower(){
    window.addEventListener('mousemove', function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
    })
}
circleMouseFollower();
firstPageAnim();