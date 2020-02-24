const Joi= require("joi");
const _ = require('lodash');
const url = require('url');
const sequelize = require('sequelize');
const gen = require('../util/generatecode');
// var Departments = require('../models/departments');
const TransactionLogContext  = require('../models').TransactionLog;
const PaymentConfigurationContext  = require('../models').Paymentconfiguration;
const PayerContext  = require('../models').Payer;

module.exports={

    initiatePayment
};
// async function getallBanks(req, res){
//     const banks =await BankContext.findAll();
//     if(banks){
//         res.send(_.map(banks,_.partialRight(_.pick, ['id','Name','Acronym','BankSplitCode'])));
//     }
//     else{res.status(404).send("No Bank was found...");}
// }

async function initiatePayment (req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let payConfig = await PaymentConfigurationContext.findOne({
        where: { 
            PaymentCode: req.body.PaymentCode
        }
    });

    if (!payConfig) return res.status(400).send("Payment Configuration with the given paramenter does exist");
    let person = await PayerContext.findOne({where:{IdentityKey:req.body.PersonId}});
    let today =new Date();
    if(!person) {
        person =new PayerContext({IdentityKey:req.body.PersonId,FullName:req.body.FullName})
        person.createdAt =today;
        person.updatedAt =today;
        await person.save();
    }
   const transactionRef = gen.generateCode(20).toUpperCase();
   let transactionLog = new TransactionLogContext({TransactionRefNo:transactionRef,PayerId:person.id,ConfigurationId:payConfig.id});
   transactionLog.updatedAt = today;
   transactionLog.createdAt=today;
    await transactionLog.save();
    res.send({TransactionRefNo:transactionRef});
}
function validate(req) {
	const schema = {
        FullName: Joi.string().required(),
        PaymentCode: Joi.string().required(),
        PersonId: Joi.string().required()
	};
	return Joi.validate(req, schema);
}