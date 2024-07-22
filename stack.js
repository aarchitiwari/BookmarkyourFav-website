let stackCard = document.querySelectorAll('.stack-card');
let stackArea = document.querySelector('.stacked-left');
function rotate() {
    let angle = 0;
    stackCard.forEach((card) => {
        if (card.classList.contains('active')) {
            card.style.transform = `translate(-100%, 120vh) rotate(-48deg)`;
        }
        else {
            card.style.transform = `rotate(${angle}deg)`;
            angle = angle - 5;
        }
    });
}
rotate();
window.addEventListener("scroll", () => {
    let proportion = stackArea.getBoundingClientRect().top/40;
    // console.log(proportion)
    if (proportion <= 0) {
        let n = stackCard.length;
        let index = Math.ceil((proportion * n) / 2);
        // console.log(proportion)
        index = Math.abs(index) - 1;
        console.log(index);
        for (let i = 0; i < n; i++) {
            if (i <= index) {
                stackCard[i].classList.add("active");
            } else {
                stackCard[i].classList.remove("active");
            }
        }
        rotate();
    }
}) 