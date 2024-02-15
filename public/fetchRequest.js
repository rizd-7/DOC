const form = getElement(".frm") 
form.addEventListener("submit",(e)=>{
  e.preventDefault();
}) 

const form2 = getElement(".frm2") 
form2.addEventListener("submit",(e)=>{
  e.preventDefault();
})

const progFormSubmit = getElement(".a_mainSubmit");
progFormSubmit.addEventListener('click', async ()=>{
 
  const formData = new FormData(form);
  const data = Object.fromEntries(formData)

  const response = fetch("/adminPanelMain/SetProgram", {
      method:"PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data),
      })
      .then((res)=>{
        if (res.ok) {
          return res.json();  //Will return the data
        } else {
          throw new Error('User update failed');
        }
      })
      .then((data)=>{
        console.log(data);
        alert("success")
      })
      .catch((err)=>{
        console.error(err);
      })
    })

const noteSubmit = getElement(".a_noteSubmit");
noteSubmit.addEventListener("click",()=>{
  
  const NoteDuDocText = getElement(".NoteTextInput"); 
  const data = {
    text: NoteDuDocText.value,
  }

  fetch("/adminPanelMain/setNote",{
    method:"PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(data),
  })
 

})
 