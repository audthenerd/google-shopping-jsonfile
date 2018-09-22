var jsonfile = require('jsonfile');

var file = 'products.json'

var result;



jsonfile.readFile(file, function(err, obj) {

  var items = obj.items;
  var brandName;
/*
 * example function called getItemsCount
 * input: accepts full item data
 * output: returns the length of the items array
 */
//function getItemsCount(itemData) {
//  return itemData.items.length;
// }

/*
 * Define and use your functions here
 */

 //1) Create a function called getItems that simply returns the items
 //array from the google product object.


var getItems = function (){

  result = items;

}

// output item count using the getItemsCount function
//console.log('Item Count: ' + getItemsCount(data));





//2) Create a function called getItemsByBrand that takes an item
//array returns a new array of all items of a specified brand.

var getItemsByBrand = function (brandName){

  result = [];

  for (var i=0; i<items.length; i++){
    if (items[i].product.brand === brandName ){
      result.push(items[i]);
    }
  } return result;
};




//3) Create a function called getItemsByAuthor that takes an item
//array and returns a new array of all items by a specified author.

var getItemsByAuthor = function (authorName){

result = [];

for (var i=0; i<items.length; i++){
  if (items[i].product.author.name.toLowerCase().includes(authorName) ){
    result.push(items[i]);
  }
}return result;
}




//4) Create function called getAvailableProducts that takes an item array
//and returns an array containing all of the available products
//(an available product is one with at least one availability of "inStock" in the inventories array)

var getAvailableProducts = function(){

  result = [];

  for (var i=0; i<items.length; i++){

    var allAvail = items[i].product.inventories[0].availability;

    if (allAvail.toLowerCase() === "instock"){
      result.push(items[i]);
    }
  } return result;
};




var getItemsCount = function (){
  result = items.length;
}



var getByCountry = function (countryName){
  result = [];
  for (var i=0;i<items.length; i++){
    if(items[i].product.country.toLowerCase().includes(countryName.toLowerCase())){
      result.push(items[i]);
    }
  } return result;
};



var getTotalPrice = function(){
  var totalPriceArr = [];
  var sum = 0;
  for (var i=0; i<items.length; i++){

    if(items[i].product.inventories[0].price !== null){
    totalPriceArr.push(items[i].product.inventories[0].price);
    sum += totalPriceArr[i];
  }
  } result = sum.toFixed(2);

}

var resultFile = 'results.json'
var output;

for (var i=2; i<process.argv.length; i++) {
  if (process.argv[2] === "getItems") {
    getItems();
  } else if (process.argv[2] === "getItemsCount") {
      getItemsCount();
  } else if (process.argv[2] === "getItemsByBrand") {
      process.argv.forEach (brandName => {
        getItemsByBrand(brandName);
      })
  } else if (process.argv[2] === "getItemsByAuthor") {
      process.argv.forEach(authorName => {
        getItemsByAuthor(authorName);
      })
  } else if (process.argv[2] ===  "getAvailableProducts") {
      getAvailableProducts();
  } else if (process.argv[2] === "getByCountry") {
      process.argv.forEach (countryName => {
        getByCountry(countryName);
      })
  } else if (process.argv[2] === "getTotalPrice") {
      getTotalPrice();
  }
};




jsonfile.writeFile(resultFile, result, function (err) {



  });

});






