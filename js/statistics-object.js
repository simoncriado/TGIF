var statistics = {
    numberOfDemocrats: 0, averageVotesDemocrats: 0,
    numberOfRepublicans: 0, averageVotesRepublicans: 0,
    numberOfIndependents: 0, averageVotesIndependents: 0,
};
var arrayOfMembers = data.results[0].members;

statistics.numberOfDemocrats = numberOfMembers(arrayOfMembers, "D");
statistics.numberOfRepublicans = numberOfMembers(arrayOfMembers, "R");
statistics.numberOfIndependents = numberOfMembers(arrayOfMembers, "I");
statistics.averageVotesDemocrats = (averageVotes(arrayOfMembers, "D") / statistics.numberOfDemocrats).toFixed(2);
statistics.averageVotesRepublicans = (averageVotes(arrayOfMembers, "R") / statistics.numberOfRepublicans).toFixed(2);
statistics.averageVotesIndependents = (averageVotes(arrayOfMembers, "I") / statistics.numberOfIndependents).toFixed(2);
console.log(statistics);

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
