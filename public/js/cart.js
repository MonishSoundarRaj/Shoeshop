document.querySelector(".cart-check-out-btn").addEventListener("click", () => {
    window.location.href = "https://pacific-garden-66100.herokuapp.com/address"
    // window.location.href = "http://localhost:3000/address"
})

const removeBtn = document.querySelectorAll(".cart-remove-btn").length
for(let i = 0; i < removeBtn; i++){
    document.querySelectorAll(".cart-remove-btn")[i].addEventListener("click", (e) => {
        var totalItems = JSON.parse(localStorage.getItem('customerCartList'))
        for(let i = 0; i < totalItems.length; i++){
            if(totalItems[i] == e.target.id){
                totalItems.splice(i, 1);
            }
            localStorage.setItem('customerCartList', JSON.stringify(totalItems))
        }
       (async () => {
            var data = {value: localStorage.getItem('customerCartList')}
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            }
            fetch("/cart", options).then(response => {window.location.href = response.url}).catch(err => {console.log(err)});
        })();
    })
}
