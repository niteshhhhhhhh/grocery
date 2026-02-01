import { handleFormSubmit } from "./app.js";

export function initializeForm() {
  const addBtn = document.getElementById('add-btn');
  const inputBox = document.getElementById('grocery-input');
  
  if (!addBtn || !inputBox) return;
  
  addBtn.addEventListener('click', () => {
    handleFormSubmit(inputBox.value.trim());
    if (!addBtn.textContent.includes('Update')) {
      inputBox.value = ''; 
    }
    inputBox.focus(); //input ma focus
  });

  //Enter key
  inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFormSubmit(inputBox.value.trim());
      if (!addBtn.textContent.includes('Update')) {
        inputBox.value = ''; //edit ma na huda clear
      }
    }
  });
}