class Catalog{

    API_URL = 'https://fakestoreapi.com/products';
   constructor(){
       this.product_data = [];
       this.products = {};
       this.load_data_from_api();
   }

   load_data_from_api(){
       fetch(API_URL)
           .then(res=>res.json())
           .then(json=>console.log(json));
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

       let address = $("#address").val();
       let addressID = document.querySelector("#address");
       validate(address, addressID);

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




