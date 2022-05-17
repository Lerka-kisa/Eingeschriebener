// window.onload = function (){ }
// const infoUser = () => {
//     fetch("http://localhost:5000/belstu_fit/userinfo", /*TODO link*/{
//         method : 'GET',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         }
//     }).then(response => {
//         console.log(response);return response.json()})
//         .then(result => {
//             if(result.error){
//                 //если гость
//                 if (result.error === 1){
//                     console.log("Надо авторизоваться")
//                     fetch("http://localhost:5000/auth/login", /*TODO link*/{
//                         method : 'GET',
//                         headers: {
//                             'Content-Type': 'text/plain'
//                         }
//                     }).then(response => {return response.text()})
//                         .then(result => {
//                             document.getElementsByClassName("useraccount")[0].innerHTML = result
//                         })
//                 }
//                 //если админ
//                 if (result.error === 2){
//                     //console.log("You are admin")
//                     document.getElementsByClassName("useraccount")[0].innerHTML = "You are admin"
//                 }
//             }
//         }).catch(err => {
//         console.log(err.message)
//     })
// }
//infoUser()
// json.forEach(univer => {
//     list += `<div class="container__list__univer">
//             <div class="container__list__univer__a" onclick="getUniver(${univer.id})">${univer.full_name}</div>`
//     univer.Faculty_data.forEach(fac => {
//         list += `<div class="container__list__univer">${fac.name}</div>`
//     })
//     list += `</div>`
// })


const GetRating = (cont) => {
    fetch("http://localhost:5000/belstu_fit/getrating", /*TODO link*/{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            {
                contract : cont
            })
    })
        .then(response => {return response.json()})
        .then(result => {
            if(result.error){
                console.log("Dura")
                //window.location.href = '/belstu_fit/userinfo/add'
            }
            else {
                console.log(result)
                //monitoring(result)
                if(cont === "budgetary"){
                    document.getElementById("monitoring_budgetary").innerHTML = monitoring(result, cont)
                }
                if(cont === "paid"){
                    document.getElementById("monitoring_paid").innerHTML = monitoring(result, cont)
                }

            }
        })
}
GetRating("budgetary")
GetRating("paid")
const monitoring = (json, cont) => {
    let a = 0;
    let min = 71;
    let POIT = []
    for(let i=0; i<=40 ;i++){
        POIT[i] = 0
    }
    let ISIT = []
    for(let i=0; i<=40 ;i++){
        ISIT[i] = 0
    }
    let POIBMS = []
    for(let i=0; i<=40 ;i++){
        POIBMS[i] = 0
    }
    let DEIVI = []
    for(let i=0; i<=40 ;i++){
        DEIVI[i] = 0
    }
    json.forEach(chel => {
        chel.sum--
        a = Math.floor(chel.sum/10)
        if (chel.POIT ===1){
            POIT[a]++
        }
        if (chel.ISIT ===1){
            ISIT[a]++
        }
        if (chel.POIBMS ===1){
            POIBMS[a]++
        }
        if (chel.DEIVI ===1){
            DEIVI[a]++
        }
    })
    console.log(POIT)
    console.log(ISIT)
    console.log(POIBMS)
    console.log(DEIVI)

    let type = ""
    if(cont === "budgetary"){
        type = "бюджета"
    }
    if(cont === "paid"){
        type = "платного"
    }

    let list = `<div id="belstu__monitoring__${cont}">Мониторинг ${type}:
                <table id="belstu__monitoring__table__${cont}" style="border-collapse: collapse;">
                    <tr>
                        <th>Cпецуха</th>`
    for(let i=min; i<401 ;i = i + 10){
        list += `<th>${i}-${i+9}</th>\n`
    }
    list += `</tr>
            <tr>
                <td>ПОИТ</td>`
    for(let i=Math.floor(min/10); i<40 ;i++){
        list += `<th>${POIT[i]}</th>\n`
    }
    list += `</tr>
            <tr>
                <td>ИСиТ</td>`
    for(let i=Math.floor(min/10); i<40 ;i++){
        list += `<th>${ISIT[i]}</th>\n`
    }
    list += `</tr>
            <tr>
                <td>ПОИБМС</td>`
    for(let i=Math.floor(min/10); i<40 ;i++){
        list += `<th>${POIBMS[i]}</th>\n`
    }
    list += `</tr>
            <tr>
                <td>ДЭиВИ</td>`
    for(let i=Math.floor(min/10); i<40 ;i++){
        list += `<th>${DEIVI[i]}</th>\n`
    }
    list +=`</tr></table>`
    list +=`</div>`
    //console.log(list)
    return list
}
