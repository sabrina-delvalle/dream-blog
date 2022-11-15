require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');

const tokenCheck = (req, res) => {
    //console.log("cookie headers: ", req.headers.cookie)
    if(req.headers.cookie){
        let token = req.headers.cookie
        token = token.split('=')[1]
        console.log('token from token ', token)
        return res.status(200).json({token: token})
    }
    //res.send('done readed cooki').json({message: 'ok'})
    return res.json({message: 'ok'})
}

const deleteCookie = (req, res) => {
    return res.status(202).clearCookie('Token').send('clear cookie, done.')
}

//this cookie dont
const basicCookie = async (req, res) => {
    res.status(202).cookie('Name', 'Sabri', {
        SameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 200 * 1000),
        httpOnly: false
        //secure: true
    }).send('initialised')
}

const userAuth = async (req, res) => {
    try{
        console.log('body of the request: ', req.body)
        const user = await User.findOne({ username: req.body.username });
        console.log('user found: ', user);
        if(user && bcrypt.compareSync(req.body.password, user.password)){
            var token = jwt.sign({ 
                                    username: req.body.username,
                                }, process.env.SECRET_KEY, { expiresIn: process.env.EXP_TIME });
            console.log('generated token: ', token)
            //set cookie
            const setCookie = {
                sameSite: 'strict',
                path: '/',
                expires: new Date(new Date().getTime() + 100 * 1000),
                httpOnly: true
                //secure: true
            }
            return res.status(202).cookie("Token", token, setCookie).send('initialized cookie')
        }
    }catch(err){
        res.status(400).send(err)
    }
    console.log('wrong user')
    res.status(200).send('invalid user or password')
}

const authCheck = async (req, res, next) => {    //REMEMBER ADDING NEXT
    console.log('no header auth')
    if (!req.headers['authorization']) return res.status(400).send('not available to access.')
    console.log(req.headers)
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, function(err, user) {
        if (err) return res.json({Message: err})
        res.user = user
        console.log('validated user: ', user)
        next();
      });
}

const validation = (req, res, next) => {
    if(req.user) next()
}

module.exports = { userAuth, authCheck, validation, basicCookie, tokenCheck, deleteCookie }