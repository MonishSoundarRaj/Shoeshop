
document.querySelector(".fa-cart-custom").addEventListener("click", () => {
    window.location.href = "https://pacific-garden-66100.herokuapp.com/cart"
})

var numberOfCards = document.querySelectorAll(".men-shoe-card").length;
for (let i = 0; i < numberOfCards; i++) {
    document.querySelectorAll(".men-shoe-card")[i].addEventListener("click", () => {
        (async () => {
            const clickedProductID = await event.target.id
            console.log(clickedProductID)
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

var numberOfCards = document.querySelectorAll(".shoe-card").length;
for (let i = 0; i < numberOfCards; i++) {
    document.querySelectorAll(".shoe-card")[i].addEventListener("click", () => {
        (async () => {
            const clickedProductID = await event.target.id
            console.log(clickedProductID)
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
        fetch("/cart", options)
        // .then(response => {window.location.href = response.url}).catch(err => {console.log(err)});
    })();
})
