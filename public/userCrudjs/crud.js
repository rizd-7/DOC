const xButton = document.querySelectorAll(".delUser")

xButton.forEach(element => {
        element.addEventListener("click",()=>{
            const parentElement = element.parentElement;
             
            const DelConfirmation  = parentElement.querySelector('.DelConfirme');
            DelConfirmation.style.display="flex";
        })
});  

const plusButton = document.querySelectorAll(".upGradeUser")

plusButton.forEach(element => {
    element.addEventListener("click",()=>{
        const parentElement = element.parentElement ;
        const userId = parentElement.querySelector(".pureUid").textContent


        fetch(`/adminPanelMain/update/${userId}?op=upg `,{
            method:"PATCH",
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then((resolve)=>{
            console.log("success");
            location.reload();
        })
        .catch((reject)=>{
            
            console.log("fail");
        })
       


    })
});  

const minusButton = document.querySelectorAll(".downGradeUser")

minusButton.forEach(element => {
    element.addEventListener("click",()=>{
        const parentElement = element.parentElement ;
        const userId = parentElement.querySelector(".pureUid").textContent


        fetch(`/adminPanelMain/update/${userId}?op=downg`,{
            method:"PATCH",
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then((resolve)=>{ 
            console.log("success");
            location.reload();
        })
        .catch((reject)=>{
            console.log("fail");
        })
       


    })
});  
 

const delConfirmation = document.querySelectorAll(".DelConfirme")

delConfirmation.forEach(element =>{
    const cancelButton = element.querySelector(".delCancelButton")
    const confirmToDelButton = element.querySelector(".delConfirmeButton")

    const confiramationToDel_container = cancelButton.parentElement.parentElement;
    
    cancelButton.addEventListener("click",()=>{
        confiramationToDel_container.style.display="none";
    })

    confirmToDelButton.addEventListener("click",()=>{
        //Getting the user ID to delete it
        const userHeading =  confirmToDelButton.parentElement.parentElement.parentElement;
        var userId = userHeading.querySelector(".pureUid")
        userId = userId.textContent;
        console.log(userId);
            
        
        fetch(`/adminPanelMain/del/${userId}`,{
            method:"DELETE",
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then((resolve)=>{
            console.log("success");
            location.reload();

        })
        .catch((reject)=>{
            console.log("fail");
        })
         
    })




})


 