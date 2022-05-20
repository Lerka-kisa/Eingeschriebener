function showPassword() {
    let show = document.getElementById("showPassword");
    show.onchange = function() {
        if(this.checked) {
            document.getElementById("password").setAttribute("type", "text");
        }else {
            document.getElementById("password").setAttribute("type", "password");
        }
    }
}

let loginCheck = false;
let passwordCheck = false;
let repeatCheck = false;

function checkLogin(str) {
    if(str.length < 4)
    {
        document.getElementById("errorInput").innerHTML = "Login must be more than 4 characters";
        document.getElementsByName("login")[0].style.borderColor = "red";
        loginCheck = false;
    }
    else
    {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("login")[0].style.borderColor = "green";
        loginCheck = true;
    }
}

function checkPassword(str) {
    if (str.length < 8) {
        document.getElementById("errorInput").innerHTML = "Password must be more than 8 characters";
        document.getElementsByName("password")[0].style.borderColor = "red";
        passwordCheck = false;
        return;
    } else {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("password")[0].style.borderColor = "green";
        passwordCheck = true;
    }

    if (str !== document.getElementsByName("repeat")[0].value) {
        document.getElementById("errorInput").innerHTML = "Password not equals the password repeated";
        document.getElementsByName("password")[0].style.borderColor = "red";
        document.getElementsByName("repeat")[0].style.borderColor = "red";
        repeatCheck = false
    } else {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("password")[0].style.borderColor = "green";
        document.getElementsByName("repeat")[0].style.borderColor = "green";
        repeatCheck = true
    }
}

function checkRepeat(str) {
    if (str.length < 8) {
        document.getElementById("errorInput").innerHTML = "Repeated must be more than 8 characters";
        document.getElementsByName("repeat")[0].style.borderColor = "red";
        passwordCheck = false;
        return;
    } else {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("repeat")[0].style.borderColor = "green";
        passwordCheck = true;
    }

    if (str !== document.getElementsByName("password")[0].value) {
        document.getElementById("errorInput").innerHTML = "Repeated not equals the password repeated";
        document.getElementsByName("password")[0].style.borderColor = "red";
        document.getElementsByName("repeat")[0].style.borderColor = "red";
        repeatCheck = false
    } else {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("password")[0].style.borderColor = "green";
        document.getElementsByName("repeat")[0].style.borderColor = "green";
        repeatCheck = true
    }
}

const registUser = () =>{
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    if(repeatCheck&&loginCheck&&passwordCheck){
        fetch("https://Eingeschriebener/auth/register", /*TODO link*/{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    login : login,
                    password: password
                })
        }).then(response => {return response.json()})
            .then(result => {
                if(result.status === "not ok"){
                    //console.log("kok")
                    //document.getElementById("errorInput")[0].style.borderColor = "red";
                    document.getElementById("errorInput").innerHTML = "Этот логин уже занят, придумай другой, пожалуйста";
                }
                if(result.status === "ok"){
                    //console.log("lpl")
                    window.location.href = '/auth/login'
                    //redirect('/belstu_fit');
                }

            }).catch(err => {
            console.log(err)
        })
    }
    else {
        document.getElementById("errorInput").innerHTML = "Введены некорректные данные";
    }

}

let registbut = document.getElementById('submit_regist');
registbut.addEventListener("click", registUser)


