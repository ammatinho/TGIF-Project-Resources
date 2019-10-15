// ************************************SENATE - SPRINT 1

// document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);


// Get the array of members
console.log(data.results[0].members);

const members = data.results[0].members;
var selectedInput = document.getElementById("filteredState");
var checkboxes = document.querySelectorAll("input[type = checkbox]");

createTable("mainTable", members);
function createTable(tableId, members) {

    // console.log(members.length);
    let table = document.getElementById(tableId);

    // to make the 1st table empty
    // table.innerHTML = "";

    // new row
    for (var i = 0; i < members.length; i++) {

        if (members[i].middle_name == null) {
            members[i].middle_name = "";
        }
        // else {
        //     members[i].middle_name;
        // }
        let fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        let party = members[i].party;
        let state = members[i].state;
        let seniority = members[i].seniority;
        let votes = members[i].votes_with_party_pct;

        // let row = document.createElement('th');
        // row.insertCell().inner = "Name";
        // row.insertCell().inner = "Party";
        // row.insertCell().inner = "State";
        // row.insertCell().inner = "Years in Office";
        // row.insertCell().inner = "% Votes w/ Party";

        let row = document.createElement('tr');
        row.insertCell().innerHTML = fullName;
        row.insertCell().innerHTML = party;
        row.insertCell().innerHTML = state;
        row.insertCell().innerHTML = seniority;
        row.insertCell().innerHTML = votes;
        table.append(row)
    }
}

// ************************************HOUSE

// array
// console.log(data.results[0].members);
// const members = data.results[0].members;

// let tableHouse = document.getElementById('house-data');

// new row
//     for (var j = 0; j < members.length; j++) 
//     {

//         if (members[j].middle_name == null){
//             members[j].middle_name = "";
//         } 
//         // else {
//         //     members[j].middle_name;
//         // }
//         let fullName = members[j].first_name + " " + members[j].middle_name + " " + members[j].last_name;
//         let party = members[j].party;
//         let state = members[j].state;
//         let seniority = members[j].seniority;
//         let votes = members[j].votes_with_party_pct;

//         let row = document.createElement('tr');
//         row.insertCell().innerHTML = fullName;
//         row.insertCell().innerHTML = party;
//         row.insertCell().innerHTML = state;
//         row.insertCell().innerHTML = seniority;
//         row.insertCell().innerHTML = votes;
//         tableHouse.append(row)
//         }
// } 


// *********Button Read More - Read Less
function readButton() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === 'none') {
        dots.style.display = "inline";
        btnText.innerHTML = "Read More";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read Less";
        moreText.style.display = "inline";
    }
}


//************************************FILTER - SPRINT 2 EPIC 5

// array with R, D, I
function getFilteredMembers() {
    let filteredMembers = [];
    for (var i = 0; i < members.length; i++) {
        let party = members[i].party;
        let state = members[i].state
        if (getChecked().includes(party) && (selectedInput.value == state || selectedInput.value == 'all'))
            filteredMembers.push(members[i]);
    }
    return filteredMembers;
}


// array with result of the R/D/I checked
function getChecked() {
    var checked = [];

    for (var j = 0; j < checkboxes.length; j++) {
        var checkbox = checkboxes[j];
        if (checkbox.checked)
            checked.push(checkbox.value);
    }
    return checked;
}

// create filtered table 
function displayFilteredTable() {
    let newFilteredMembers = getFilteredMembers();
    createTable("mainTable", newFilteredMembers);
}

// event/action
// checkboxes.forEach(checkbox => {
//     checkbox.addEventListener("click", displayFilteredTable)
// })


document.getElementById("republican").addEventListener("click", displayFilteredTable);
document.getElementById("democrat").addEventListener("click", displayFilteredTable);
document.getElementById("independent").addEventListener("click", displayFilteredTable);


// *********DROPDOWN LIST - SPRINT 3 EPIC 1
// create an array of all states. get the unique values, ten sort it. Dropdown menu.

getFilteredState("filteredState");
function getFilteredState(selectId) {
    let select = document.getElementById(selectId);
    // select.innerHTML = ""; //its deleting the --ALL--

    //get a new array to get an array with unique values
    let stateNewArray = [];

    for (var i = 0; i < members.length; i++) {
        if (!stateNewArray.includes(members[i].state)) { //this is a denial. so if stateNewArray -that its empty- doesnt include state => push it
            stateNewArray.push(members[i].state)
        }
    }

    stateNewArray.sort();

    for (let i = 0; i < stateNewArray.length; i++) { // the members array has been replaced by the new array with the unique values
        // let state = members[i].state; // its not working anymore because we created the new array
        let option = document.createElement('option');
        option.value = stateNewArray[i];
        option.innerHTML = stateNewArray[i];
        select.appendChild(option);
    }
}


// add the functionality  of filter inside my filter function

document.getElementById("filteredState").addEventListener("change", displayFilteredTable);