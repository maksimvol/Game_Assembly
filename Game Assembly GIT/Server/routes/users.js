const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
    try {
        // Find Maximum User Id
                const maxId = await User.findOne().sort({ userId: -1 })
                let newUserId = 1
                if (maxId && maxId.userId) {
                    newUserId = maxId.userId + 1
                }
        // Check if System Id exists
        const existingUserId = await User.findOne({ userId: req.body.userId})
        if(existingUserId && req.body.userId >= 0) {
            // Can add negative system Id for future sorting
            return res.status(400).json({ message: 'System Id Already exists!'})
        }
        // Check if User Name exists
        const existingUserName = await User.findOne({ username: req.body.username })
        if (existingUserName && existingUserName.username.toLowerCase() === req.body.username.toLowerCase()) {
            return res.status(400).json({ message: 'User Name Already exists!' })
        }

        const user = new User({
            username: req.body.username,
            userId: newUserId,
            password: req.body.password,
            role: req.body.role

        })
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

module.exports = router