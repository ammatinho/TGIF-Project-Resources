//************************************1st table - ATTENDANCE/PARTY LOYALTY at glance
//get members of senate

let membersSenate = data.results[0].members.filter(member => member.votes_with_party_pct != null);
console.log(membersSenate);

// get the number of members in each party
// 1st way

getPartyMembers();
function getPartyMembers() {
    let democrats = [];
    let republicans = [];
    let independents = [];
    let total = [];

    let democratsVotes = [];
    let republicansVotes = [];
    let independentsVotes = [];
    let totalVotes = [];

    for (var i = 0; i < membersSenate.length; i++) {
        if (membersSenate[i].votes_with_party_pct != null) {
            if (membersSenate[i].party.includes("D")) {
                democrats.push(membersSenate[i].party) //***Number of Resp - 1st table - PARTY LOYALTY
                democratsVotes.push(membersSenate[i].votes_with_party_pct) //***% Voted w/ Party - 1st table - PARTY LOYALTY

            } else if (membersSenate[i].party.includes("R")) {
                republicans.push(membersSenate[i].party) //***Number of Resp - 1st table - PARTY LOYALTY
                republicansVotes.push(membersSenate[i].votes_with_party_pct) //***% Voted w/ Party - 1st table - PARTY LOYALTY

            } else if (membersSenate[i].party.includes("I")) {
                independents.push(membersSenate[i].party) //***Number of Resp - 1st table - PARTY LOYALTY
                independentsVotes.push(membersSenate[i].votes_with_party_pct) //***% Voted w/ Party - 1st table - PARTY LOYALTY
            }
            total.push(membersSenate[i].party) //***Number of Resp - 1st table - PARTY LOYALTY
            totalVotes.push(membersSenate[i].votes_with_party_pct) //***% Voted w/ Party - 1st table - PARTY LOYALTY
        }
    }
    // console.log(democrats,republicans,independents)
    document.getElementById("democrats").innerHTML = democrats.length;
    document.getElementById("republicans").innerHTML = republicans.length;
    document.getElementById("independents").innerHTML = independents.length;
    document.getElementById("total").innerHTML = democrats.length + republicans.length + independents.length;


    // console.log(democratsVotes,republicansVotes,independentsVotes)

    let democratsVotesPct = (democratsVotes.reduce((a, b) => a + b) / democrats.length);
    let republicansVotesPct = (republicansVotes.reduce((a, b) => a + b) / republicans.length);
    if (independentsVotes.length != 0) {
        independentsVotesPct = (independentsVotes.reduce((a, b) => a + b) / independents.length);
    } else {
        independentsVotesPct = 0;
    }
    let totalVotesPct = (totalVotes.reduce((a, b) => a + b) / total.length);

    document.getElementById("democratsVotes").innerHTML = democratsVotesPct.toFixed(2) + "%";

    document.getElementById("republicansVotes").innerHTML = republicansVotesPct.toFixed(2) + "%";

    document.getElementById("independentsVotes").innerHTML = independentsVotesPct.toFixed(2) + "%"

    document.getElementById("totalVotes").innerHTML = totalVotesPct.toFixed(2) + "%";
}


// 2nd way

// function getPartyMembers() {
//     let democrats = 0;
//     let republicans = 0;
//     let independents = 0;

//     for (var i = 0; i < membersSenate.length; i++) {
//         if (membersSenate[i].party.includes("D")){
//             democrats++

//         } else if (membersSenate[i].party.includes("R")){
//             republicans++

//         } else if (membersSenate[i].party.includes("I")){
//             independents++
//         }
//     }

//     console.log(democrats,republicans,independents)

// }


//************************************2st and 3rd table - ATTENDANCE most/least engaged // SENATE

//NOTE:::
////// criar function outside === array. then inside the function faço o sort. then dentro da function createtable fazer for lop to display rows.
///create a function that receives the data; that function should loop through the data and create an array that it will return, sorted

const members = data.results[0].members;
// console.log(members);

function leastMost(myArrAtt, myArrLoyalty) {
    let attendanceArray = [];
    let loyaltyArray = [];

    for (let i = 0; i < myArrAtt.length; i++) {
        if (i < (myArrAtt.length * 0.1)) {
            attendanceArray.push(myArrAtt[i])
            loyaltyArray.push(myArrLoyalty[i])

        } else if (attendanceArray[attendanceArray.length - 1].missed_votes == myArrAtt[i].missed_votes || loyaltyArray[loyaltyArray.length - 1].partyVotes == myArrLoyalty[i].partyVotes) {
            attendanceArray.push(myArrAtt[i])
            loyaltyArray.push(myArrLoyalty[i])
        } else {
            break;
        }
    }

        if (location.pathname == "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/senate-attendance-starter-page.html" || "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/house-attendance-starter-page.html") {
            return attendanceArray;
        } else if (location.pathname == "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/senate-party-loyalty-starter-page.html" || "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/house-party-loyalty-starter-page.html"){
            return loyaltyArray;
        }

}


function getArray(members) {
    let arrAtt = [];
    let arrLoyalty = [];

    for (var i = 0; i < members.length; i++) {

        if (members[i].missed_votes_pct != null) {

        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }
        let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        let missed_votes = members[i].missed_votes;
        let missed_votes_pct = members[i].missed_votes_pct;

        // let total_votes = members[i].total_votes;
        let votes_with_party_pct = members[i].votes_with_party_pct;
        let partyVotes = (members[i].votes_with_party_pct / 100) * members[i].total_votes;


        arrAtt.push({fullName, missed_votes, missed_votes_pct})

        arrLoyalty.push({fullName, partyVotes, votes_with_party_pct})

        }
    }

    console.log(arrAtt);
    console.log(arrLoyalty);

    if (location.pathname == "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/senate-attendance-starter-page.html" || "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/house-attendance-starter-page.html") {
        return arrAtt.sort(function (a, b) {
            return a.missed_votes - b.missed_votes
        });
    } else if (location.pathname == "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/senate-party-loyalty-starter-page.html" || "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/house-party-loyalty-starter-page.html"){
        return arrLoyalty.sort(function (a, b) {
            return a.partyVotes - b.partyVotes    
        });

}
}

