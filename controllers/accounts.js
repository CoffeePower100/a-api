const express = require('express');
const router  = express.Router();

const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const usersPassArr = []

router.post('/createUser', async (req, res)=>{
    console.log(usersPassArr);
    const newUser = req.body
    // if new user's mail is already used:
    if (newUser.user != "" && newUser.pass != "" && newUser.email != "")
    {
        if ('undefined' != typeof(usersPassArr.find(user => newUser.email == user.email)))
        {
            return res.status(200).json({
                message: 'Error: given email is already used'
            });
        }
        else
        {
            newUser.pass = await bcryptjs.hash(newUser.pass, 10);
            usersPassArr.push(newUser);
            console.log(usersPassArr);
            return res.status(200).json(usersPassArr);
        }
    }
    else
    {
        return res.status(200).json({
            message: "Error: user name, password and email must be filled."
        })
    }
})


router.get('/sayHello', (req, res)=>{
    return res.status(200).json({
        message: 'Say hello from API route'
    });
})

router.post('/sayHello', (req,res) => {
    const {token}  = req.body

    const data = jsonwebtoken.verify(token, "!");
    return res.status(200).json({
        message: data
    });
})

router.post('/login', async(req,res) => {
    const {email, pass} = req.body;

    let isUserFound = false;
    let userName = "";
    let userPass = "";

    if (email == "" || pass == "")
    {
        return res.status(200).json({
            message: "Error: email and password must be filled"
        });
    }

    for (let currUser of usersPassArr)
    {
        if (email == currUser.email)
        {
            isUserFound = true;
            userName = currUser.user;
            userPass = currUser.pass;
        }
    }

    if (false == isUserFound)
    {
        return res.status(200).json({
            message: `Error: user: ${email} doesn't exists.`
        });
    }
    else
    {
        if (await bcryptjs.compare(pass, userPass))
        {
            const newToken = await jsonwebtoken.sign(req.body, "!");
            return res.status(200).json({
                message: `Hello ${userName}.`,
                token: newToken
            });
        }
        else
        {
            return res.status(200).json({
                message: `Error: password doesn't match to given user.`
            });
        }
    }
})

// 15.03.22 - bcryptjs jsonwebtoken
/*
router.post('/login', async (req,res) => {
    const {email, pass} = req.body;

    let isUserFound = false;
    let userName = "";
    let userPass = "";

    const hash_password = await bcryptjs.hash(pass, 10);
    const isPassMatch = await bcryptjs.compare(pass, hash_password);

    const data = {
        id: 123533,
        firstName: "New",
        lastName: "User",
        email: "a@outlook.co.il",
        position: "Worker"
    };

    const token = await jsonwebtoken.sign(data, "!");
    return res.status(200).json({
    message: `${hash_password} ${isPassMatch}`,
    token: `${token}`
    });
});*/

module.exports = router;

//POST, Headers:Content-Type application/json, Body:Raw, {"full_name" : "User"}