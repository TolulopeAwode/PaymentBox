const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize = require('sequelize');
// var Departments = require('../models/departments');
const BankContext  = require('../models').Bank;

module.exports={
    createBank,
    getallBanks
};
async function getallBanks(req, res){
    const banks =await BankContext.findAll();
    if(banks){
        res.send(_.map(banks,_.partialRight(_.pick, ['id','Name','Acronym','BankSplitCode'])));
    }
    else{res.status(404).send("No Bank was found...");}
}

async function createBank (req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {Name,Acronym,BankSplitCode}=req.body;   

    let bk = await BankContext.findOne({
        where: { 
            [sequelize.Op.and]:[
            {Acronym: Acronym},
            {Name: Name}
        ]
        }
    });

    if (bk) return res.status(400).send("Bank with similar configuration exists");
    let bank = new BankContext(_.pick(req.body, ['Name', 'Acronym','BankSplitCode']));
    const today = new Date();

    bank.updatedAt = today;
    bank.createdAt=today;
    await bank.save();
    res.send(_.pick(bank, ['id', 'Name', 'Acronym','BankSplitCode']));
}
function validate(req) {
	const schema = {
        Name: Joi.string().required(),
        Acronym: Joi.string().required(),
        BankSplitCode: Joi.string().required()
	};
	return Joi.validate(req, schema);
}