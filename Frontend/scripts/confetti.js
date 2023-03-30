let confettiCanvas = document.createElement('canvas');
confettiCanvas.classList.add('.confetti');
confettiCanvas.style.position = 'absolute';
confettiCanvas.style.top = 0;
confettiCanvas.style.left = 0
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
document.body.appendChild(confettiCanvas);

let myConfetti = confetti.create(confettiCanvas, {
resize: true,
useWorker: true
});
// LAUNCH SOME CONFETTI
setTimeout(()=>{
    myConfetti({
        particleCount: 500,
        spread: 360,
        // origin: {
        //     x: Math.random(),
        //     // since they fall down, start a bit higher than random
        //     y: Math.random() - 0.2
        // }
        });
}, 1300);