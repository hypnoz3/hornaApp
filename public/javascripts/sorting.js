const Expansion = require('../models/expansion');
const wodButton = document.getElementById('wod_box');
const sortButton = document.getElementById('sort')




sortButton.addEventListener('click', () => {
 expansionSearch() 
})

const expansionSearch = Expansion.find({_id: "60dc58717404dd38d85c4307"}, (error, data) => {
    if(error) {
        console.log(error)
    }else {
        console.log(data)
    }
})


expansionSearch = async() => {
    return await Expansion.findById(req.body.Expansion)
}

function byId(a, b) {
    return (a.ObjectId) - (b.ObjectId);
}