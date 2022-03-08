const express = require('express');
const router  = express.Router();

const usersPassArr = [
    {
        user: 'Bill Gates',
        pass: '123456',
        email: 'billgates@micro.com'
    },
    {
        user: 'Main User',
        pass: '111',
        email: 'digiMail@fastMail.com'
    }
]
router.get('/sayHello', (req, res)=>{
    return res.status(200).json({
        message: 'Say hello from API route'
    });
})

router.post('/sayHello', (req,res) => {
    const fname  = req.body.full_name;

    return res.status(200).json({
        message: `Hello ${fname} from API route`
    });
})

router.post('/login', (req,res) => {
    const {email, pass} = req.body;

    let isUserFound = false;
    let userName = "";
    let userPass = "";

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
        if (pass == userPass)
        {
            return res.status(200).json({
                message: `Hello ${userName}.`
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

module.exports = router;

//POST, Headers:Content-Type application/json, Body:Raw, {"full_name" : "User"}