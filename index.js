const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const path = require("path");
const favicon = require('serve-favicon')

const app = express();
mongoose.connect(" mongodb+srv://admin-brain:WQaK162@cluster0.k83rp.mongodb.net/shoedetailDB", { useUnifiedTopology: true, useNewUrlParser: true });

const shoeDetailSchema = new mongoose.Schema({
    shoeBrand: String,
    category: String,
    productId: String,
    availableSize: [String],
    name: String,
    price: String,
    img_display: String,
    img_cart: String
})
const UserAddress = new mongoose.Schema({
    customerDetails: {
        name: String,
        email: String,
        phone: Number,
        deliveryAddress: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
        zipcode: String
    }, 
    productOrdered: {
        idOfTheProducts: [String]
    }
}) 

const Shoe = new mongoose.model('shoe', shoeDetailSchema);
const User = new mongoose.model('user', UserAddress);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.set('view engine', 'ejs');
app.use(express.json({ limit: '1mb' }))

// app.route("/DB")
//     .get((req, res) => {
//        res.render('addtoDB');
//      })
//     .post((req, res) => {
//         const AddShoeDetails = new Shoe({
//             shoeBrand: req.body.brand,
//             category: req.body.category,
//             productId: req.body.productId,
//             availableSize: [req.body.size],
//             name: req.body.modelname,
//             price: req.body.price,
//             img_display: req.body.displaylink,
//             img_cart: req.body.cartlink
//         })
//         AddShoeDetails.save((err) => {
//             if (!err) {
//                 res.send("success")
//             } else {
//                 res.send("fialure")
//             }
//         })
//     })


app.get('', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 4);
    Shoe.find({ shoeBrand: "Nike" }, (err, foundItems) => {
        if (!err) {
            Shoe.find({ shoeBrand: "Adidas" }, (error, foundItems2) => {
                if (!error) {
                    res.render('index', { randomNumberNike: randomNumber, foundNikeShoes: foundItems, foundAdidasShoes: foundItems2 });
                } else {
                    res.send("failed to load the page !");
                }
            })
        } else {
            res.send("failed to load the page");
        }
    })
})

app.get("/men", (req, res) => {
    Shoe.find({ category: "men" }, async (err, foundItem) => {
        const foundItems = await foundItem
        if (foundItems.length === 0) {
            res.send("0 items found")
        } else {
            res.render('productpage', { found: foundItems })
        }
    })
})
app.get("/women", (req, res) => {
    Shoe.find({ category: "women" }, async (err, foundItem) => {
        const foundItems = await foundItem
        if (foundItems.length === 0) {
            res.send("0 items found")
        } else {
            res.render('productpage', { found: foundItems })
        }
    })
})
app.get("/kids", (req, res) => {
    Shoe.find({ category: "kids" }, async (err, foundItem) => {
        const foundItems = await foundItem
        if (foundItems.length === 0) {
            res.send("0 items found")
        } else {
            res.render('productpage', { found: foundItems })
        }
    })
})

var shoeArrayServer = [];

app.get('/cart', (req, res) => {
    var subTotal = 0;
    for(var i = 0; i < shoeArrayServer.length; i++){
        let prices = Number(shoeArrayServer[i].price.slice(1))
        subTotal = prices + subTotal;
    }
    let total = subTotal + 12 + 15;
   res.render("cart", { shoeArray: shoeArrayServer, total: total, subTotal: subTotal })
})


app.post("/cart", (req, res) => {
    shoeArrayServer = [];
    var convertingArray = JSON.parse(req.body.value);
    for(let i = 0; i < convertingArray.length; i++){
    Shoe.findOne({ _id : convertingArray[i]}, (err, cartitem) => {
        if(!err){
            shoeArrayServer.push(cartitem);
        }else{
            console.log(err);
        }
    })
  }
//    res.redirect('/cart');
})

var displayItem;
app.route('/display/:id')
    .get((req, res) => {
        res.render('display', {adidasShoeDisplay: displayItem})
    })
    .post((req, res) => {
        const id = req.params.id;
        Shoe.find({ _id : id}, (err, Itemsfound) => {
            displayItem = Itemsfound
            res.redirect("/display/" + id)
        })
    })
    
app.route('/address')
    .get((req, res) => {
        res.render('address')
    });

app.route("/search")
    .post((req, res) => {
        const searchTerm = _.capitalize(req.body.search)
        Shoe.find({ shoeBrand: searchTerm }, async (err, searchItems) => {
            const foundItems = await searchItems
            if (foundItems.length === 0) {
                res.render('notFound')
            } else {
                res.render('productpage', { found: foundItems })
            }
        })
    })

app.route("/user")
   .post((req, res) => {
       const addUser = new User({
        customerDetails: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            deliveryAddress: req.body.address,
            landmark: req.body.landmark || "did not enter",
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zipcode: req.body.zipcode
        }, 
        productOrdered: {
            idOfTheProducts: shoeArrayServer
        }  
       })
       addUser.save((err) => {
           if(!err){
        res.redirect("/payment")
       }
    else{
        console.log(err);
    }})
   })


app.get("/payment", (req, res) => {
    res.render("payment");
})
app.get("/underconstruction", (req, res) => {
    res.render('underConstruction');
})
app.post("/orderconfirmed", (req, res) => {
    res.render("confirmation")
})


app.listen(process.env.PORT||3000, () => {
    console.log("server is up and running in PORT 3000")
})




