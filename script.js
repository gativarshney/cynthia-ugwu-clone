const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

let timeout;
function circleSquash(){
    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;
    window.addEventListener('mousemove', function(dets){
        clearTimeout(timeout);

        let xdiff = dets.clientX - xprev;
        let ydiff = dets.clientY - yprev;
        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.7, 1.3, xdiff);
        yscale = gsap.utils.clamp(0.7, 1.3, ydiff);

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(() => {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

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

function circleMouseFollower(xscale, yscale){
    window.addEventListener('mousemove', function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

document.querySelectorAll(".elem").forEach((elem) =>{
    let rotate = 0;
    let diffrot = 0;
    const img = elem.querySelector("img");
    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        });
    });
    elem.addEventListener("mousemove", function(details){
        let diffY = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;
        
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        gsap.set(img,{
            opacity : 1,
        })
        gsap.to(img, {
            ease: Power3,
            duration: 0.5,
            top: diffY - imgHeight / 2,
            left: details.clientX - imgWidth / 2,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

circleSquash();
circleMouseFollower();
firstPageAnim();