let typing = document.querySelector(".about");
const text = "Collect your favourite websites that you regularly visites and access those in minimal time possible. Enjoy the easy access in shortest time.";
function textInAbout(element, text, i = 0){
    element.textContent += text[i];
    if( i === (text.length-1)){
        return;
    }
    setTimeout(()=>{
        textInAbout(element, text, i+1);
    }, 50);
}

textInAbout(typing, text);