document.querySelector(".counter-display").innerHTML = JSON.parse(localStorage.getItem("customerCartList")).length;
document.querySelector(".fa-cart-custom").addEventListener("click", () => {
    (async () => {
        var data = {value: localStorage.getItem('customerCartList')}
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }
        fetch("/cart", options)
        // .then(response => {window.location.href = response.url}).catch(err => {console.log(err)});
    })();
})


var numberOfCards = document.querySelectorAll(".men-shoe-card-top").length;
for (let i = 0; i < numberOfCards; i++) {
    document.querySelectorAll(".men-shoe-card-top")[i].addEventListener("click", () => {
        (async () => {
            const clickedProductID = await event.target.id
            var data = {value: clickedProductID}
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            }
            fetch("/display/" + clickedProductID, options).then(response => {window.location.href = response.url}).catch(err => {console.log(err)});
        })();
    })
}

var numberOfCards = document.querySelectorAll(".card-top").length;
for (let i = 0; i < numberOfCards; i++) {
    document.querySelectorAll(".card-top")[i].addEventListener("click", () => {
        (async () => {
            const clickedProductID = await event.target.id
            var data = {value: clickedProductID}
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            }
            fetch("/display/" + clickedProductID, options).then(response => {window.location.href = response.url}).catch(err => {console.log(err)});
        })();
    })
}
 

document.querySelector(".display-product-buy-now").addEventListener("click", () => {
    var clickedShoeId = event.target.id;
    if(localStorage.getItem('customerCartList') == null){
        localStorage.setItem('customerCartList', '[]')
    }
    var old_data = JSON.parse(localStorage.getItem('customerCartList'))
    old_data.push(clickedShoeId)
    localStorage.setItem('customerCartList', JSON.stringify(old_data));
    document.querySelector(".counter-display").innerHTML = JSON.parse(localStorage.getItem("customerCartList")).length;
})

