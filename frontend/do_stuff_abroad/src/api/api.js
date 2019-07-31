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

const createProfile = (userID, city, activity, status) => {
    return fetch(`http://127.0.0.1:8000/chat/?user=${userID}`, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        },
        method: 'POST',
    })
        .then((response) => response.json());
}


export default {
    fetchProfileByID: fetchProfileByID,
    postDefaultProfile: postDefaultProfile
}