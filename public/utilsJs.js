 
const deleteButNote = getElement(".a_mainDelete")
deleteButNote.addEventListener("click",()=>{
    event.preventDefault();
    const NoteDuDocText = getElement(".NoteTextInput"); 
    NoteDuDocText.value=" ";  
})