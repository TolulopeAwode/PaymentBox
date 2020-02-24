'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [{
      Name : 'United Bank for Africa UBA',
      Acronym:'UBA',
      BankSplitCode:'7',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'First Bank',
      Acronym:'First Bank',
      BankSplitCode:'8',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    } ,
    {
      Name : 'Guaranty Trust Bank',
      Acronym:'GTB',
      BankSplitCode:'10',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'Union Bank',
      Acronym:'Union Bank',
      BankSplitCode:'11',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'STANBIC IBTC',
      Acronym:'STANBIC IBTC',
      BankSplitCode:'17',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    }
    ,
    {
      Name : 'Access Bank',
      Acronym:'Access Bank',
      BankSplitCode:'31',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    } ,
    {
      Name : 'Ecobank',
      Acronym:'Ecobank',
      BankSplitCode:'47',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'Fidelity Bank',
      Acronym:'Fidelity Bank',
      BankSplitCode:'51',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'WEMA Bank',
      Acronym:'WEMA',
      BankSplitCode:'16',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'Access Bank (Diamond Bank)',
      Acronym:'Access Bank (Diamond Bank)',
      BankSplitCode:'72',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'First City Monument Bank',
      Acronym:'FCMB',
      BankSplitCode:'76',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'Zenith Bank',
      Acronym:'Zenith',
      BankSplitCode:'117',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    }
    ,
    {
      Name : 'Polaris Bank (SKYE Bank)',
      Acronym:'Polaris Bank',
      BankSplitCode:'120',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    } ,
    {
      Name : 'Sterling Bank',
      Acronym:'Sterling Bank',
      BankSplitCode:'121',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'CitiBank',
      Acronym:'CitiBank',
      BankSplitCode:'126',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      Name : 'Keystone Bank',
      Acronym:'Keystone',
      BankSplitCode:'123',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    }
    ,
    {
      Name : 'JAIZ Bank',
      Acronym:'JAIZ Bank',
      BankSplitCode:'261',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    }
    ,
    {
      Name : 'Heritage Bank',
      Acronym:'Heritage Bank',
      BankSplitCode:'307',
      IsEnabled:true,
      createdAt : new Date(),
      updatedAt : new Date(),
    }
  ], {});
},
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banks', [{
      Name : 'Heritage Bank'
    }])
  }
};
