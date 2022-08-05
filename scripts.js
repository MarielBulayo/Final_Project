class Catalog{
    API_URL = "https://fakestoreapi.com/products";
    
    constructor(){
        this.product_data = [];
        this.products = {};
        this.load_product_from_api();
    }

    load_product_from_api(){
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                this.product_data = json;

                for(let product of json){
                    let product_id = product.id;
                    this.products[product_id] = product;
                }
            });

            this.render_catalog();
    }

    render_catalog(){
        jQuery("#catalog").html("");
        for (let product of this.product_data){
            let {id, title, description, image, price} = product;
            
            let html = `<div class = "col-sm-6 col-lg-4 mb-4"> 
            <div class = "card"> 
                <img src = "${image}" alt = "${title}">
                <div class = "card-body">
                <h5 class = "card-title>${title}</h5>
                <p class = "card-text">${description} </p>
                <p class = "price"> ${price}</p>
                <button class = " btn btn-success add-to-cart-button" data-id = "${id}">Add To Card </button>
            </div>
            </div>
            </div>`;
            
        jQuery(html).appendTo("#catalog")
        }

    }

    

  
}

let catalog = new Catalog;