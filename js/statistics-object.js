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
// Sets average of MISSED votes by party
statistics.democrats.missedVotes = (missedVotes(arrayOfMembers, "D") / statistics.democrats.numberOfMembers).toFixed(2);
statistics.republicans.missedVotes = (missedVotes(arrayOfMembers, "R") / statistics.republicans.numberOfMembers).toFixed(2);
statistics.independents.missedVotes = (missedVotes(arrayOfMembers, "I") / statistics.independents.numberOfMembers).toFixed(2);
// Sets totals
statistics.totals.numberOfMembers = arrayOfMembers.length;
statistics.totals.averageVotes = ((Number(statistics.democrats.averageVotes) + Number(statistics.republicans.averageVotes) + Number(statistics.independents.averageVotes)) / 3).toFixed(2);
// I will need to delete this console.log
console.log(statistics);

createTableGlance(statistics);

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

// Checks for 0 values to avoid problems with averages
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

// Gets the average of the missed votes for each party
function missedVotes(members, letter) {
    var missedVotesByParty = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            missedVotesByParty += (members[i].missed_votes);
        }
    }
    return missedVotesByParty;
}