const fetchProfileByID = (userID) => {
    return fetch(`https://http://127.0.0.1:8000/chat/?user=${userID}`)
        .then((response) => response.json());
}

const addWine = (wineObject) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://${url}.herokuapp.com/wines/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(wineObject)
    })
}