// Write your solutions below

var count = 0;


var jsonfile = require('jsonfile');

//Refactor your program so that you can use a second (or any) set of json data.
//Write your program so that the arugment can take in enough data to create a new item in the array (for either set of data).

var file = process.argv.splice(2);

file.forEach( file => {

jsonfile.readFile(file, function(err, obj) {

  console.log(file, obj);


//Go through the items and find all results that have kind of shopping#product. Print the count of these results.

var shoppingProducts = [];

for (var i = 0; i < obj.items.length; i++) {
  if (obj.items[i].kind === "shopping#product") {
    shoppingProducts.push(obj.items[i].kind);
    count++;
  }
};



//Save the title of all items with a backorder availability in inventories.

  var availBackOrder = [];

for (var i=0;i<obj.items.length;i++) {
  if (obj.items[i].product.inventories[0].availability === "backorder") {
    availBackOrder.push(obj.items[i].product.title);
  }
};


//Save the title of all items with more than one image link.

  var imagesMoreThanOne = [];

    for (var i=0;i<obj.items.length;i++) {
      if (obj.items[i].product.images.length > 1) {
        imagesMoreThanOne.push(obj.items[i].product.title);
      }
    }


//Save all "Canon" products in the items (careful with case sensitivity).

  var canonProds = [];

    for (var i=0;i<obj.items.length;i++) {
      if (obj.items[i].product.brand === "Canon") {
        canonProds.push(obj.items[i].product.title);
      }
    }


//Save all items that have an author name of "eBay" and are brand "Canon".


 var authorNames = [];

    for (var i=0;i<obj.items.length;i++) {
      if (obj.items[i].product.author.name.includes("eBay") && obj.items[i].product.brand === "Canon" ) {
        authorNames.push(obj.items[i].product.title);
      }
    }


//Save all the products with their brand, price, and an image link

  var allProdsBrands = [];


  for (var i=0;i<obj.items.length;i++) {

    allProdsBrands.push({
      "Brand": obj.items[i].product.brand,
      "Price": obj.items[i].product.inventories[0].price,
      "Image Link": obj.items[i].product.images[0]
      })
  };


       var resultFile = 'result.json'

        var result = {
                  "count": count,
                  "availableBackorders": availBackOrder,
                  "moreThanOneImage": imagesMoreThanOne,
                  "canonProducts": canonProds,
                  "authorNames": authorNames,
                  "allProducts": allProdsBrands
                };

    // result["count"] = count;
    // result["Available Backorders"] = availBackOrder;
    // result["More than one image"] = imagesMoreThanOne;

    jsonfile.writeFile(resultFile, result, function (err) {

      // console.error(err);


// Extra 1: Modify your program so that it will take 2 arguments on the command line, and output associated value from the saved results.json.

// For example, for deliverable #2 above -- "Save the title of all items with a backorder availability in inventories." -- you might have stored that result under a key called: titleBackorderInventories.

// So now, if you ran node google-shopping.js getkey titleBackorderInventories, you should see the result being output to Terminal.


    var output;

    for (var i=3; i<process.argv.length;i++){

      process.argv.forEach(key => {
        output = result[key];
    })
    };
    console.log(output);

});

});
});


