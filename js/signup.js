let InputUser = document.getElementById("InputUser");
let InputEmail = document.getElementById("InputEmail");
let InputPassword1 = document.getElementById("InputPassword1");
let InputPassword2 = document.getElementById("InputPassword2");
let submit = document.getElementById("submit")
let alertDiv = document.getElementById("alertDiv");
let subForm = document.getElementById("subForm");
let LoginHelp = document.getElementById("LoginHelp");

  


class UserObj {
    constructor(name, email, password, userKey, partTeam, createdTeam) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userKey = userKey;
        this.partTeam = partTeam;
        this.createdTeam = createdTeam;
    }
}





class AddUserData {
    validate() {
        let userCond = true;

        if (InputUser.value === "") {
            InputUser.style.borderColor = "red";
            userCond = false;
        }
        else {
            InputUser.style.borderColor = "#ccc";
        }

        let usersObj = localStorage.getItem("userObjLocal");
        usersObj = JSON.parse(usersObj);

        if (usersObj) {
            for (let i = 0; i < usersObj.length; i++) {
                if (usersObj[i].name === InputUser.value.toUpperCase()) {
                    InputUser.style.borderColor = "red";
                    userCond = false;
                    LoginHelp.innerHTML = `this username is not availabe,try another`
                }
            }
            if (userCond === true) {
                InputUser.style.borderColor = "#ccc";
                LoginHelp.innerHTML = ``
            }
        }

        if (InputEmail.value === "") {
            InputEmail.style.borderColor = "red";
            userCond = false;
        }
        else {
            InputEmail.style.borderColor = "#ccc";
        }
        if (InputPassword1.value === "") {
            InputPassword1.style.borderColor = "red";
            userCond = false;
        }
        else {
            InputPassword1.style.borderColor = "#ccc";
        }
        if (InputPassword2.value === "") {
            InputPassword2.style.borderColor = "red";
            userCond = false;
        }
        else {
            InputPassword2.style.borderColor = "#ccc";
        }

        var emailRgex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (emailRgex.test(InputEmail.value)) {
            InputEmail.style.borderColor = "#ccc";

        } else {
            InputEmail.style.borderColor = "red";
            userCond = false;

        }

        if (InputPassword1.value !== InputPassword2.value) {
            InputPassword1.style.borderColor = "red";
            InputPassword2.style.borderColor = "red";
            userCond = false;

        } else {
            InputPassword1.style.borderColor = "#ccc";
            InputPassword2.style.borderColor = "#ccc";

        }
        return userCond



    }

    clear() {
        subForm.reset()
    }


    createObj() {
        let data1 = new UserObj(InputUser.value.toUpperCase(), InputEmail.value, InputPassword1.value, new Date().getTime(), [], []);
        return data1

    }
}

// function done(){
//     var fname = document.getElementById('full name').value;
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;
//     if(email==="" || password===""){
//       alert("Please fill the Field")
//     }
//     else{
    
//     const info = {
//         email: email,
//         password: password,
//     }
//     window.localStorage.setItem(fname,JSON.stringify(info));
  
//   }}


let user = new AddUserData();


submit.addEventListener('click', event => {

    user.validate()
    if (user.validate()) {
        user.createObj();
        let userObbb = user.createObj();

        let getfromLocal = localStorage.getItem("userObjLocal");
        if (getfromLocal === null) {
            var arr = [];
        } else {
            arr = JSON.parse(getfromLocal);
        }

        arr.push(userObbb)
        localStorage.setItem("userObjLocal", JSON.stringify(arr))

        console.log(getfromLocal)
        user.clear()
        swal({
            title: "Account Created",
            text: "Your account has been created! please login.",
            icon: "success",
            button: "OK",
        })
            .then(() => {
            window.location = "././index.html"
            
                });
    }  else {
        console.log("user cond false")
        
    }
    



    
    event.preventDefault()
})