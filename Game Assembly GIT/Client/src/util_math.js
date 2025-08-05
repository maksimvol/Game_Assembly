import axios from "axios"

// API functions
// Adding Record
export const addMath = (newMath) => {
    return axios.post(`http://localhost:3001/maths`, newMath)
    
    .then(response => console.log(response.data))
    .catch((error) => {
        console.error('Error adding math:', error);
    })
}

// Getting Record
export const getMath = () => {
    return axios.get(`http://localhost:3001/maths`)
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
export const deleteMathById = (mathId) => {
    return axios.delete(`http://localhost:3001/maths/${mathId}`)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

// Getting Record by Id
export const getMathById = (mathId) => {
    return axios.get(`http://localhost:3001/maths/${mathId}`)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

// Updating Record by Id
export const updateMathById = (mathId, updatedMath) => {
    return axios.patch(`http://localhost:3001/maths/${mathId}`, updatedMath)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};