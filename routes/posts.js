const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const postsRouter = require('../controllers/posts') 
const usersRouter = require('../controllers/users') 
const middleware = require('../middleware/authentication')

router.use(cors({withCredentials: true}));
router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN, XSRF-TOKEN, *"
      );
    next();
});

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json());
router.use(express.urlencoded({extended:true}));
router.use(express.json())
router.use(cookieParser())

//post routes
router.post('/post', postsRouter.postArticle)
router.get('/create', postsRouter.createArticle)
router.get('/read', postsRouter.getArticle)
router.get('/read/latest/:id', postsRouter.getLatest)
router.patch('/update/:id', postsRouter.updateArticle)
router.delete('/delete/:_id', postsRouter.deleteArticle)

//user routes
router.post('/register', usersRouter.createUser)
router.post('/login', middleware.userAuth)
router.get('/user', middleware.authCheck, usersRouter.getUser);
router.patch('/updateuser/:id', usersRouter.updateUser)
router.delete('/deleteuser/:id', usersRouter.deleteUser)
router.get('/clearcookie', middleware.deleteCookie)
router.get('/profile')

router.get('/token', middleware.tokenCheck)

router.get('/header', usersRouter.getHeaders)


//Authentication
//router.get('/login', postsRouter.toBackend)
//router.get('/auth', middleware.validation)

router.get('/*', (req, res) => {
    res.status(404).send('Error 404 - Not Found')
})


module.exports = router;