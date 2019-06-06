var statistics = {
    democrats: {
        name: "Democrats",
        numberOfMembers: 0,
        averageVotes: 0,
        missedVotes: 0,
    },
    republicans: {
        name: "Republicans",
        numberOfMembers: 0,
        averageVotes: 0,
        missedVotes: 0,
    },
    independents: {
        name: "Independents",
        numberOfMembers: 0,
        averageVotes: 0,
        missedVotes: 0,
    },
    totals: {
        name: "Total",
        numberOfMembers: 0,
        averageVotes: 0,
    }
};
var arrayOfMembers = data.results[0].members;

// Sets total members by party
statistics.democrats.numberOfMembers = numberOfMembers(arrayOfMembers, "D");
statistics.republicans.numberOfMembers = numberOfMembers(arrayOfMembers, "R");
statistics.independents.numberOfMembers = numberOfMembers(arrayOfMembers, "I");
// Sets average votes by party
normalizer(arrayOfMembers);
// Sets totals
statistics.totals.numberOfMembers = arrayOfMembers.length;
var totalVotes = 0;
for (var i = 0; i < arrayOfMembers.length; i++) {
    totalVotes += arrayOfMembers[i].votes_with_party_pct;
}
statistics.totals.averageVotes = (totalVotes / arrayOfMembers.length).toFixed(2);

createTableGlance(statistics);
if (document.URL.includes("attendance")) {
    createTableEngage(leastEngagedMembers(arrayOfMembers, "missed_votes_pct"), "tbody-mostengage");
    createTableEngage(mostEngagedMembers(arrayOfMembers, "missed_votes_pct"), "tbody-engage");
} else {
    createTableLoyal(leastEngagedMembers(arrayOfMembers, "votes_with_party_pct"), "tbody-leastLoyal");
    createTableLoyal(mostEngagedMembers(arrayOfMembers, "votes_with_party_pct"), "tbody-mostLoyal");
};

// Gets the number of members based on each party
function numberOfMembers(members, letter) {
    var numberOfMembersByParty = 0;
    for (var i = 0; i < members.length; i++) {
        var membersParty = members[i].party;
        if (membersParty == letter) {
            numberOfMembersByParty++;
        }
    }
    return numberOfMembersByParty;
}

// Gets the average votes based on each party
function averageVotes(members, letter) {
    var votesByParty = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            votesByParty += (members[i].votes_with_party_pct);
        }
    }
    return votesByParty;
}

// Checks for 0 values to avoid problems when calculating averages
function normalizer(array) {
    if (averageVotes(array, "D") !== 0) {
        statistics.democrats.averageVotes = (averageVotes(array, "D") / statistics.democrats.numberOfMembers).toFixed(2);

    } else {
        statistics.democrats.averageVotes = 0;
    }
    if (averageVotes(array, "R") !== 0) {
        statistics.republicans.averageVotes = (averageVotes(array, "R") / statistics.republicans.numberOfMembers).toFixed(2);

    } else {
        statistics.republicans.averageVotes = 0;
    }
    if (averageVotes(array, "I") !== 0) {
        statistics.independents.averageVotes = (averageVotes(array, "I") / statistics.independents.numberOfMembers).toFixed(2);
    } else {
        statistics.independents.averageVotes = 0;
    }
}

// Created the table "glance" based on the results above
function createTableGlance(object) {
    var tbody = document.getElementById("table-glance");
    for (var keys in object) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        td1.innerHTML = object[keys].name;
        td2.innerHTML = object[keys].numberOfMembers;
        td3.innerHTML = object[keys].averageVotes;

        tr.append(td1, td2, td3);
        tbody.append(tr);
    }
}

// Creates least/most engaged arrays
function leastEngagedMembers(array, criteria) {
    var sortedArray = array.sort(function (a, b) { return a[criteria] - b[criteria] });
    var arraySortedMissedVotes = [];
    for (var i = 0; i < sortedArray.length; i++) {
        if (i <= sortedArray.length / 10) {
            arraySortedMissedVotes.push(sortedArray[i]);
        } else if (sortedArray[i] == sortedArray[i - 1]) {
            arraySortedMissedVotes.push(sortedArray[i]);
        } else {
            break;
        }
    }
    return arraySortedMissedVotes;
}
function mostEngagedMembers(array, criteria) {
    var sortedArray = array.sort(function (a, b) { return a[criteria] - b[criteria] });
    var reversedSortedArray = sortedArray.reverse();
    var arraySortedMissedVotes = [];
    for (var i = 0; i < reversedSortedArray.length; i++) {
        if (i <= reversedSortedArray.length / 10) {
            arraySortedMissedVotes.push(reversedSortedArray[i]);
        } else if (reversedSortedArray[i] == reversedSortedArray[i - 1]) {
            arraySortedMissedVotes.push(reversedSortedArray[i]);
        } else {
            break;
        }
    }
    return arraySortedMissedVotes;
}

function createTableEngage(array, idelement) {
    var tbody = document.getElementById(idelement);
    for (var i = 0; i < array.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        if (array[i].url != "") {
            var membersUrl = document.createElement("a");
            membersUrl.setAttribute("href", array[i].url);

            membersUrl.setAttribute("target", "_blank");
            membersUrl.innerHTML = `${array[i].last_name}, ${array[i].first_name}`;

            td1.append(membersUrl);
        }
        else {
            td1.append(`${array[i].last_name}, ${array[i].first_name}`);
        }
        td2.innerHTML = array[i].missed_votes;
        td3.innerHTML = array[i].missed_votes_pct;

        tr.append(td1, td2, td3);
        tbody.append(tr);
    }
}

function createTableLoyal(array, idelement) {
    var tbody = document.getElementById(idelement);
    for (var i = 0; i < array.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        if (array[i].url != "") {
            var membersUrl = document.createElement("a");
            membersUrl.setAttribute("href", array[i].url);

            membersUrl.setAttribute("target", "_blank");
            membersUrl.innerHTML = `${array[i].last_name}, ${array[i].first_name}`;

            td1.append(membersUrl);
        }
        else {
            td1.append(`${array[i].last_name}, ${array[i].first_name}`);
        }
        td2.innerHTML = array[i].total_votes;
        td3.innerHTML = array[i].votes_with_party_pct;

        tr.append(td1, td2, td3);
        tbody.append(tr);
    }
}
