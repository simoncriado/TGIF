var members = data.results[0].members;
getMembersName(members);
function getMembersName(arrayOfMembers) {
    for (var i = 0; i < arrayOfMembers.length; i++) {
        var lastName = arrayOfMembers[i].last_name;
        var firstName = arrayOfMembers[i].first_name;
        var middleName = arrayOfMembers[i].middle_name;
        console.log(lastName, firstName, middleName);
    }
}

// getMembersParty(members);
// function getMembersParty(arrayOfMembers) {
//     for (var i = 0; i < arrayOfMembers.length; i++) {
//         var party = arrayOfMembers[i].party;
//         console.log(party);
//     }
// }