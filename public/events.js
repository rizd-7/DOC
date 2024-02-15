const blog_btn = getElement(".btn_blog");
const post_btn = getElement(".btn_qst");
const qst_btn2 = getElement(".btn_qst2");

blog_btn.addEventListener('click',()=>{
    blog_btn.classList.add("active");
    post_btn.classList.remove("active")
    qst_btn2.classList.remove("active")
})      

post_btn.addEventListener('click',()=>{
    post_btn.classList.add("active");
    blog_btn.classList.remove("active")
})   

qst_btn2.addEventListener('click',()=>{
    qst_btn2.classList.add("active");
    blog_btn.classList.remove("active")
})  

const sideNavOpen = getElement(".sideNavOpen");
const sideNavBar =getElement(".sideNavBar");
const RAsvg= getElement(".RAsvg")
var openState=false;

sideNavOpen.addEventListener("click",()=>{

    if(!openState){
       sideNavBar.style.transform="translateX(60px)"
       RAsvg.style.transform="rotate(180deg)"
       openState=true
    }else{
       sideNavBar.style.transform="translateX(0px)"
       RAsvg.style.transform="rotate(0deg)"
       openState=false
    }
    
})


const profil = getElement(".profil");
const AboutUser = getElement(".AboutUser");
profil.addEventListener("click",()=>{
    AboutUser.style.display="block";
})

AboutUser.addEventListener("mouseleave",()=>{
    AboutUser.style.display="none";
})

