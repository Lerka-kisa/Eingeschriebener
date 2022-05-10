//window.onload = function (){


    function showPassword()
    {
        let login = false;
        let password = false;
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
        let login = false;
        let password = false;
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
        let login = false;
        let password = false;
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


    const loginUser = () =>{
        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;

        //fetch("https://localhost:443/univers/offer", /*TODO https*/{
        fetch("http://localhost:5000/auth/login", /*TODO link*/{
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
                if(result.error){
                    if(result.error === "not ok"){
                        //console.log("kok")
                        document.getElementById("errorInput").innerHTML = "Неверный логин или пароль";
                    }
                    if(result.error === "ok"){
                        console.log("lpl")
                        window.location.href = '/belstu_fit/userinfo'
                        //redirect('/belstu_fit');
                    }

                    //console.log(result.error)
                }else {
                    //document.getElementById("container__list").innerHTML = builderList(result)
                }
            }).catch(err => {
            console.log(err)
        })
    }
let loginbut = document.getElementById('submit');
loginbut.addEventListener("click", loginUser)
//}
