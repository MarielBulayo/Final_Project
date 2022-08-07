class Catalog{
	API_URL = 'https://fakestoreapi.com/products';
 	
	CURRENCY_API = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad.json';

	constructor(){
		this.currency = {};
		this.product_data = [];
		this.products = {};
		this.load_data_from_api();	


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
           
           			
            });     
	}



	get_date(currentDate){
		currentDate = new Date();
		let day = currentDate.getDate();
		let month = currentDate.getMonth() + 1;
		let year = currentDate.getFullYear();
		let today = new Date().toISOString().split('T');
		let date_today = today[0];
		return date_today;
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
		for(let product_id in cart_items){
			let product = this.get_product(product_id);
            let quantity =  cart_items[product_id];
            let item_total = parseInt(product.price * quantity);
          
            cart_content += `<tbody class = "table-body">
							    <tr>
							      <th scope="row"><i class="bi bi-trash3-fill delete"></i></th>
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

         
		
                 
	}
	

	confirm_order(){
		let order = cart();
		jQuery("#confirm_order").html(order);
	}



   attach_event_handlers(){
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
    });
   }


 clear_cart(){
 	set_cookie("shopping_cart_items", {});
 	let cart_items = get_cookie("shopping_cart_items");
	jQuery(".table-body").html(cart_items);
	console.log(cart_items);
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


/**checks string value*/
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

		/**Month**/
		let cardmonth = $("#ccmonth").val();
		let month = today.getMonth()+1;
		let expMonth = parseInt(cardmonth);


		if(expYear == year){
			$("#ccyear").addClass("is-valid");
			$("#ccyear").removeClass("is-invalid");
			if(month <= expMonth){
				$("#ccmonth").addClass("is-valid");
				$("#ccmonth").removeClass("is-invalid");
			}else{
				$("#ccmonth").addClass("is-invalid");
				$("#ccmonth").removeClass("is-valid");
			}
		} else if (expYear > year){
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

		let cvv = $("#cvv").val();
        let cvvID = $("#cvv");
		let cvv_pattern = /^[0-9]{3,4}$/;
        regex(cvv, cvv_pattern, cvvID,);

        if(cvv.hasClass("is-invalid")){
            $("#billing-details").show();
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
	

		let email_pattern  = /^\S+@\S+$/;
		let email_regex = new RegExp(email_pattern);

		if(!email_regex.test(email)){
			$("#email").addClass("is-invalid");
		
		}else{
			$("#email").addClass("is-valid");
			$("#email").removeClass("is-invalid");
		}


		let addr = $("#addr").val();
		let addressID = document.querySelector("#addr");
		validate(addr, addressID);

		if($(!fNameID).hasClass("is-invalid") ||
			$(!lNameID).hasClass("is-invalid")){
			$("#billing-details").hide();
			$("#shipping-details").show();
		}

		
});

/**shipping checkbox*/

let checkbox = document.querySelector("#shipping-checkbox");
if (checkbox.checked) {
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
			let email_regex = new RegExp(email_pattern);

			if(!email_regex.test(shipping_email)){
				$("#email-shipping").addClass("is-invalid");
			
			}else{
				$("#email-shipping").addClass("is-valid");
				$("#email-shipping").removeClass("is-invalid");
			}
		});
    }
});

	








