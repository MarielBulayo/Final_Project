class Catalog{
	constructor(){

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
			$('#payment-continue').attr("disabled", "true");
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

		
		$("#billing-details").show();
		$("#payment-method").hide();
	

});


$("#billing-continue").click(function(){

		let name = $("#name").val();
		let nameID = document.querySelector("#name");
		validate(name, nameID);


		$("#billing-details").hide();
		$("#shiiping-details").show();
	

});