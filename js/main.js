var arrayOfMembers = data.results[0].members;

createTable(arrayOfMembers)

// getMembersName(members);
function getMembersName(member) {
    var lastName = member.last_name;
    var firstName = member.first_name;
    var middleName = member.middle_name;
    if (middleName == null) {
        middleName = "";
    }
    console.log(lastName, firstName, middleName);
    // return lastName + ", " + firstName + " " + middleName;
    return `${lastName}, ${firstName} ${middleName}`;
}

// Creates the table of senators
function createTable(members) {
    var tbody = document.getElementById("table-body");

    for (var i = 0; i < members.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");

        td1.innerHTML = getMembersName(members[i]);
        td2.innerHTML = members[i].party;
        td3.innerHTML = members[i].state;
        td4.innerHTML = members[i].seniority;
        td5.innerHTML = `${members[i].votes_with_party_pct}%`;
        tr.append(td1, td2, td3, td4, td5);

        tbody.append(tr);
    }
}