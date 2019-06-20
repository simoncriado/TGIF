var myVue = new Vue({
    el: "#testVue",
    data: {
        url: "https://api.propublica.org/congress/v1/113/senate/members.json",
        members: []
    },
    methods: {
        getPoliticians() {
            fetch(this.url, {
                headers: {
                    "X-API-key": "wD1090Q7KW5NBjJHRE4UNV9PPqUvHGTaN5qnA0xy"
                }
            })
                .then(res => res.json())
                .then(json => this.members = json.results[0].members)
        }
    }
})

myVue.getPoliticians()


// // TESTING VUE
// var data;
// var loader = document.getElementById("loader");
// var containerHidding = document.getElementById("containerHidding");
// containerHidding.style.display = "none";
// var arrayOfMembers;
// var proPublicaLink;
// if (document.URL.includes("senate")) {
//     var proPublicaLink = "https://api.propublica.org/congress/v1/113/senate/members.json";
// } else {
//     var proPublicaLink = "https://api.propublica.org/congress/v1/113/house/members.json";
// }

// fetch(proPublicaLink, {
//     method: "GET",
//     headers: {
//         'X-API-key': 'wD1090Q7KW5NBjJHRE4UNV9PPqUvHGTaN5qnA0xy'
//     }
// }).then(function (response) {
//     if (response.ok) {
//         return response.json();
//     }
//     throw new Error(response.statusText);
// }).then(function (json) {
//     data = json;
//     arrayOfMembers = json.results[0].members;
//     init();
//     createTable(arrayOfMembers);
//     statesMenu(arrayOfMembers);
//     loader.style = "display:none";
//     containerHidding.style.display = "block";
// }).catch(function (error) {
//     console.log("Request failed: " + error.message);
// })

// // Iniciates all the Event Listeners
// function init() {
//     document.getElementById("R").addEventListener("click", function () {
//         filteringMembers(arrayOfMembers);
//     });
//     document.getElementById("D").addEventListener("click", function () {
//         filteringMembers(arrayOfMembers);
//     });
//     document.getElementById("I").addEventListener("click", function () {
//         filteringMembers(arrayOfMembers);
//     });
//     document.getElementById("dropDownMenu").addEventListener("change", function () {
//         // filteringStates(arrayOfMembers);
//         filteringMembers(arrayOfMembers);
//     });
// }
// // Members FILTERED BY PARTY AND IF CHECKBOXES CHECKED!!
// function filteringMembers(members) {
//     var filteredArray = [];
//     var checkedValues = [];
//     var checked = document.querySelectorAll(".filterMembers:checked");
//     for (var i = 0; i < checked.length; i++) {
//         checkedValues.push(checked[i].value);
//     }
//     if (checkedValues.length == 0) {
//         // createTable(members);
//         filteringStates(members);
//     } else {
//         for (var i = 0; i < members.length; i++) {
//             if (checkedValues.includes(members[i].party)) {
//                 filteredArray.push(members[i]);
//             }
//         }
//         // createTable(filteredArray);
//         filteringStates(filteredArray);
//     }
// }
// // Creates the table of members FILTERED BY STATE (going through the filter by party)!
// function filteringStates(members) {
//     var filteredArray = [];
//     var selectedValue = document.getElementById("dropDownMenu").value;

//     if (selectedValue == "ALL") {
//         createTable(members);
//     } else {
//         for (var i = 0; i < members.length; i++) {
//             if (selectedValue.includes(members[i].state)) {
//                 filteredArray.push(members[i]);
//             }
//         }
//         createTable(filteredArray);
//     }
// }
// // Creates dropdown-menu with all States
// function statesMenu(members) {
//     var dropDownMenu = document.getElementById("dropDownMenu");
//     var states = [];
//     for (var i = 0; i < members.length; i++) {
//         if (!states.includes(members[i].state)) {
//             states.push(members[i].state);
//         }
//     }
//     states.sort();
//     for (var j = 0; j < states.length; j++) {
//         var option = document.createElement("option");
//         option.setAttribute("value", states[j]);

//         option.innerHTML = states[j];
//         dropDownMenu.append(option);
//     }
// }
// // Returns members full name
// function getMembersName(member) {
//     var lastName = member.last_name;
//     var firstName = member.first_name;
//     var middleName = member.middle_name;
//     if (middleName == null) {
//         middleName = "";
//     }
//     // console.log(lastName, firstName, middleName);
//     // return lastName + ", " + firstName + " " + middleName;
//     return `${lastName}, ${firstName} ${middleName}`;
// }
// // Creates the table of members
// function createTable(members) {
//     var tbody = document.getElementById("table-body");
//     var error = document.getElementById("error");
//     tbody.innerHTML = "";
//     if (members.length == 0) {
//         error.style = "display:block";
//     } else {
//         error.style = "display:none";
//         for (var i = 0; i < members.length; i++) {
//             var tr = document.createElement("tr");

//             var td1 = document.createElement("td");
//             var td2 = document.createElement("td");
//             var td3 = document.createElement("td");
//             var td4 = document.createElement("td");
//             var td5 = document.createElement("td");
//             if (members[i].url != "") {
//                 var membersUrl = document.createElement("a");
//                 membersUrl.setAttribute("href", members[i].url);

//                 membersUrl.setAttribute("target", "_blank");
//                 membersUrl.innerHTML = getMembersName(members[i]);

//                 td1.append(membersUrl);
//             }
//             else {
//                 td1.append(getMembersName(members[i]));
//             }

//             td2.innerHTML = members[i].party;
//             td3.innerHTML = members[i].state;
//             td4.innerHTML = members[i].seniority;
//             td5.innerHTML = `${members[i].votes_with_party_pct}%`;
//             tr.append(td1, td2, td3, td4, td5);

//             tbody.append(tr);
//         }
//     }
// }
// // Read more and read less button
// function myFunction() {
//     var dots = document.getElementById("dots");
//     var moreText = document.getElementById("more");
//     var btnText = document.getElementById("myBtn");

//     if (dots.style.display === "none") {
//         dots.style.display = "inline";
//         btnText.innerHTML = "Show more";
//         moreText.style.display = "none";
//     } else {
//         dots.style.display = "none";
//         btnText.innerHTML = "Show less";
//         moreText.style.display = "inline";
//     }
// }