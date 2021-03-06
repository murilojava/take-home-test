const Account = require('../model/account');
const { param } = require('../routes/routes');

module.exports = function() {
    this.accounts = [];
    
    this.reset = () => {
        this.accounts = [];
        return {status:200, data:'OK'};
    }

    this.findAccount = (id) => {
        console.debug("findAccount: ", id)
        return this.accounts.find((account) => account.id == id);
    }

    this.balance = (params) => {
        console.debug("balance:params", params);
        const {account_id} = params;
        const account = this.findAccount(account_id);
        if(!account) return {status:404, data:"0"};
        console.debug("balance:account", account);
        
        return {status:200, data:`${account.getBalance()}`}
    }

    this.callEvent = (body) => {
        console.debug("callEvent:", body);
        const {type} = body;
        
        const eventInstance = this[type];
        if(eventInstance == undefined) return {status:400}; 

        return eventInstance(body);
    }

    this.createAccount = (id) => {
        const account = new Account(id);
        this.accounts.push(account);
        return account;
    }

    this.deposit = (body) => {
        console.debug("deposit:", body);
        
        const {destination, amount} = body;
        const account =  this.findAccount(destination) || this.createAccount(destination);
        
        account.deposit(amount);
        
        return {status:201, data:{destination: account.toResponse()}};
    } 

    this.withdraw = (body) => {
        console.debug("withdraw:", body);
        const {origin, amount} = body;
        
        const account = this.findAccount(origin);
        if(!account) return {status:404, data:"0"};
        
        account.withdraw(amount);
        
        return {status:201, data:{origin: account.toResponse()}};
    }
    
    this.transfer = (body) => {
        console.debug("transfer:", body);
        const {destination, origin, amount} = body;
        
        const accountOrigin = this.findAccount(origin);
        if(!accountOrigin) return {status:404, data:"0"};
        
        const accountDestination = this.findAccount(destination) || this.createAccount(destination);
        
        accountOrigin.withdraw(amount);
        accountDestination.deposit(amount);
        
        return {status:201, data:{origin:accountOrigin.toResponse(), destination:accountDestination.toResponse()}};
    }
    
}