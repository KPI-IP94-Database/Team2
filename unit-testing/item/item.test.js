const Item = require('./item');

const iphone = new Item('12312313', 'Iphone 11 Pro', 25000 ,0.25,'new', 0)

test('Name must contain from 3 to 15 symbols', () =>{
    expect(iphone.checkNameLength()).toBe(true)
})

test('Price must be at least 1 hrn', () => {
    expect(iphone.checkPrice()).toBe(true)
})

test('After making purchase quantity of item must be reduce at 1 point', () => {
    expect(iphone.makePurchase(10)).toBe(false)
})

test('Items must be on the stocks to be available', () =>{
    expect(iphone.checkInStock()).toBe(false)
})

test('Check items in stock after purchase equals stock', () => {
    iphone.makePurchase(10);
    expect(iphone.checkInStock()).toBe(false);
});

test('Check items in stock after purchase more than stock', () => {
    iphone.makePurchase(15);
    expect(iphone.checkInStock()).toBe(false);
});

test('Calculate delivery of item with big weight', () =>{
    iphone.weight = 100;
    expect(iphone.calculateDelivery()).toBe(1080)
})

test('Wholesale discount must be a percent of numbers of items you ordered, but not more then 40% ', () =>{
    expect(iphone.wholesaleDiscount(100)).toBe(1500000)
})