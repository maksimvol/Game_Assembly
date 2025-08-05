import axios from "axios"

// API functions
// Adding Record
export const addJackpot = (newJackpot) => {
    return axios.post(`http://localhost:3001/jackpots`, newJackpot)
    
    .then(response => console.log(response.data))
    .catch((error) => {
        console.error('Error adding jackpot:', error);
    })
}

// Getting Record
export const getJackpot = () => {
    return axios.get(`http://localhost:3001/jackpots`)
    .then(response => {
        console.log(response.data)
        if(response.status === 200) {            
            return response.data;
        } else {
            console.log("Can Not Get Data")
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

// Deleting Record by Id
export const deleteJackpotById = (jackpotId) => {
    return axios.delete(`http://localhost:3001/jackpots/${jackpotId}`)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}


// Getting Record by Id
export const getJackpotById = (jackpotId) => {
    return axios.get(`http://localhost:3001/jackpots/${jackpotId}`)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

// Updating Record by Id
export const updateJackpotById = (jackpotId, updatedJackpot) => {
    return axios.patch(`http://localhost:3001/jackpots/${jackpotId}`, updatedJackpot)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};