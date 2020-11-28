let start = document.querySelector('#start')

start.addEventListener('click', currentWeatherRequest)

function currentWeatherRequest() {
    let city = document.querySelector('.city').value
    if (city == '') {
        city = 'Saratov'
    }

    let request = new XMLHttpRequest()
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city},ru&appid=38bd2a6dccee12ceb0fe1c7b9ecb81bd&lang=ru`)
    request.send()

    request.addEventListener('readystatechange', function () {

        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.responseText)
            viev(data)
            document.querySelector('.warning').innerHTML = ''
        } else {
            document.querySelector('.warning').innerHTML = 'Произошла ошибка! Проверьте корректность названия введенного вами города'
        }
    })
}




function viev(data) {
    console.log(data)
    document.querySelector('.city-out').textContent = data.name
    document.querySelector('.temperature').innerHTML = `Температура: ${Math.round(data.main.temp - 273)}  &deg;`
    document.querySelector('.temperature__felt').innerHTML = `Ощущается как: ${Math.round(data.main.feels_like - 273)}  &deg;`
    document.querySelector('.cloudy').textContent = data.weather[0]['description']
    document.querySelector('.wind_speed').textContent = `Скорость ветра: ${data.wind['speed']} м/с`
    document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
    document.querySelector('.humidity').innerHTML = `Влажность: ${data.main.humidity}%`
}