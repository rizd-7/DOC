const getElement = (selector) => {
    const element = document.querySelector(selector)
   
    if (element) return element
    throw Error(
      `Please double check your class names, there is no ${selector} class`
    )
  }
 

const MenuHamburger = getElement('.space-y-2');
const navLinks = getElement('.nav_links');

MenuHamburger.addEventListener('click',()=>{
  navLinks.classList.toggle('toogeled');
})
