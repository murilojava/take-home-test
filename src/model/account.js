module.exports = function (id){
    this.id = "";
    this.balance = 0;

    this.deposit = (amount) => {
        this.balance += amount;
    }

    this.withdraw = (amount) => {
        this.balance -= amount;
    }

    this.getBalance = () => {
        return this.balance;
    }

    this.toResponse = () => {
        return {
            id:this.id,
            balance:this.balance
        };
    }
}