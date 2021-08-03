
document.querySelector(".fa-cart-custom").addEventListener("click", () => {
    window.location.href = "http://localhost:3000/cart"
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
            fetch("/display", options).then(response => {window.location.href = response.url}).catch(err => {console.log(err)});
        })();
    })
}

