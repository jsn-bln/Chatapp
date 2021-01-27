const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../Models/user')
const auth = require('../Middleware/auth')

router.post('/register', (req, res) => {
    User.findOne({$or:[{username: req.body.username},{ email: req.body.email}]}, async (err, data) => {
        if(err) return res.status(500).json({message: err.message})
        if(data){
            if(data.username === req.body.username) return res.status(400).json({message: 'username already taken'})
            if(data.email === req.body.email) return res.status(400).json({message: 'email already used'})
        } 
        
        if(!data){
            const [password1, password2] = [req.body.password, req.body.passwordcheck]
            if(password1 === password2){
                let hash = await bcrypt.hash(password1,10)
                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                }
                const user = new User(newUser)
                await user.save();
                res.status(201).json({message: 'user created!'})
            }else{
                return res.status(400).json({message: 'password did not match'})
            }
        }
        
    })
})
router.post('/login', (req, res) => {
    User.findOne({$or:[{username: req.body.user}, {email: req.body.user}]}, async (err, data) => {
        if(err) return res.status(500).json({message: err.message})
        if(!data) return res.status(400).json({message: 'username not found'})
        const unhash = await bcrypt.compare(req.body.password, data.password)
        if(!unhash) return res.status(400).json({message: 'password is incorrect'})
        res.status(200).json({message: `welcome ${data.username}`})
    })
})
router.get('/', auth, (req, res) => {
    const user = User.findById(req.user)
    res.json(user)
})




module.exports = router