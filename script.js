//Created these variables inorder to pull any contents I need from the html. 
const buttons = Array.from(document.getElementsByClassName('button'));
const display = document.getElementById('display');


//used an arrow function that uses "switch" and "case'
buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'AC':
                display.innerText = '';
                break;
            case '=':
                try{
                    display.innerText = eval(display.innerText);
                } catch {
                  //If user types an invalid expression, Display the word "Error"
                    display.innerText = "Error"
                }
                break;
            case 'Del':
                if (display.innerText){
                   display.innerText = display.innerText.slice(0, -1);
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});