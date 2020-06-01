const form = document.querySelector('.form');
const buttonAdd = document.querySelector('.add')
const editButton = document.querySelector('.editButton')
const tableRow = document.querySelectorAll('tbody tr')
const table = document.querySelector('table')


var selectedRow = null


buttonAdd.addEventListener('click', () => {
    form.classList.remove('hidden')
})
editButton.addEventListener('click', () => {
  onFormSubmit()
})
editButton.addEventListener('click', () => {
    form.classList.add('hidden')
})


const min = 150;
// The max (fr) values for grid-template-columns
const columnTypeToRatioMap = {
  numeric: 1,
  'text-short': 1.67,
  'text-long': 3.33 };

                                          
const columns = [];
let headerBeingResized;
 
// The next three functions are mouse event callbacks
 
// Where the magic happens. I.e. when they're actually resizing
const onMouseMove = e => requestAnimationFrame(() => {
  console.log('onMouseMove');
 
  // Calculate the desired width
  horizontalScrollOffset = document.documentElement.scrollLeft;
  const width = horizontalScrollOffset + e.clientX - headerBeingResized.offsetLeft;
 
  // Update the column object with the new size value
  const column = columns.find(({ header }) => header === headerBeingResized);
  column.size = Math.max(min, width) + 'px'; // Enforce our minimum
 
  // For the other headers which don't have a set width, fix it to their computed width
  columns.forEach(column => {
    if (column.size.startsWith('minmax')) {// isn't fixed yet (it would be a pixel value otherwise)
      column.size = parseInt(column.header.clientWidth, 10) + 'px';
    }
  });
 
  /* 
        Update the column sizes
        Reminder: grid-template-columns sets the width for all columns in one value
      */
  table.style.gridTemplateColumns = columns.
  map(({ header, size }) => size).
  join(' ');
});
 
// Clean up event listeners, classes, etc.
const onMouseUp = () => {
  console.log('onMouseUp');
 
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  headerBeingResized.classList.remove('header--being-resized');
  headerBeingResized = null;
};
 
// Get ready, they're about to resize
const initResize = ({ target }) => {
  console.log('initResize');
 
  headerBeingResized = target.parentNode;
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  headerBeingResized.classList.add('header--being-resized');
};
 
// Let's populate that columns array and add listeners to the resize handles
document.querySelectorAll('th').forEach(header => {
  const max = columnTypeToRatioMap[header.dataset.type] + 'fr';
  columns.push({
    header,
    // The initial size value for grid-template-columns:
    size: `minmax(${min}px, ${max})` });
 
  header.querySelector('.resize-handle').addEventListener('mousedown', initResize);
});

// doesn't edit fully
// only name and second name

// still in progress

function onDelete(td) {
  if (confirm('Are you sure to delete this record ?')) {
      row = td.parentElement.parentElement;
      document.querySelector("table").deleteRow(row.rowIndex);
      //resetForm();
  }
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("secondName").value = selectedRow.cells[2].innerHTML;
  document.getElementById("date").value = selectedRow.cells[3].innerHTML;
  document.getElementById("select").value = selectedRow.cells[4].innerHTML;
  document.getElementById("distanceWork").value = selectedRow.cells[5].innerHTML;
  
}

// add check for another cells
// totally working
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

// totally working
function getFullAddress(city, street, house, apartament){
    return fullAddress = `${city} ${street} ${house} ${apartament}`
}

function onFormSubmit() {
  if (validate()) {
      var data = readFormData();
      if (selectedRow == null)
          dataToRow(data);
      else
          updateRecord(data);
      resetForm();
  }
  
}

function updateRecord(data) {
  selectedRow.cells[1].innerHTML = data.name;
  selectedRow.cells[2].innerHTML = data.secondName;
  selectedRow.cells[3].innerHTML = data.date;
  selectedRow.cells[4].innerHTML = getAge(data.date);
  selectedRow.cells[5].innerHTML = data.select;
  selectedRow.cells[6].innerHTML = data.distance;
  selectedRow.cells[7].innerHTML = getFullAddress(data.city, data.street, data.house, data.apartament);
}

function readFormData() {
  var data = {};
  data["name"] = document.getElementById("name").value;
  data["secondName"] = document.getElementById("secondName").value;
  data["date"] = document.getElementById("date").value;
  data["select"] = document.getElementById("select").value;
  data["distance"] = document.getElementById("distanceWork").checked;
  data["city"] = document.getElementById("city").value;
  data["street"] = document.getElementById("street").value;
  data["house"] = document.getElementById("house").value;
  data["apartament"] = document.getElementById("apartament").value;
  
  console.log(data);

  return data;
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("secondName").value = "";
  document.getElementById("city").value = "";
  document.getElementById("street").value = "";
  document.getElementById('house').value = '';
  document.getElementById("apartament").value = "";
  selectedRow = null;
}

function dataToRow(data){
  var tbody = document.getElementById('table').getElementsByTagName("TBODY")[0];
  var row = document.createElement("TR");
  var tdFoto = document.createElement("TD");
  var age = getAge(data.date);
  var tdAge = document.createElement("TD");
  var tdAddress = document.createElement("TD");
  var distance = data.distance;
  var tdDistance = document.createElement("TD");

  tdFoto.appendChild(document.createTextNode('Foto'))
  tdAge.appendChild(document.createTextNode(age))
  tdDistance.appendChild(document.createTextNode(distance))
  tdAddress.appendChild(document.createTextNode(getFullAddress(data.city, data.street, data.house, data.apartament)))
  

  row.appendChild(tdFoto);
  createRow(row, data.name)
  createRow(row, data.secondName)
  createRow(row, data.date)
  row.appendChild(tdAge)
  createRow(row, data.select)
  row.appendChild(tdDistance)
  row.appendChild(tdAddress)
  cell8 = row.insertCell(8);
  cell8.innerHTML = `<a class = "editRowButton" onClick="onEdit(this)">Edit</a>
  <a onClick="onDelete(this)">Delete</a>`;
  tbody.appendChild(row);

  var editRowButton = document.querySelectorAll(".editRowButton")

  editRowButton.forEach(element => {
    element.addEventListener("click", () => {
      form.classList.remove('hidden')
    })
  });
}

// totally working
function createRow(row, data){
    var current = data
    var tdId = document.createElement("TD")
    var row = row
    tdId.appendChild(document.createTextNode(current))
    row.appendChild(tdId)
}

function validate() {
  isValid = true;
  if (document.getElementById("name").value == "" || 
      document.getElementById("secondName").value == "") {
      isValid = false;
      alert("заполните все поля!")
  } else {
      isValid = true;
      
  }
  return isValid;
}
// totally working
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