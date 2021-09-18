let teamName = document.getElementById("teamName");
let questionInp = document.getElementById("questionInp");
let addQuestionBtn = document.getElementById("addQuestionBtn");
let questionUl = document.getElementById("questionUl");
let teamMembers = document.getElementById("teamMembers");
let membersUl = document.getElementById("membersUl");
let membersLi = document.getElementsByClassName("membersLi");
let membersLiModal = document.getElementsByClassName("membersLiModal");
let submitBtn = document.getElementById("submitBtn");
let arrForMember = [];
let showingMembers = [];
let delTeamFlag = false;

let usersObj = localStorage.getItem("userObjLocal");
usersObj = JSON.parse(usersObj);

let userIndex = localStorage.getItem("userIndex");
userIndex = JSON.parse(userIndex);

let teamIndex = localStorage.getItem("teamIndex");
teamIndex = JSON.parse(teamIndex);

let teamsArr = [];
let newArr = []

let curruntUsername = usersObj[userIndex].name;

console.log(usersObj[userIndex].partTeam[teamIndex])

let curruntTeam = usersObj[userIndex].partTeam[teamIndex];


let getUserFromLocal = localStorage.getItem("userObjLoginLocal");
getUserFromLocal = JSON.parse(getUserFromLocal);
if (getUserFromLocal) {
    console.log(getUserFromLocal)
} else {
    window.location = '././index.html'
}


function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}


let displayFunc = () => {

    teamName.innerHTML = `Team Name : ${curruntTeam.teamName}`;

}
displayFunc()


console.log(curruntTeam.questions[0])
let answer = (element, Eid) => {
    curruntTeam.questions[Eid].ans = element.value;
    console.log(element.value)


    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
    console.log(curruntTeam.questions)
}

let submit = () => {
    swal.fire({
        title: 'Are you sure?',
        text: "You can submit only once.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Submitted!',
                'Your file has been submitted.',
                'success'
            )
            for (let i = 0; i < usersObj.length; i++) {
                for (let j = 0; j < usersObj[i].createdTeam.length; j++) {
                    if (usersObj[i].createdTeam[j].admin == curruntTeam.admin) {
                        console.log(curruntTeam.admin, usersObj[i].createdTeam[j].admin);
                        usersObj[i].createdTeam[j].reports.push({ [curruntUsername]: curruntTeam.questions })
                    }
                }
            }
            curruntTeam.subBtnStatus = true;
            localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
            submitBtn.disabled = true;
        }
    })
    
}
submitBtn.disabled = curruntTeam.subBtnStatus;
let displayQuestFunc = () => {
    questionUl.innerHTML = ""
    for (let i = 0; i < curruntTeam.questions.length; i++) {
        questionUl.innerHTML += `
                <li id="${i}" class="list-group-item"><div>Q : ${curruntTeam.questions[i].q}</div>
                    <div><input type="email" onblur="answer(this,this.id)" value="${curruntTeam.questions[i].ans}" class="form-control answer" id="${i}" placeholder="ANSWER"></div>
                </li>`
    }

}

displayQuestFunc()

let displayFunc1 = () => {


    for (let i = 0; i < curruntTeam.members.length; i++) {
        teamMembers.innerHTML += `
        <li class="membersLi" id="${i}">${curruntTeam.members[i]}</li>`
        showingMembers.push(curruntTeam.members[i])
    }

}


displayFunc1()