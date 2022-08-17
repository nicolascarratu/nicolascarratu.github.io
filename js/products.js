let productsArray = [];

function showProductsList(array) {
    let htmlContentToAppend = "";
    
    for (let i = 0; i < array.products.length; i++) {
        let product = array.products[i];
        htmlContentToAppend += `
        <div onclick="setCatID(${array.catName})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name}</h4>
                        <small class="text-muted">${product.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("cars").innerHTML = htmlContentToAppend;
        
    }
    console.log(htmlContentToAppend)
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(LIST_url).then(function (resultObj) {
        console.log()
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);

        }
    })
})



