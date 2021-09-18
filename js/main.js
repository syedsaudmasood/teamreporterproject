
let modalBBtn = document.getElementById("modalBBtn");
let createTeam = document.getElementById("createTeam");
let selectCategory = document.getElementById("selectCategory");
let teamName = document.getElementById("teamName");
let memberEmail = document.getElementById("memberEmail");
let teamsDiv = document.getElementById("teamsDiv");
let deleteTeam = document.getElementById("deleteTeam");
let addMoreBtn = document.getElementById("addMoreBtn");
let addMoreInp = document.getElementById("addMoreInp");
let logoutBtn = document.getElementById("logoutBtn");
let membersUl = document.getElementById("membersUl");
let membersModal = document.getElementsByClassName("membersModal");
let team;
let index;
let teamsObj;
let membersArr = "";
let arrForMember = []
let addMemberIndex;

let getUserFromLocal = localStorage.getItem("userObjLoginLocal");
getUserFromLocal = JSON.parse(getUserFromLocal);
if (getUserFromLocal) {
    console.log(getUserFromLocal)
} else {
    window.location = '././index.html'
}


let usersObj = localStorage.getItem("userObjLocal");
usersObj = JSON.parse(usersObj);

for (let i = 0; i < usersObj.length; i++) {
    if (usersObj[i].name === getUserFromLocal.name) {
        index = i;
        teamsObj = usersObj[i].createdTeam;
    }
}



function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}
let takeUserInput = () => {

    let selectedCategory = selectCategory.options[selectCategory.selectedIndex].value;
    let team = {
        admin: getUserFromLocal.email,
        adminName: getUserFromLocal.name,
        teamName: teamName.value,
        category: selectedCategory,
        members: arrForMember,
        reports: [],
        teamKey: new Date().getTime()
    }
    if(team.teamName === ""){
        swal("Team not created", "Please input team name!", "error");
        
    }else{
        
        for (let i = 0; i < usersObj.length; i++) {
            if (usersObj[i].name === getUserFromLocal.name) {
                arr2 = usersObj[i].createdTeam;
            }
        }
        
        if (arr2 === undefined) {
            var arr = []
        } else {
            var arr = arr2;
        }
        refresh()
        arr.push(team)
        for (let i = 0; i < usersObj.length; i++) {
            if (usersObj[i].name === getUserFromLocal.name) {
                usersObj[i].createdTeam = arr;
            }
        }
        localStorage.setItem("userObjLocal", JSON.stringify(usersObj));
        displayFunc()
    }
    
    






}
let addMemberFunc = (e, eId, d) => {
    let addedMembers = document.getElementById("addedMembers");
    addedMembers.innerHTML = ""
    arrForMember.push(usersObj[eId].name);
    for (let i = 0; i < arrForMember.length; i++) {

        addedMembers.innerHTML += `<li class="bg-success" id="${i}">${arrForMember[i]}</li>`
    }

    e.remove()
    console.log(arrForMember);

}

let teamsDecet = (id, e) => {
    localStorage.setItem("userIndex", JSON.stringify(index));
    localStorage.setItem("teamIndex", JSON.stringify(id));
    window.location = "reports.html"

}

createTeam.addEventListener('click', takeUserInput)
let displayFunc = () => {






    teamsDiv.innerHTML = ""
       for (let i = 0; i < usersObj.length; i++) {
        membersUl.innerHTML += `
        <li class="membersModal" onclick="addMemberFunc(this,this.id,${i})" id="${i}">${usersObj[i].name}</li>`

        for (let s = 0; s < membersModal.length; s++) {
            if (membersModal[i].innerText == usersObj[index].name) {
                membersModal[i].style.display = "none"
            }


        }


    }

    if (teamsObj.length == 0) {
        teamsDiv.innerHTML = `<p class="emptyTeams">you have not created any team,click on plus button and create a new team</p>`
    } else {
        for (let i = 0; i < teamsObj.length; i++) {
            membersArr = ""
            for (let w = 0; w < teamsObj[i].members.length; w++) {
                membersArr += `<p>${teamsObj[i].members[w]}</p>`
                if (w > 0) {
                    break;
                }
            }
            if (teamsObj[i].members.length > 2) {

                membersArr += `<p>AND ${teamsObj[i].members.length - 2} OTHERS</p>`
            }


            teamsDiv.innerHTML += `
            <div id="${i}" onclick="teamsDecet(this.id,this)" class="card-body">
                <h5>Team Name : <span id="teamSpan">${teamsObj[i].teamName}</span></h5>
                <div class="membersDiv container">members : <span>${membersArr}</span></div>
                <button type="button" id="${i}" onclick="teamsDecet(this.id,this)" class="btn btn-dark">
                    See more details
                </button>
                
            </div>`
        }

    }


    teamName.value = "";
    selectCategory.selectedIndex = 0;
    
}
displayFunc()

let deleteTeamFunc = (e) => {
    teamsObj.splice(e, 1)
    usersObj[index].createdTeam = teamsObj;
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj));

    displayFunc()
    refresh()

}

let addMoreFunc = (e) => {
    addMemberIndex = e;

}

let memberDecet = (id, e) => {
    localStorage.setItem("userIndex", JSON.stringify(index));
    localStorage.setItem("teamIndex", JSON.stringify(id));
    window.location = "member.html"

}

let teamsYouPartDiv = document.getElementById("teamsYouPartDiv");

let teamsPrt = usersObj[index].partTeam;
if (teamsPrt.length == 0) {
    teamsYouPartDiv.innerHTML = `<p class="emptyTeams">You are not part of any team.</p>`
    
}else{
    let currentUser = usersObj[index];
    let partTeamMember = "";
    let partTeamDisplay = () => {

        for (let i = 0; i < teamsPrt.length; i++) {
            partTeamMember = ""
            for (let w = 0; w < teamsPrt[i].members.length; w++) {
                partTeamMember += `<p>${teamsPrt[i].members[w]}</p>`
                if (w > 0) {
                    break;
                }
            }
            if (teamsPrt[i].members.length > 2) {

                partTeamMember += `<p>& ${teamsPrt[i].members.length - 2} OTHERS</p>`
            }
            teamsYouPartDiv.innerHTML += `
            <div id="${i}" onclick="memberDecet(this.id,this)" class="card-body">
                <h6>admin : ${teamsPrt[i].adminName}</h6/>
                <h5>Team Name : <span id="teamSpan">${teamsPrt[i].teamName}</span></h5>
                <div class="membersDiv container">members : <span>${partTeamMember}</span></div>
                <button type="button" id="${i}" onclick="memberDecet(this.id,this)" class="btn btn-dark">
                    See more details
                </button>
                
            </div>`
        }
    }
    partTeamDisplay()    
}

