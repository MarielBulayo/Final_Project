class Catalog{

    API_URL = 'https://fakestoreapi.com/products';
   constructor(){
       this.product_data = [];
       this.products = {};
       this.load_data_from_api();
       
       
   }

   load_data_from_api(){
       fetch(this.API_URL)
           .then(res=>res.json())
           .then(json=>{
               this.product_data = json;
         

               for(let product of json){
                   let product_id = product.id;
                   this.products[product_id] = product;
               }

               this.render_catalog();
           });
   }

    get_product(product_id){
          for(let this_product of this.produce[data]){
              if (this_product.id == product_id){
                  return ths_product;
              }
          }
      }

   render_catalog(){
       jQuery("#catalog").html("");
       for(let product of this.product_data){
           let {id, title, description, image, price} = product;

           let html = `<div class="col-sm-6 col-lg-4 mb-4">
           <div class="card">
             <img src="${image}" alt="${title}">

             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">${description}</p>
               <button class = 'btn btn-success add-to-cart-button right' data-id="${id}">Add To Cart</button>
               <p class="price">${price}</p>          
             </div>
           </div>
         </div>`;
         jQuery(html).appendTo("#catalog");
       }

         let catalog_container = document.getElementById("catalog"); // assuming your target is <div class='row' id='catalog'>
       
       jQuery(catalog_container).imagesLoaded( function() {
       var msnry = new Masonry(catalog_container); // this initializes the masonry container AFTER the product images are loaded
           msnry.layout();
       });


       jQuery(".add-to-cart-button").click(function() {
       // get the product id from a data attribute of the button that looks like this:
       // Add To Cart        
       var product_id = jQuery(this).attr("data-id"); 
       var cart_items = get_cookie("shopping_cart_items"); // get the data stored as a "cookie"
       
       // initialize the cart items if it returns null
       if (cart_items === null) {
           cart_items = {};
       }
   
       // make sure the object is defined;
       if (cart_items[product_id] === undefined) {
           cart_items[product_id] = 0;
       }
   
       cart_items[product_id]++;
       
       set_cookie("shopping_cart_items", cart_items); // setting the cart items back to the "cookie" storage
       console.log(cart_items);

   });
   jQuery("#view-cart").click( function(){
       let cart_contents = "";
       var cart_items = get_cookie("shopping_cart_items");

       for(let product in cart_items){
           let product = this.get_product(product_id);
           
           cart_contents += `<div> ${product_id} = qty of ${cart_items[product_id]} </div>`;
       }

       jQuery("#shopping-cart-contents").html(cart_contents);
   });
      

   }

   

   

   
       

}

let catalog = new Catalog();



/**Payment Method **/

$("#checkout-btn").click(function(){
   $("#payment-method").show();
});


$("#pay").click(function(){
   $("#payment-method").show();
   $("#billing-details").hide();
   $("#shipping-details").hide();
   $("#confirm-order").hide();
});

$("#bill").click(function(){
   $("#payment-method").hide();
   $("#billing-details").show();
   $("#shipping-details").hide();
   $("#confirm-order").hide();
});


$("#ship").click(function(){
   $("#payment-method").hide();
   $("#billing-details").hide();
   $("#confirm-order").hide();
   $("#shipping-details").show();
});

$("#order").click(function(){
   $("#payment-method").hide();
   $("#billing-details").hide();
   $("#shipping-details").hide();
   $("#confirm-order").show();
});


/**Validate Credit Card**/
function validate(value, id){

   if(value == "" || value == undefined){
           $(id).addClass("is-invalid");
           $(id).removeClass("is-valid");
;
   }else{
           $(id).addClass("is-valid");
           $(id).removeClass("is-invalid");
   }
}

$("#payment-continue").click(function(){
       /**Name**/
       let name = $("#name").val();
       let nameID = document.querySelector("#name");
       validate(name, nameID);

       /**Card**/
       let cardNum = $("ccnumber").val();
       let cardID = document.querySelector("#ccnumber");
       
       validate(cardNum, cardID);
       console.log(cardNum);
       

       /**year**/
       let today = new Date();

       let cardyear = $("#ccyear").val();
       let expYear = parseInt(cardyear);
       let year = today.getFullYear();

       /**Month**/
       let cardmonth = $("#ccmonth").val();
       let month = today.getMonth();
       let expMonth = parseInt(cardmonth);


       if(expYear >= year && expMonth >= month ){
           $("#ccyear").addClass("is-valid");
           $("#ccyear").removeClass("is-invalid");

           $("#ccmonth").addClass("is-valid");
           $("#ccmonth").removeClass("is-invalid");
       }else{
           $("#ccyear").addClass("is-invalid");
           $("#ccyear").removeClass("is-valid");

           $("#ccmonth").addClass("is-invalid");
           $("#ccmonth").removeClass("is-valid");
       }

       if(!name.hasClass("is-invalid") ||
           !cardID.hasClass("is-invalid")){
           $("#billing-details").show();
           $("#payment-method").hide();
       }
       
   

});


$("#billing-continue").click(function(){

       let first_name = $("#first-name").val();
       let fNameID = document.querySelector("#first-name");
       validate(first_name, fNameID);

       let last_name = $("#last-name").val();
       let lNameID = document.querySelector("#last-name");
       validate(last_name, lNameID);

       let email = $("#email").val();
       let emailID = document.querySelector("#email");
       validate(email, emailID);

       let addr = $("#addr").val();
       let addressID = document.querySelector("#addr");
       validate(addr, addressID);

       if(!fNameID.hasClass("is-invalid") ||
           !lNameID.hasClass("is-invalid")){
           $("#billing-details").hide();
           $("#shipping-details").show();
       }

       
});

/**shipping checkbox*/

let checkbox = document.querySelector("#shipping-checkbox");

checkbox.addEventListener("change", function(e) {
   if (checkbox.checked) {
       $("#shipping-information").hide();
   } else {
       $("#shipping-information").show();
   }
});




