import code from './../static/CityCodes.js'

const fetchProfileByID = (userID) => {
    return fetch(`http://127.0.0.1:8000/chat/?user=${userID}`, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        },
        method: 'GET',
    })
        .then((response) => response.json());
}

const postDefaultProfile = (userID) => {
    return fetch(`http://127.0.0.1:8000/chat/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`
        },
        method: 'POST',
        body: JSON.stringify({
            user: userID
        })
    })
        .then((response) => response.json());
}

const updateStatus = (profileID, status, userID) => {
    return fetch(`http://127.0.0.1:8000/chat/${profileID}`, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        },
        method: 'PUT',
        body: JSON.stringify({
            user: userID,
            status: status,
            city: 'Welcome',
            activity: 'Welcome'
        })
    })
}

const get_city_weather = (city) => {
    const refrence = city.replace(' ', '_')
    const city_code = code[refrence]
    return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${city_code}&APPID=c8061a272e94644d77adf81c951a97b8&units=metric`)
        .then((response) => response.json())
}



export default {
    fetchProfileByID: fetchProfileByID,
    postDefaultProfile: postDefaultProfile,
    updateStatus: updateStatus,
    get_city_weather: get_city_weather,
}