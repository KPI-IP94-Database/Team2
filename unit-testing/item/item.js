class Item{
    constructor(id, name, price, weight, condition, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.weight = weight;
        this.condition = condition;
        this.quantity = quantity;
    }

    checkNameLength() {
        return (this.name.length > 3 && this.name.length <= 15);
    }

    checkPrice(){
        return this.price > 0;
    }

    makePurchase(num){
        if (this.quentity > 0) {
            this.quentity -= num;
            return this.quentity;
        } else return false
    }

    checkInStock() {
         return this.quentity > 0;
    }

    calculateDelivery(){
        let value;
        if( this.weight <= 20){
            value = 40 + (this.price / 100 * 2)
        } else if (this.weight > 20){
            value = 80 + (this.price / 100 * 4)
        }
        return value;
    }

    wholesaleDiscount(num){
        let value;
        if(num => 10){
            let discount = num / 2;
            if(discount <= 40){
                value = this.price * num - (((this.price * num) / 100) * discount)
            } else value = this.price * num - ((this.price * num / 100) * 40)
        }
        return value
    }
}


module.exports = Item;
