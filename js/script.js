let start = document.querySelector('#start')

start.addEventListener('click', discover)

function discover() {
    let city = document.querySelector('.city').value
    // console.log(city)

    let request = new XMLHttpRequest()

    request.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${city},ru&appid=38bd2a6dccee12ceb0fe1c7b9ecb81bd&lang=ru`)
    request.send()

    request.addEventListener('readystatechange', function () {

        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText)
            viev(data)
        }
    })
}




function viev(data) {
    console.log(data)

    document.querySelector('.city-out').textContent = data.name;
    document.querySelector('.temperature').innerHTML = `Температура: ${Math.round(data.main.temp - 273)}  &deg;`;
    document.querySelector('.cloudy').textContent = data.weather[0]['description'];
    document.querySelector('.wind_speed').textContent = `Скорость ветра: ${data.wind['speed']} м/с`
    //https://openweathermap.org/img/wn/02d@2x.png
    document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
}