let myArrAtt = getArray(members); // to be able to use my function in the table
let myArrLoyalty = getArray(members);


let topTenPercentArrayAtt = leastMost(myArrAtt, myArrLoyalty);
let bottomTenPercentArrayAtt = leastMost(myArrAtt.reverse(), myArrLoyalty.reverse());

let topTenPercentArrayLoyalty = leastMost(myArrAtt, myArrLoyalty);
let bottomTenPercentArrayLoyalty = leastMost(myArrAtt.reverse(), myArrLoyalty.reverse());

// console.log(topTenPercentArrayAtt, bottomTenPercentArrayAtt)

createTableAtt("leastSenateAtt", bottomTenPercentArrayAtt);
createTableAtt("mostSenateAtt", topTenPercentArrayAtt);

createTableLoyalty("leastSenateLoyalty", bottomTenPercentArrayLoyalty);
createTableLoyalty("mostSenateLoyalty", topTenPercentArrayLoyalty);


//******************get an array of obj{name, missedvotes, pct missedvotes}
// function getArray(members) {
//     let arrAtt = [];
//     let arrLoyalty = [];

//     for (var i = 0; i < members.length; i++) {
//         if (members[i].middle_name == null) {
//             members[i].middle_name = "";
//         }
//         let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
//         let missed_votes = members[i].missed_votes;
//         let missed_votes_pct = members[i].missed_votes_pct;

//         // let total_votes = members[i].total_votes;
//         let votes_with_party_pct = members[i].votes_with_party_pct;
//         let partyVotes = (members[i].votes_with_party_pct / 100) * members[i].total_votes;


//         arrAtt.push({fullName, missed_votes, missed_votes_pct})

//         arrLoyalty.push({fullName, partyVotes, votes_with_party_pct})
//     }

//     console.log(arrAtt);
//     console.log(arrLoyalty);

//     if (location.pathname == "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/senate-attendance-starter-page.html" || "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/house-attendance-starter-page.html") {
//         return arrAtt.sort(function (a, b) {
//             return a.missed_votes - b.missed_votes
//         });
//     } else if (location.pathname == "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/senate-party-loyalty-starter-page.html" || "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/house-party-loyalty-starter-page.html"){
//         return arrLoyalty.sort(function (a, b) {
//             return a.partyVotes - b.partyVotes    
//         });

// }
// console.log(getArray(members));

//******************get the 10% for least and most => function

// its the array: name + missedvotes + pctmissedvotes
// function leastMost(myArrAtt, myArrLoyalty) {
//     let attendanceArray = [];
//     let loyaltyArray = [];

//     for (let i = 0; i < myArrAtt.length; i++) {
//         if (i < (myArrAtt.length * 0.1)) {
//             attendanceArray.push(myArrAtt[i])
//             loyaltyArray.push(myArrLoyalty[i])

//         } else if (attendanceArray[attendanceArray.length - 1].missed_votes == myArrAtt[i].missed_votes || loyaltyArray[loyaltyArray.length - 1].partyVotes == myArrLoyalty[i].partyVotes) {
//             attendanceArray.push(myArrAtt[i])
//             loyaltyArray.push(myArrLoyalty[i])
//         } else {
//             break;
//         }
//     }

//         if (location.pathname == "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/senate-attendance-starter-page.html" || "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/house-attendance-starter-page.html") {
//             return attendanceArray;
//         } else if (location.pathname == "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/senate-party-loyalty-starter-page.html" || "/Users/anamargaridadossantosmatinho/Desktop/Sprint1/house-party-loyalty-starter-page.html"){
//             return loyaltyArray;
//         }

// }


//************************************2st and 3rd table - PARTY LOYALTY most/least engaged // SENATE

function createTableAtt(tableId, members) {

    console.log("inside !")


    // console.log(members.length);
    let table = document.getElementById(tableId);

    // console.log(table);

    // to make the 1st table empty
    // table.innerHTML = "";

    for (var i = 0; i < members.length; i++) {

        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }

        let fullName = members[i].fullName;
        let missed_votes = members[i].missed_votes;
        let missed_votes_pct = members[i].missed_votes_pct;

        console.log(fullName, missed_votes, missed_votes_pct)

        let row = document.createElement('tr');
        row.insertCell().innerHTML = fullName;
        row.insertCell().innerHTML = missed_votes;
        row.insertCell().innerHTML = missed_votes_pct.toFixed(2) + "%";
        table.append(row)
    }

}


function createTableLoyalty(tableId, members) {

    // console.log(members.length);
    let table = document.getElementById(tableId);

    console.log(table);

    // to make the 1st table empty
    // table.innerHTML = "";

    for (var i = 0; i < members.length; i++) {

        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }

        let fullName = members[i].fullName;
        let votes_with_party_pct = members[i].votes_with_party_pct;
        let partyVotes = (members[i].votes_with_party_pct / 100) * members[i].total_votes;

        let row = document.createElement('tr');
        row.insertCell().innerHTML = fullName;
        row.insertCell().innerHTML = partyVotes;
        row.insertCell().innerHTML = votes_with_party_pct.toFixed(2) + "%";
        table.append(row)
    }
    

}

