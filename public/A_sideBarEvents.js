const sideNavOpen = getElement(".A_sideNavOpen");
const sideNavBar =getElement(".stickyNav");
const RAsvg= getElement(".RAsvg");
const ShiftedBody = getElement(".shiftedBody");
var openState;

// NEED A FIX

// initialising 
if(window.innerWidth<747){
    openState=false;
}else{
    openState=true;
}
 

sideNavOpen.addEventListener("click",()=>{
    
    if(!openState){
       sideNavBar.style.transform="translateX(0px)"
       RAsvg.style.transform="rotate(180deg)"
       ShiftedBody.style.width="1100px"
       openState=true
       
    }else{
       sideNavBar.style.transform="translateX(-70px)"
       RAsvg.style.transform="rotate(0deg)"
       openState=false
       
    }

})  


if(!openState && window.innerWidth > 747 ){
    sideNavBar.style.transform="translateX(70px)"
}
 

 