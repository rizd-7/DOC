const  spanElement = document.querySelectorAll('.spann');
const inputField = document.querySelectorAll('.inputField');

for (let i = 0; i < inputField.length; i++) {

    inputField[i].addEventListener('input', function() {
 
    spanElement[i].style.transform = "translateY(-30px) translateX(-20px)"
    spanElement[i].style.color="black";  
}); 
}
