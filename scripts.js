class Catalog{
	API_URL = 'https://fakestoreapi.com/products';
	CURRENCY_API = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad.json';

	constructor(){
		this.currency = [];
        this.curr = {};
		this.product_data = [];
		this.products = {};
		this.load_data_from_api();
        this.total= "";	
        this.items = "";
        this.shipping_rate = 40.48;
	}

	load_data_from_api(){
		fetch(this.API_URL)
            .then(res=>res.json())
            .then(json=>{
            	this.product_data = json;
   
            	for(let product of this.product_data){
            		let product_id = product.id;
            		this.products[product_id] = product;
            	}
            	this.render_catalog(); 	
                this.fetch_currency();		
            });     
	}

	fetch_currency(){
        fetch(this.CURRENCY_API)
            .then(res=>res.json())
            .then(json=>{
            	this.currency = json;
                for(let val in this.currency.cad){
            		this.curr[val]= val;
            	}
            }); 
    }
	
	render_catalog(){
	    jQuery("#catalog").html("");
	    for(let product of this.product_data){
	        var {id, title, description, image, price} = product;

	        var html = `<div class="col-sm-6 col-lg-4 mb-4">
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
		this.attach_event_handlers();
}

 get_product(product_id){
		for(let product of this.product_data){
			if(product.id == product_id){
				return product
			}
		}
	}

cart(){
		var cart_items = get_cookie("shopping_cart_items");
		let cart_content= ` <table class="table" id="product-to-buy">
				   	 <thead>
					    <tr>
						  <th scope="col"></th>
					      <th scope="col">Product</th>
					      <th scope="col">Price</th>
					      <th scope="col">Quantity</th>
					      <th scope="col">Total</th>
					    </tr>
					 </thead>`;
		var total = 0;
        var contentID = 0;
		for(let product_id in cart_items){
			let product = this.get_product(product_id);
            let quantity =  cart_items[product_id];
            let item_total = parseInt(product.price * quantity);
          
            cart_content += `<tbody class = "table-body">
							    <tr>
							      <th scope="row"><i class="bi bi-trash3-fill delete" id ="${contentID}++" ></i></th>
							      <td>${product.title}</td>
							      <td>${product.price}</td>
							      <td>${quantity}</td>
							      <td>${item_total}</td>
							    </tr>`;
			total += item_total;
           	
        } 		
        	cart_content +=  ` <tr>
							    	<th> Total </th>
							    	<td></td>
							    	<td></td>
							    	<td></td>
							    	<td> ${total} </td>
							    </tr>
							    </tbody>`;
		  
         jQuery("#table-div").html(cart_content);
         jQuery("#products").html(cart_content);
         this.total = parseInt(total);
	}

   get_gst(province){        
      if (province == "ON"){
        return 13;
      }else if (province == "NS" || province == "NB"|| province == "NL"||province == "PE" ){
        return 15;
      }else{
        return 0.05;
      }
      
   }

   attach_event_handlers(){
    var count = 0;
    jQuery(".add-to-cart-button").click(function() {
        // get the product id from a data attribute of the button that looks like this:
        // Add To Cart  
       count++;    
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
        $("#cart-items").html(count);
    });    
   }

 clear_cart(){
    let count = 0;
 	set_cookie("shopping_cart_items", {});
 	let cart_items = get_cookie("shopping_cart_items");
	jQuery(".table-body").html(cart_items);
    $("#cart-items").html(count);
 }

}

let catalog = new Catalog();

$("#view-cart").click( function(){
    catalog.cart();

});

jQuery(".clear-btn").click( function(){
 	catalog.clear_cart();
    
});


/**Payment Method **/
$("#checkout-btn").click(function(){
	$("#payment-method").show();
	$("#confirm-order").hide();
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
	$("#place-order").show();
});


/**checks that input value is not blankgit*/
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
/**Regex funtion to validate input */
function regex(value, pattern, id){
    let new_regex = new RegExp(pattern);
    if(!new_regex.test(value)){
        $(id).addClass("is-invalid");
    
    }else{
        $(id).addClass("is-valid");
        $(id).removeClass("is-invalid");
    }

}

/**Validate Credit Card**/
$("#payment-continue").click(function(){
		/**Name**/
		let name = $("#name").val();
		let nameID = document.querySelector("#name");
		validate(name, nameID);

		/**Card**/
		let cardNum = $("#ccnumber").val();
		let cardID = document.querySelector("#ccnumber");
		let card_pattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
	    regex(cardNum, card_pattern, cardID,);
	
		
		let today = new Date();

        /**year**/
		let cardyear = $("#ccyear").val();
		let expYear = parseInt(cardyear);
		let year = today.getFullYear();
        let yearID = $("#ccyear");
		/**Month**/
		let cardmonth = $("#ccmonth").val();
		let month = today.getMonth()+1;
		let expMonth = parseInt(cardmonth);
        let monthID = $("#ccmonth");

		if(expYear == year){
			yearID.addClass("is-valid");
			yearID.removeClass("is-invalid");
			if(month <= expMonth){
				$(monthID).addClass("is-valid");
				$(monthID).removeClass("is-invalid");
			}else{
				$(monthID).addClass("is-invalid");
				$(monthID).removeClass("is-valid");
			}
		} else if (expYear > year){
			$(yearID).addClass("is-valid");
			$(yearID).removeClass("is-invalid");
            $(monthID).addClass("is-valid");
			$(monthID).removeClass("is-invalid");
		}else{
			$(yearID).addClass("is-invalid");
			$(yearID).removeClass("is-valid");
			$(monthID).addClass("is-invalid");
			$(monthID).removeClass("is-valid");
		}

		let cvv = $("#cvv").val();
        let cvvID = $("#cvv");
		let cvv_pattern = /^[0-9]{3,4}$/;
        regex(cvv, cvv_pattern, cvvID,);

        if($(cvvID).hasClass("is-valid") &&
            $(cardID).hasClass("is-valid") &&
            $(yearID).hasClass("is-valid") &&
            $(monthID).hasClass("is-valid")){
                $("#payment-method").hide();
                $("#billing-details").show();
        }	

});

/**when continue button in billing details is clicked */
$("#billing-continue").click(function(){

		let first_name = $("#first-name").val();
		let fNameID = document.querySelector("#first-name");
		validate(first_name, fNameID);

		let last_name = $("#last-name").val();
		let lNameID = document.querySelector("#last-name");
		validate(last_name, lNameID);

		let email = $("#email").val();
		let emailID = document.querySelector("#email");
		let email_pattern  = /^\S+@\S+$/;
        regex(email, email_pattern, emailID);

		let addr = $("#addr").val();
		let addressID = document.querySelector("#addr");
		validate(addr, addressID);

        let phone = $("#phone").val();
        let phone_pattern = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
        let phoneID = $("#phone");
        regex(phone, phone_pattern, phoneID);

        let zip = $("#zip").val();
        let zipID = $("#zip");
        let zip_pattern = /^(?:[ABCEGHJ-NPRSTVXY]\d[A-Z][ -]?\d[A-Z]\d)$/i;
        regex(zip, zip_pattern, zipID);

        let city = $("#city").val();
        let cityID = $("#city");
        validate(city, cityID);

		if($(fNameID).hasClass("is-valid") &&
			$(lNameID).hasClass("is-valid") &&
            $(emailID).hasClass("is-valid") &&
            $(addressID).hasClass("is-valid")){
                $("#billing-details").hide();
                $("#shipping-details").show();
		}

		
});

/**shipping checkbox*/
let checkbox = document.querySelector("#shipping-checkbox");


if (checkbox.checked) {
    $("#shipping-information").hide();

    $("#shipping-continue").click(function(){
        $("#shipping-details").hide();
        $("#confirm-order").show();
    });
}
checkbox.addEventListener("change", function(e) {
    if (checkbox.checked) {
        $("#shipping-information").hide();

        $("#shipping-continue").click(function(){
        	$("#shipping-details").hide();
        	$("#confirm-order").show();
        });
    } else {
    	$("#shipping-information").show();
    	$("#shipping-continue").click(function(){
			let shipName = $("#first-name-shipping").val();
			let shipNameID  = document.querySelector("#first-name-shipping");
			validate(shipName, shipNameID);

			let shipLastName = $("#last-name-shipping").val();
			let shipLastID  = document.querySelector("#last-name-shipping");
			validate(shipLastName, shipLastID);

			let shipping_email = $("#email-shipping").val();
			let email_pattern  = /^\S+@\S+$/;
			let shipping_emailID = $("#shipping-email");
            regex(shipping_email, email_pattern, shipping_emailID);
			
            let address = $("#address").val();
            let addressID = $("#addres");
            validate(address, addressID);

            let city_shipping = $("#city-shipping").val();
            let city_shippingID = $("#city-shipping");
            validate(city_shipping, city_shippingID);

            let zip_shipping = $("#zip-shipping").val();
            let zipID_shipping = $("#zip-shipping");
            let zip_pattern = /^(?:[ABCEGHJ-NPRSTVXY]\d[A-Z][ -]?\d[A-Z]\d)$/i;
            regex(zip_shipping, zip_pattern, zipID_shipping);

            if($(shipNameID).hasClass("is-valid") && $(shipLastID).hasClass("is-valid") && $(shippingEmailID).hasClass("is-valid")){
                $("#shipping-details").hide();
                $("#confirm-order").show();
            }
		});
    }
});


let prov = document.querySelector("#province");
prov.addEventListener('change', function(e){
    let province =$("#province").val();
    let tax = catalog.get_gst(province) * catalog.total;
    let grand_total = catalog.total + catalog.shipping_rate +tax;
    let html = `<table> 
                    <tr>
                    <th>Sub Total: </th>
                    <th></th>
                    <th>${catalog.total}</th>
                    </tr> 
                    <tr>
                    <th>Tax:</th>
                    <th></th>
                    <th>${tax}</th>
                    </tr> 
                    <tr>
                    <th>Shipping: </th>
                    <th></th>
                    <th>${catalog.shipping_rate}</th>
                    </tr> 
                    </tr> 
                    <tr>
                    <th>Total: </th>
                    <th></th>
                    <th>${grand_total}</th>
                    </tr>
                </table>`;
    $("#grand-total").html(html);
});


