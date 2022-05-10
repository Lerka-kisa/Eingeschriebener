let login = false;
let password = false;

function showPassword()
{
    let show = document.getElementById("showPassword");
    show.onchange = function() {
        if(this.checked) {
            document.getElementById("password").setAttribute("type", "text");
        }else {
            document.getElementById("password").setAttribute("type", "password");
        }
    }
}

function checkLogin(str)
{
    if(str.length < 4)
    {
        document.getElementById("errorInput").innerHTML = "Login must be more than 4 characters";
        document.getElementsByName("login")[0].style.borderColor = "red";
        login = false;
    }
    else
    {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("login")[0].style.borderColor = "green";
        login = true;
    }
}

function checkPassword(str)
{
    if(str.length < 8)
    {
        document.getElementById("errorInput").innerHTML = "Password must be more than 8 characters";
        document.getElementsByName("password")[0].style.borderColor = "red";
        password = false;
    }
    else
    {
        document.getElementById("errorInput").innerHTML = "";
        document.getElementsByName("password")[0].style.borderColor = "green";
        password = true;
    }
}

function goReg(a){
    console.log(a)
    fetch("http://localhost:5000/auth/register", /*TODO link*/{
        method : 'POST',
        headers: {
            'Content-Type': 'text/html;charset=utf-8'
        }
    }).then(response => {return response.text()})
        .then(result => {
            console.log(result)
            // if(result.error){
            //     //console.log(result.error)
            //     document.getElementById("container__list").innerText = result.error;
            // }else {
            //     document.getElementById("container__list").innerHTML = builderList(result)
            // }
        }).catch(err => {
        console.log(err)
    })
}