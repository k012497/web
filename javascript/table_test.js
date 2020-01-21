const students = [
    {name : 'kim', age : 21, position : 'captain'},
    {name : 'lim', age : 31, position : 'captain'},
    {name : 'nam', age : 41, position : 'captain'},
    {name : 'lee', age : 51, position : 'captain'},
    {name : 'lee', age : 61, position : 'captain'},
];
const table = document.createElement('table');
document.body.appendChild(table);

function insertTableRows(){
students.forEach(function(element){
    const personList = Object.entries(element);
    const tr = document.createElement('tr');

    for(let i = 0 ; i < personList.length ; i++){
        const td = document.createElement('td');

        td.innerHTML = personList[i][1]; // i번째 사람의 value
        tr.appendChild(td);
    }
    table.appendChild(tr);
});
}

function insertTableHeader(){
const personList = Object.entries(students),
    tableHeaderArr = Object.keys(personList[0][1]);
const tr = document.createElement('tr');

tableHeaderArr.forEach(function (e){
    const th = document.createElement('th');
    th.innerHTML = e;
    tr.appendChild(th);
});
table.appendChild(tr);
}

insertTableHeader();
insertTableRows();