const clk1 = getElement(".Add")
const clk2 = getElement('.windowPop');
const clk3 = getElement('.blr');
const clk4 = getElement('.close');

var ope = function() {
    clk2.classList.remove('hidden');
    clk3.classList.remove('hidden');
}

var clos = function() {
    clk2.classList.add('hidden');
    clk3.classList.add('hidden');
}

clk1.addEventListener('click', ope)
clk4.addEventListener('click', clos)
clk3.addEventListener('click', clos)  