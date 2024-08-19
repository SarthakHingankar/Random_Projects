function add() {
    let spend = document.querySelector("#spend").value;
    let dateTime = document.querySelector("#date").value;
    let date = dateTime.replace("T", " ")
    let amount = document.querySelector("#amt").value;

    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        itemsJsonArray.push([spend, date, amount]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    } else {
        itemsJsonStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonStr);
        itemsJsonArray.push([spend, date, amount]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    }
    update()

    spend.value = "";
    dateTime.value = "";
    amount.value = "";
}

function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        update();
    } else {
        itemsJsonStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonStr);
        let table = document.querySelector('.table');
        table.innerHTML = `
                <tr>
                    <th>Sr.No</th>
                    <th>Spend On</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Delete</th>
                    </th>
                </tr>`
        itemsJsonArray.forEach(function(exp, index) {
            let temp =`
                <tr>
                    <td>${index+1}</td>
                    <td>${exp[0]}</td>
                    <td>${exp[1]}</td>
                    <td>${exp[2]}</td>
                    <td><input class="sub" type="button" value="Delete" onclick="deleted(${index})" /></td>
                </tr>`;
            table.innerHTML += temp
        });
    }
}

function deleted(index) {
    itemsJsonStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonStr);
    itemsJsonArray.splice(index, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    update();
}

function clearit() {
    if ( confirm("Do you want to clear your expenses?") ) {
        localStorage.clear();
        update();
    }
}