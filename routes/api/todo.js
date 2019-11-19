import express from 'express';
import {MySQlWrapper}  from "../../db";
import  {responseHelper, logger}  from '../../app/common';

export class TodoRoutes {

    constructor(strategy){
        this.strategy = strategy;
        this.router = express.Router();
        this.sqlWrapper = new MySQlWrapper();
        this.logger = new logger();
        this.responsehelper = new responseHelper;
    }

    routes(){
        this.router.get('/',this.strategy.authenticate('bearer',{session:true}),(req,res) => {
            res.send({toods:'check'});
        });
        return this.router
    }
}