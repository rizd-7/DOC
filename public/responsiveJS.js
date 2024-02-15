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


/* footer's responsive  */

const v1 =  getElement(".recapInfo");
const v2 =  getElement(".responsiveFooter");
const mapv1 = getElement(".map");


function changeLayoutVersion(){
  var screenWidth = window.innerWidth;
  if(screenWidth>990){
     
    v2.style.display='none';
    v1.style.display='block';
    mapv1.style.display='block';

  }else{
    v1.style.display='none';
    v2.style.display='block';
    mapv1.style.display='none';
  }
}

window.addEventListener('resize', changeLayoutVersion);
window.addEventListener('load', changeLayoutVersion);

 