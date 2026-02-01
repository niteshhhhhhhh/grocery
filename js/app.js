import { initializeForm } from "./form.js";
import { initializeItems } from "./items.js";

function getLocalStorage() {
  const list = localStorage.getItem("groceryList");
  return list ? list : '';
}

function setLocalStorage(htmlContent) {
  localStorage.setItem("groceryList", htmlContent);
}

let listContainerHtml = getLocalStorage();
let editMode = false;
let itemToEdit = null;

function saveList() {
  const listContainer = document.getElementById('list-container');
  if (listContainer) {
    setLocalStorage(listContainer.innerHTML);
    listContainerHtml = listContainer.innerHTML;
  }
}

function loadList() {
  const listContainer = document.getElementById('list-container');
  if (listContainer) {
    listContainer.innerHTML = listContainerHtml;
  }
}

export function addItem(itemName) {
  const listContainer = document.getElementById('list-container');
  if(itemName === '') {
    alert('You must write something!');
    return;
  }
  
  let li = document.createElement('li');
  li.innerHTML = itemName;
  listContainer.appendChild(li);
  
  //Button
  let buttonsSpan = document.createElement('span');
  buttonsSpan.className = 'item-buttons';
  
  //Edit garne button
  let editBtn = document.createElement('span');
  editBtn.className = 'edit-btn';
  editBtn.innerHTML = '✎';
  editBtn.title = 'Edit item';
  
  //Delete button
  let deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '×';
  deleteBtn.title = 'Delete item';
  
  buttonsSpan.appendChild(editBtn);
  buttonsSpan.appendChild(deleteBtn);
  li.appendChild(buttonsSpan);
  
  saveList();
  
  setTimeout(() => alert("Item Added Successfully!"), 0);
}

export function toggleChecked(liElement) {
  liElement.classList.toggle('checked');
  saveList();
}

export function removeItem(deleteBtn) {
  deleteBtn.parentElement.parentElement.remove();
  saveList();
  
  setTimeout(() => alert("Item Deleted Successfully!"), 0);
}

export function editItem(editBtn) {
  const li = editBtn.parentElement.parentElement;
  const itemText = li.firstChild.textContent;
  
  //edit
  editMode = true;
  itemToEdit = li;
  
  const inputBox = document.getElementById('grocery-input');
  const addBtn = document.getElementById('add-btn');
  
  if (inputBox && addBtn) {
    inputBox.value = itemText;
    inputBox.focus();
    addBtn.textContent = 'Update Item';
    addBtn.style.background = '#f39c12'; // Orange color for update
  }
}

export function updateItem(newText) {
  if (!itemToEdit || !editMode) return;
  
  if(newText === '') {
    alert('Item cannot be empty!');
    return;
  }
  
  itemToEdit.firstChild.textContent = newText;
  
  //edit exit
  editMode = false;
  itemToEdit = null;
  
  const inputBox = document.getElementById('grocery-input');
  const addBtn = document.getElementById('add-btn');
  
  if (inputBox && addBtn) {
    inputBox.value = '';
    addBtn.textContent = 'Add Item';
    addBtn.style.background = '#27ae60'; // Reset to green
  }
  
  saveList();
  
  setTimeout(() => alert("Item Updated Successfully!"), 0);
}

//checking edit
export function handleFormSubmit(itemText) {
  if (editMode) {
    updateItem(itemText);
  } else {
    addItem(itemText);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeForm();
  initializeItems();
  loadList();
});