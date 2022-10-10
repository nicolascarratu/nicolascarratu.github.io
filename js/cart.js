let cart_url = CART_INFO_URL + '25801' + EXT_TYPE
let cant_unit = document.getElementById('cant_unit')
let cartArray = []

function mostrarCarrito(array) {
    let cart = array.articles[0]
    let HTMLtext = ''

    HTMLtext += `

<div class="row m-0">
    <div class="list-group">
        <div class="list-group-item">
            <div class="row d-flex align-items-center">
                <div class="col">
                    <img src='${cart.image}' alt='${cart.name}' class='w-50 rounded-3'>
                </div>
                <div class="col-2 ">
                    <p> ${cart.name}</p>
                </div>
                <div class="col-2">
                    <p> ${cart.currency} ${cart.unitCost}</p>
                </div>
                <div class="col-2">
                    <input type="number" class='w-50' id="cant_unit" value='1' min='1'>
                </div>
                  <div class="col-4">
                    <p id='subtotal'>  </p>
                </div>
            </div>
        </div>
    </div>
</div>`

    document.getElementById('carrito_id').innerHTML += HTMLtext

}
function subtotal(array) {
    let cart = array.articles[0]
    let result = 0
    result = cart.unitCost * document.getElementById('cant_unit').value
    document.getElementById('subtotal').innerHTML =  cart.currency + ' ' + result
}


document.addEventListener('DOMContentLoaded', function () {
    getJSONData(cart_url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data
            console.log(cartArray)
            mostrarCarrito(cartArray)
            subtotal(cartArray)
            document.getElementById('cant_unit').addEventListener('input', function () {
                subtotal(cartArray)
            })

        }
    }
    )

}
)

