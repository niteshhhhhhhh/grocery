const inputBox = document.getElementById('grocery-input');  
const listContainer = document.getElementById('list-container');

function addItem() {
    if(inputBox.value === '') {
        alert('You must write something!');   
    } else {
        let li = document.createElement('li')
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7'; // unicode for x symbol
        li.appendChild(span); 
    }

    inputBox.value = ''; // empty the input box after adding  
}

listContainer.addEventListener('click', function(e) {
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');

    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
    }
}, false);