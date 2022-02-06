function add() {
    let title = document.querySelector("#task").value;
    let desc = document.querySelector("#desc").value;
    if (title != "") {
        if (localStorage.getItem('itemsJson')==null) {
            itemsJsonArray = [];
            itemsJsonArray.push([title, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        } else {
            itemsJsonStr = localStorage.getItem('itemsJson');
            itemsJsonArray = JSON.parse(itemsJsonStr);
            itemsJsonArray.push([title, desc]);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        }
        update()
    } else {
        alert("Title cannot be Empty")
    }

}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        update()
    } else {
        itemsJsonStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonStr);
        let table = document.querySelector(".table");
        table.innerHTML = `
        <tr>
            <th>Sr.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Done</th>
        </tr>`
        itemsJsonArray.forEach(function(task, i) {
            let temp = 
            `
            <tr>
                <td>${i+1}</td>
                <td>${task[0]}</td>
                <td>${task[1]}</td>
                <td><input class="sub" type="button" value="Done" onclick="deleted(${i})"/></td>
            </tr>`
            table.innerHTML += temp
        });
    }
    
}
function deleted(index) {
    itemsJsonStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonStr);
    itemsJsonArray.splice(index, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
    update();
}
function clearStorage() {
    if (confirm("Do you really want to clear?")) {
      localStorage.clear();
      update();
    }
  }