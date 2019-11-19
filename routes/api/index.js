import express from 'express';
import passport from 'passport';
import PassportConfig from '../../app/helpers/passport';
import {MySQlWrapper}  from "../../db";
import {} from 'dotenv/config';
import {UserDbHelper} from '../../db';
import AuthRoutes from './auth';
import {TodoRoutes} from './todo';
import reflectionRouter from './reflection';

let router = express.Router();
let mySqlWrapper = new MySQlWrapper();
let passportConfig = new PassportConfig(mySqlWrapper);
let userHelper = new UserDbHelper(mySqlWrapper); 

router.use(passport.initialize());
router.use(passport.session());

let strategy = passportConfig.SetStaregy();

let authRouter = new AuthRoutes(strategy,userHelper);
let todoRouter = new TodoRoutes(strategy);

router.get('/test', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

router.use('/', authRouter.routes());
router.use('/todo', todoRouter.routes());
router.use('/reflections', reflectionRouter);

module.exports = router;