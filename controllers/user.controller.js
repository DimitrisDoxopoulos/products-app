const User = require('../models/user.model.js')

exports.findAll = async(req, res) => {
    console.log("Find all users")

    try {
        const result = await User.find()
        res.status(200).json({ status: true, data: result })
    } catch(err) {
        res.status(400).json({status: false, data: err}), 
        console.log("Ta kanes poutana")
    }
}


// With callbacks for older versions of mongoose

// exports.findAlll = function (req, res) {
//     console.log("Find all users")

//     User.find( (err, results) => {
//         if (err) {
//             res.status(400).json({status: false, data: err}), 
//             console.log("Ta kanes poutana")
//         } else {
//             res.status(200).json( {status : true, data: result} )
//         }
//     } )
// } 

exports.findOne = async(req, res) => {
    const username = req.params.username
    console.log ("Find user with username", username)
    try{
        const result = await User.findOne({username: username})
        res.status(200).json({ status: true, data: result })
    } catch (err) {
        res.status(400).json({status: false, data: err}), 
        console.log("Ta kanes poutana")
    }
}

exports.create = async(req, res) => {
        const newUser = new User({
        username: req.body.username, 
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.phone,
        products: req.body.products
    }) 

    console.log("Insert user with username: ", req.body.username);

    try{
        const result = await newUser.save()
        res.status(200).json({ status: true, data: result })
        console.log("Success in inserting user with username ", req.body.username)
    } catch(err) {
        res.status(400).json({status: false, data: err}), 
        console.log("Problem in inserting user with username: ", req.body.username)
    }
}

exports.update = async (req, res) => {
    const username = req.body.username
    console.log("Update User")

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        adress: req.body.address,
        phone: req.body.phone
    }

    try {
        const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true})
        res.status(200).json({ status: true, data: result })
        console.log("Success in updating user with username ", req.body.username)
    } catch (err) {
        res.status(400).json({status: false, data: err}), 
        console.log("Problem in updating user with username: ", req.body.username)
    }
}

    exports.delete = async (req, res) => {
        const username = req.params.username
        console.log("Delete user with username ", username)

        try{
            const result = await User.deleteOne({username : username})
            res.status(200).json({ status: true, data: result })
            console.log("Success in deleting user with username ", req.body.username)
        } catch (err) {
            res.status(400).json({status: false, data: err}), 
            console.log("Problem in deleting user with username: ", req.body.username)
        }
    }