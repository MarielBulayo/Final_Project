class Catalog{

    API_URL = 'https://fakestoreapi.com/products';
   constructor(){
       this.product_data = [];
       this.products = {};
       this.load_data_from_api();
       this.attach_event_handlers();
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

   render_catalog(){
       jQuery("#catalog").html("");
       for(let product of this.product_data){
           var {id, title, description, image, price} = product;

           let html = `<div class="col-sm-6 col-lg-4 mb-4">
           <div class="card">
             <img src="${image}" alt="${title}">

             <div class="card-body">
               <h5 class="card-title">${title}</h5>
               <p class="card-text">${description}</p>
               <button class = 'btn btn-success add-to-cart right' data-id="${id}">Add To Cart</button>
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
   }

   

   attach_event_handlers(){
       jQuery(".price").click( function(){
           console.log("product_id");
       });
       
       jQuery("#view-cart").click( function(){
           console.log("product_id");
       });
      
      }

   render_items_to_cart(){
       let cart_contents = "";
       var cart_items = get_cookie("shopping_cart_items");

       for(let product of cart_items){
           let product = this.get_product(product_id);

           cart_contents += `<div> ${product_id} = qty of ${cart_items[product_id]} </div>`;
       }

       jQuery("#shopping-cart-contents").html(cart_contents);
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




