const form = document.querySelector('.form');
const buttonAdd = document.querySelector('.add')
const editButton = document.querySelector('.editButton')
const remakeButton = document.querySelector('.remakeButton')
const deleteButton = document.querySelector('.deleteButton')
const tableRow = document.querySelectorAll('tbody tr')

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
        fullAddress+=element.value
    });
    return fullAddress
}

function addRow(){
    console.log('call addrow')
    var tbody = document.getElementById('table').getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR")
    var tdFoto = document.createElement("TD")
    var age = getAge(document.getElementById('date').value)
    var tdAge = document.createElement("TD")
    var tdAddress = document.createElement("TD")

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

function createRow(row, id){
    var current = document.getElementById(id).value
    var tdId = document.createElement("TD")
    var row = row
    tdId.appendChild(document.createTextNode(current))
    row.appendChild(tdId)
}

function deleteRow(){

}