const form = document.querySelector('.form');
const buttonAdd = document.querySelector('.add')
const editButton = document.querySelector('.editButton')
const remakeButton = document.querySelector('.remakeButton')
const deleteButton = document.querySelector('.deleteButton')
const tableRow = document.querySelectorAll('tbody tr')
const table = document.querySelector('table')

buttonAdd.addEventListener('click', () => {
    form.classList.remove('hidden')
})
editButton.addEventListener('click', () => {
    addRow()
})
editButton.addEventListener('click', () => {
    form.classList.add('hidden')
})
remakeButton.addEventListener('click', () => {
    editHtmlTableSelectedRow()
})
remakeButton.addEventListener('click', () => {
    form.classList.add('hidden')
})
deleteButton.addEventListener('click', () => {
    removeSelectedRow()
})

function selectedRowToInput(){
    for(var i = 1; i < table.rows.length; i++){
        table.rows[i].onclick = function(){
            // get the seected row index
            rIndex = this.rowIndex;
            document.getElementById("name").value = this.cells[1].innerHTML;
            document.getElementById("secondName").value = this.cells[2].innerHTML;
            document.getElementById('date')
            document.getElementById("select").value = this.cells[4].value;
        };
    }
}

function editHtmlTableSelectedRow()
{
    var name = document.getElementById("name").value,
        secondName = document.getElementById("secondName").value
    table.rows[rIndex].cells[1].innerHTML = name;
    table.rows[rIndex].cells[2].innerHTML = secondName;
}

function removeSelectedRow(){
    table.deleteRow(rIndex);
    // clear input text
    document.getElementById("name").value = "";
    document.getElementById("secondName").value = "";
}

function checkEmptyInput(){
    var isEmpty = false,
        name = document.getElementById("name").value,
        secondName = document.getElementById("secondName").value
            
    if(name === ""){
        isEmpty = true;
    }
    else if(secondName === ""){
        isEmpty = true;
    }
    return isEmpty;
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getFullAddress(querySelector){
    var address = document.querySelectorAll(querySelector)
    var fullAddress = ''
    address.forEach(element => {
        fullAddress+=element.value+ ' '
    });
    return fullAddress
}

function addRow(){
    var tbody = document.getElementById('table').getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR")
    var tdFoto = document.createElement("TD")
    var age = getAge(document.getElementById('date').value)
    var tdAge = document.createElement("TD")
    var tdAddress = document.createElement("TD")
    if(!checkEmptyInput()){
        tdFoto.appendChild(document.createTextNode('Foto'))
        tdAge.appendChild(document.createTextNode(age))
        tdAddress.appendChild(document.createTextNode(getFullAddress('.address')))

        row.appendChild(tdFoto);
        createRow(row, 'name')
        createRow(row, 'secondName')
        createRow(row, 'date')
        row.appendChild(tdAge)
        createRow(row, 'select')
        createRow(row, 'distanceWork')
        row.appendChild(tdAddress)
        tbody.appendChild(row);
        selectedRowToInput();
    }
    else alert('заполните все поля');
    
}

function createRow(row, id){
    var current = document.getElementById(id).value
    var tdId = document.createElement("TD")
    var row = row
    tdId.appendChild(document.createTextNode(current))
    row.appendChild(tdId)
}

function sortTable(n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }