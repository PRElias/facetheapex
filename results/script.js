$(document).ready( function () {
    // fetch('./data.json')
    fetch('https://raw.githubusercontent.com/PRElias/facetheapex/main/results/data.json')
        .then((response) => response.json())
        .then((dados) => fillTable(dados));

} );

function fillTable(dados) {
    var sessionsTable = document.getElementById("sessionsTable");
    var driversTable = document.getElementById("driversTable");

    debugger;

    var sessions = dados.stats.history;
    var drivers = dados.stats.players;
    drivers = Object.values(drivers);

    console.log(dados);
    
    sessions.forEach(element => {
        var row = sessionsTable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = element.index;
        cell2.innerHTML = formatDate(element.start_time);
        cell3.innerHTML = formatDate(element.end_time);
        cell4.innerHTML = element.finished;
    });

    drivers.forEach(element => {
        var row = driversTable.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = element.name;
        cell2.innerHTML = formatDate(element.last_joined);
    });

    $('#sessionsTable').DataTable({ paging: false, searching: false });
    $('#driversTable').DataTable({ paging: false, searching: false });
    $(".dataTables_empty").remove();
    $(".dataTables_info").remove();
};

function formatDate(date) {
    var a = new Date(date * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
};
