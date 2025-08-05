import axios from "axios"

// API functions
// Adding Record
export const addUser = (newUser) => {
    return axios.post(`http://localhost:3001/users`, newUser)
    
    .then(response => console.log(response.data))
    .catch((error) => {
        console.error('Error adding user:', error);
    })
}

// Getting Record
export const getUsers = () => {
    return axios.get(`http://localhost:3001/users`)
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
export const getUserById = (userId) => {
    return axios.get('http://localhost:3001/users/'+userId)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

// Deleting Record by Id
export const deleteUserById = (userId) => {
    return axios.delete(`http://localhost:3001/users/${userId}`)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

// Deleting All Records
export const DeleteAllUsers = () => {
    return axios.delete(`http://localhost:3001/users`)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
}

// Updating Record by Id
export const updateUserById = (userId, updatedUser) => {
    return axios.patch(`http://localhost:3001/users/${userId}`, updatedUser)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};