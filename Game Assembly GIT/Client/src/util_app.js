import axios from "axios"

// API functions
// Adding Record
export const addApp = (newApp) => {
    return axios.post(`http://localhost:3001/apps`, newApp)
    
    .then(response => console.log(response.data))
    .catch((error) => {
        console.error('Error adding app:', error);
    })
}

// Getting Record
export const getApp = () => {
    return axios.get(`http://localhost:3001/apps`)
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

// Getting Record by Id
export const getAppById = (appId) => {
    return axios.get(`http://localhost:3001/apps/${appId}`)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

// Deleting Record by Id
export const deleteAppById = (appId) => {
    return axios.delete(`http://localhost:3001/apps/${appId}`)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

// Updating Record by Id
export const updateAppById = (appId, updatedApp) => {
    return axios.patch(`http://localhost:3001/apps/${appId}`, updatedApp)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};