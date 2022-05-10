const userpage = () => {
    fetch("http://localhost:5000/belstu_fit/userinfo/data", /*TODO link*/{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => {return response.json()})
        .then(result => {
            if(result.error === "noinfo"){
                console.log("Dura")
                window.location.href = '/belstu_fit/userinfo/add'
            }
            else {
                //console.log(result)
                document.getElementsByClassName("useraccount")[0].innerHTML = userData(result)
            }
        })
}

const userData = (jsonArr) => {
    //console.log(jsonArr)
    let json = jsonArr[0];
    console.log(json.name + " " + json.surname)
    let date = new Date(json.date_of_birth);
    console.log(date)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    //console.log( `${day}.${month+1}.${year}`)
    let list = ""
    list += `<div class="userinfo__data">
            <div class="userinfo__data__fio" style="font-size: 30px">${json.surname} ${json.name} ${json.middle_name}</div>            
            <div class="userinfo__data__birthday" style="font-size: 18px">День рождения: ${day}.${month+1}.${year}</div>            
            <div class="userinfo__data__address" style="font-size: 18px">Адрес: ${json.address}</div>            
            <div class="userinfo__data__mail" style="font-size: 18px">Почта: ${json.mail}</div>            
            <div class="userinfo__data__number" style="font-size: 18px">Номер телефона: ${json.number}</div>            
            </div>`
    list += `<div id="userinfo__marks">Баллы: `
    json.Users_marks.forEach(mark => {
        if(mark.math !== 0 || mark.phys !== 0 || mark.lang !== 0 || mark.att !== 0){
            if(mark.math !== 0){
                list += `<div className="userinfo__data__mail" style="font-size: 18px">Математика: ${mark.math}</div>`
            }
            if(mark.phys !== 0){
                list += `<div className="userinfo__data__mail" style="font-size: 18px">Физика: ${mark.phys}</div>`
            }
            if(mark.lang !== 0){
                list += `<div className="userinfo__data__mail" style="font-size: 18px">Русский/белорусский: ${mark.lang}</div>`
            }
            if(mark.att !== 0){
                list += `<div className="userinfo__data__mail" style="font-size: 18px">Аттестат: ${mark.att}</div>`
            }
        }
        else{
            list +=` не заполнено `
        }
        list += `</div>`
    })

    return list
}
userpage()