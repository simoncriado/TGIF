var statistics = {
    democrats: {
        name: "Democrats",
        numberOfMembers: 0,
        averageVotes: 0,
    },
    republicans: {
        name: "Republicans",
        numberOfMembers: 0,
        averageVotes: 0,
    },
    independents: {
        name: "Independents",
        numberOfMembers: 0,
        averageVotes: 0,
    },
    totals: {
        name: "Total",
        numberOfMembers: 0,
        averageVotes: 0,
    }
};
var arrayOfMembers = data.results[0].members;

statistics.democrats.numberOfMembers = numberOfMembers(arrayOfMembers, "D");
statistics.republicans.numberOfMembers = numberOfMembers(arrayOfMembers, "R");
statistics.independents.numberOfMembers = numberOfMembers(arrayOfMembers, "I");
statistics.democrats.averageVotes = (averageVotes(arrayOfMembers, "D") / statistics.democrats.numberOfMembers).toFixed(2);
statistics.republicans.averageVotes = (averageVotes(arrayOfMembers, "R") / statistics.republicans.numberOfMembers).toFixed(2);
statistics.independents.averageVotes = (averageVotes(arrayOfMembers, "I") / statistics.independents.numberOfMembers).toFixed(2);
statistics.totals.numberOfMembers = arrayOfMembers.length;
statistics.totals.averageVotes = ((Number(statistics.democrats.averageVotes) + Number(statistics.republicans.averageVotes) + Number(statistics.independents.averageVotes)) / 3).toFixed(2);
console.log(statistics);

createTableGlance(statistics);

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

function averageVotes(members, letter) {
    var votesByParty = 0;
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == letter) {
            votesByParty += (members[i].votes_with_party_pct);
        }
    }
    return votesByParty;
}

function createTableGlance(object) {
    var tbody = document.getElementById("table-glance");

    for (var keys in statistics) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        td1.innerHTML = statistics[keys].name;
        td2.innerHTML = statistics[keys].numberOfMembers;
        td3.innerHTML = statistics[keys].averageVotes;

        tr.append(td1, td2, td3);

        tbody.append(tr);
    }
}