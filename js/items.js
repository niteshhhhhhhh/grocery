export function initializeItems() {
  const listContainer = document.getElementById('list-container');
  
  if (!listContainer) return;
  
  
  listContainer.addEventListener('click', function(e) {
    //checkbox
    if(e.target.tagName === 'LI' && !e.target.classList.contains('edit-btn') && !e.target.classList.contains('delete-btn')) {
      import('./app.js').then(module => {
        module.toggleChecked(e.target);
      });
    }
    //delet
    else if(e.target.classList.contains('delete-btn')) {
      import('./app.js').then(module => {
        module.removeItem(e.target);
      });
    }
    //edit
    else if(e.target.classList.contains('edit-btn')) {
      import('./app.js').then(module => {
        module.editItem(e.target);
      });
    }
  }, false);
}