//************************************1st table - ATTENDANCE/PARTY LOYALTY at glance
//get members of senate

const membersHouse = data.results[0].members.filter(member => member.votes_with_party_pct != null);
console.log(membersHouse);

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

    for (var i = 0; i < membersHouse.length; i++) {
        if (membersHouse[i].votes_with_party_pct != null) {
        if (membersHouse[i].party.includes("D")) {
            democrats.push(membersHouse[i].party) //***Number of Resp - 1st table - PARTY LOYALTY
            democratsVotes.push(membersHouse[i].votes_with_party_pct) //***% Voted w/ Party - 1st table - PARTY LOYALTY

        } else if (membersHouse[i].party.includes("R")) {
            republicans.push(membersHouse[i].party) //***Number of Resp - 1st table - PARTY LOYALTY
            republicansVotes.push(membersHouse[i].votes_with_party_pct) //***% Voted w/ Party - 1st table - PARTY LOYALTY

        } else if (membersHouse[i].party.includes("I")) {
            independents.push(membersHouse[i].party) //***Number of Resp - 1st table - PARTY LOYALTY
            independentsVotes.push(membersHouse[i].votes_with_party_pct) //***% Voted w/ Party - 1st table - PARTY LOYALTY
        }
        total.push(membersHouse[i].party) //***Number of Resp - 1st table - PARTY LOYALTY
        totalVotes.push(membersHouse[i].votes_with_party_pct) //***% Voted w/ Party - 1st table - PARTY LOYALTY
    }
    }
    // console.log(democrats,republicans,independents)
    document.getElementById("democrats").innerHTML = democrats.length;
    document.getElementById("republicans").innerHTML = republicans.length;
    document.getElementById("independents").innerHTML = independents.length;
    document.getElementById("total").innerHTML = democrats.length + republicans.length + independents.length;


    // console.log(democratsVotes,republicansVotes,independentsVotes)

    let democratsVotesPct = (democratsVotes.reduce((a,b) => a+b) / democrats.length);
    let republicansVotesPct = (republicansVotes.reduce((a,b) => a+b)/ republicans.length);
    if (independentsVotes.length != 0) {
     independentsVotesPct = (independentsVotes.reduce((a,b) => a+b) / independents.length);
    } else {
     independentsVotesPct = 0;
    }
    let totalVotesPct = (totalVotes.reduce((a,b) => a+b) / total.length);

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

//     for (var i = 0; i < membersHouse.length; i++) {
//         if (membersHouse[i].party.includes("D")){
//             democrats++

//         } else if (membersHouse[i].party.includes("R")){
//             republicans++

//         } else if (membersHouse[i].party.includes("I")){
//             independents++
//         }
//     }

//     console.log(democrats,republicans,independents)

// }


//************************************2st table - ATTENDANCE most/least engaged // HOUSE

//NOTE:::
////// criar function outside === array. then inside the function faço o sort. then dentro da function createtable fazer for lop to display rows.
///create a function that receives the data; that function should loop through the data and create an array that it will return, sorted

const members = data.results[0].members;
// console.log(members);

let myArrAtt = getArray(members); // to be able to use my function in the table
let topTenPercentArrayAtt = leastMost(myArrAtt);
let bottomTenPercentArrayAtt = leastMost(myArrAtt.reverse());

// console.log(topTenPercentArray, bottomTenPercentArray)

createTableAtt("leastHouseAtt",bottomTenPercentArrayAtt);
createTableAtt("mostHouseAtt",topTenPercentArrayAtt);

//******************get an array of obj{name, missedvotes, pct missedvotes}
function getArray(members){
    let arrAtt = [];

    for (var i = 0; i < members.length; i++){

        if (members[i].missed_votes_pct != undefined) { //**changed undefined values

        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }
        let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        let missed_votes = members[i].missed_votes;
        let missed_votes_pct = members[i].missed_votes_pct;

        arrAtt.push( {fullName, missed_votes, missed_votes_pct} )
    }
}
    return arrAtt.sort(function(a,b) {
        return a.missed_votes - b.missed_votes
    });
}
// console.log(getArray(members));

//******************get the 10% for least and most => function

function leastMost(myArrAtt) { // its the array: name + missedvotes + pctmissedvotes
    let attendanceArray = [];
    for (let i = 0; i < myArrAtt.length; i++) {
        if (i < (myArrAtt.length*0.1)) {
            attendanceArray.push(myArrAtt[i])
        } else if (attendanceArray[attendanceArray.length - 1].missed_votes == myArrAtt[i].missed_votes) {
            attendanceArray.push(myArrAtt[i])
        } else {
            break;
        }
    }
    return attendanceArray;

}

function createTableAtt(tableId, members) {


    // console.log(members.length);
    let table = document.getElementById(tableId);

    // to make the 1st table empty
    // table.innerHTML = "";

    for( var i = 0; i < members.length; i++){

        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }

        let fullName = members[i].fullName;
        let missed_votes = members[i].missed_votes;
        let missed_votes_pct = members[i].missed_votes_pct;

        let row = document.createElement('tr');
        row.insertCell().innerHTML = fullName;
        row.insertCell().innerHTML = missed_votes;
        // console.log(missed_votes_pct, fullName) /**to see the undefined values logged
        row.insertCell().innerHTML = missed_votes_pct.toFixed(2) + "%";;
        table.append(row)
    }

}


//************************************2st table - PARTY LOYALTY

// function to get the least 

//get the ones with the same amount 