const Account = require('../model/account');

module.exports = function() {
    this.accounts = [];
    
    this.reset = () => {
        this.accounts = [];
        return {status:200, data:'OK'};
    }

    this.findAccount = (id) => {
        return this.accounts.find((account) => account.id === id);
    }

    this.balance = (params) => {
        const {account_id} = params;
        const account = this.findAccount(account_id);
        if(!account) return {status:404};

        return {status:200, data:account.getBalance()}
    }

    this.callEvent = (body) => {
        const {event} = body;

        const eventInstance = this[event];
        if(!eventInstance) {status:400}; 

        return eventInstance(body);
    }
    this.createAccount = (id) => {
        const account = new Account(id);
        this.accounts.push(account);
        return account;
    }

    this.events = {
        deposit:(body) => {
            const {destination, amount} = body;
            const account =  this.findAccount(destination) || this.createAccount(destination);
            
            account.deposit(amount);
            
            return {status:201, data:{destination: account.toResponse()}};
        },
        withdraw:(body) => {
            const {origin, amount} = body;
            
            const account = this.findAccount(origin);
            if(!account) return {status:404};
            
            account.withdraw(amount);
            
            return {status:201, data:{origin: account.toResponse()}};
        },
        
        transfer:(body) => {
            const {destination, origin, amount} = body;
            
            const accountOrigin = this.findAccount(origin);
            if(!accountOrigin) return {status:404};
            
            const accountDestination = this.findAccount(destination) || this.createAccount(destination);
            
            accountOrigin.withdraw(amount);
            accountDestination.deposit(amount);
            
            return {status:201, data:{origin:accountOrigin.toResponse(), destination:accountDestination.toResponse()}};
        }
    }
}