document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    const speed = 0.1;

    const move = () => {
        curX += (tgX - curX) * speed;
        curY += (tgY - curY) * speed;
        interBubble.style.transform = `translate(${Math.round(
            curX
        )}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    };

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});
