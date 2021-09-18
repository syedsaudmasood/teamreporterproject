
let teamName = document.getElementById("teamName");
let questionInp = document.getElementById("questionInp");
let addQuestionBtn = document.getElementById("addQuestionBtn");
let questionUl = document.getElementById("questionUl");
let teamMembers = document.getElementById("teamMembers");
let membersUl = document.getElementById("membersUl");
let membersLi = document.getElementsByClassName("membersLi");
let membersLiModal = document.getElementsByClassName("membersLiModal");
let arrForMember = [];
let showingMembers = [];
let delTeamFlag = false;


let usersObj = localStorage.getItem("userObjLocal");
usersObj = JSON.parse(usersObj);

let userIndex = localStorage.getItem("userIndex");
userIndex = JSON.parse(userIndex);

let teamIndex = localStorage.getItem("teamIndex");
teamIndex = JSON.parse(teamIndex);

// getting login data from local storage
let getUserFromLocal = localStorage.getItem("userObjLoginLocal");
getUserFromLocal = JSON.parse(getUserFromLocal);
if (getUserFromLocal) {
    console.log(getUserFromLocal)
} else {
    window.location = '././index.html'
}

let teamsArr = [];
let newArr = []





let curruntTeam = usersObj[userIndex].createdTeam[teamIndex];
function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}


let deleteMemIndex;
let deletePartTeamFunc = (index) => {

    for (let i = 0; i < usersObj.length; i++) {
        if (usersObj[i].name == curruntTeam.members[index]) {
            deleteMemIndex = i;
            console.log(usersObj[i], console.log(index))
        }
    }

    for (let j = 0; j < usersObj[deleteMemIndex].partTeam.length; j++) {
        if (usersObj[deleteMemIndex].partTeam[j].teamKey == curruntTeam.teamKey) {
            usersObj[deleteMemIndex].partTeam.splice(j, 1)
            console.log("key matched")
        }
    }
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
}








let deletMemberFunc = (e, eId) => {
    console.log(eId)
    deletePartTeamFunc(eId)
    e.parentNode.remove();

  
    curruntTeam.members.splice(eId, 1)
    deleteMemId = eId;
    deleteMemFlag = true;
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
    refresh()
}

let displayFunc = () => {

    teamName.innerHTML = `Team Name : ${curruntTeam.teamName}`;

    for (let i = 0; i < curruntTeam.members.length; i++) {
        teamMembers.innerHTML += `
        <li class="membersLi" id="${i}">${curruntTeam.members[i]}<i id="${i}" onclick="deletMemberFunc(this,this.id)" class="bi bi-x-circle-fill "></i></li>`
        showingMembers.push(curruntTeam.members[i])
    }

}
displayFunc()
let addQuestFunc = () => {
    if (curruntTeam.questions === undefined) {
        var questArr = []
    } else {

        questArr = curruntTeam.questions;
    }
    questArr.push({ q: questionInp.value, ans: "" })
    curruntTeam.questions = questArr;
    curruntTeam.reports = []
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))

    questionInp.value = ""
    displayQuestFunc()
}
addQuestionBtn.addEventListener('click', addQuestFunc);

let deleteQuest = (id, e) => {
    e.parentNode.parentNode.remove()

    curruntTeam.questions.splice(id, 1);
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))

}

let displayQuestFunc = () => {
    if (curruntTeam.questions) {
        questionUl.innerHTML = ""
        for (let i = 0; i < curruntTeam.questions.length; i++) {
            questionUl.innerHTML += `
                    <li id="${i}" class="list-group-item"><div>${curruntTeam.questions[i].q}</div><div><i id="${i}" onclick="deleteQuest(this.id,this)" class="bi bi-trash"></i></div></li>`
        }

    }

}

let addMembersFunc = () => {
    refresh()

}

let addMemberFunc = (e, eId) => {

    let addedMembers = document.getElementById("addedMembers");
    addedMembers.innerHTML = ""
    arrForMember.push(usersObj[eId].name);
    for (let i = 0; i < arrForMember.length; i++) {

        addedMembers.innerHTML += `<li class="bg-success" id="${i}">${arrForMember[i]}</li>`
    }
    e.remove()
    
    curruntTeam.members.push(usersObj[eId].name);
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
}

let modalBBtn = document.getElementById("modalBBtn");

var addMembers = () => {
    for (let i = 0; i < usersObj.length; i++) {
        membersUl.innerHTML += `
        <li class="membersLiModal" onclick="addMemberFunc(this,this.id)"  id="${i}">${usersObj[i].name}</li>`

        if (usersObj[i].name == usersObj[userIndex].name) {
            console.log(membersLiModal[i].innerText, usersObj[userIndex].name)
            membersLiModal[i].style.display = "none"
        }
        for (let s = 0; s < membersLi.length; s++) {

            if (membersLiModal[i].innerText == membersLi[s].innerText) {
                membersLiModal[i].style.display = "none"
            }
        }

    }
}
addMembers()


let deleteTeamFunc = () => {
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            delTeamFlag = true
            deletePartTeam()
            window.location = "././main.html"
        }
    })


}
// deleteTeamFunc()
console.log(delTeamFlag)



var deletePartTeam = () => {

    let teamFound = true;
    let curruntpartIndex;
    let teamMemberArr = curruntTeam.members;
    for (let i = 0; i < usersObj.length; i++) {
        for (let j = 0; j < teamMemberArr.length; j++) {
            if (usersObj[i].name == teamMemberArr[j]) {
                for (let k = 0; k < usersObj[i].partTeam.length; k++) {
                    if (usersObj[i].partTeam[k].teamKey == curruntTeam.teamKey) {
                        usersObj[i].partTeam.splice(k, 1)
                        curruntpartIndex = k;
                    }
                }
                if (teamFound) {
                    usersObj[i].partTeam.push(curruntTeam);
                }
                if (delTeamFlag) {
                    usersObj[i].partTeam.splice(curruntpartIndex, 1)
                }
            }
        }
    }

    if (delTeamFlag) {
        usersObj[userIndex].createdTeam.splice(teamIndex, 1)
    }
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj));
}

deletePartTeam()

















displayQuestFunc()