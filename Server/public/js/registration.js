let loginCheck = false;
let passwordCheck = false;
let repeatCheck = false;

function checkLogin(str) {
    if(str.length < 4)
    {
        document.getElementById("errorInput").innerHTML = "Логин не может состоять менее чем из 4 символов";
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
        document.getElementById("errorInput").innerHTML = "Пароль должен состоять более чем из 8 знаков";
        document.getElementsByName("password")[0].style.borderColor = "red";
        passwordCheck = false;
        return;
    } else {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("password")[0].style.borderColor = "green";
        passwordCheck = true;
    }

    if (str !== document.getElementsByName("repeat")[0].value) {
        document.getElementById("errorInput").innerHTML = "Повтор пароля и пароль не совпадают";
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
    if (str !== document.getElementsByName("password")[0].value) {
        document.getElementById("errorInput").innerHTML = "Повтор пароля и пароль не совпадают";
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
                    document.getElementById("error").innerHTML = "Этот логин уже занят, придумай другой, пожалуйста";
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
        document.getElementById("error").innerHTML = "Введены некорректные данные";
    }

}

document.getElementById('submit_regist').addEventListener("click", registUser)



