const Expansion = require('../models/expansion');
const Raid = require('../models/raid');
const wodButton = document.getElementById('#wod_box');
const expansionContainer = document.getElementById('expansion_container');

wodButton.addEventListener('click', () => {
    await Expansion.find({_id: "60def7d0663e912c30889433"}).populate('raids').sort('releaseDate');
})


expansionSearch = async() => {
    return await Expansion.findById(req.body.Expansion)
}

function byId(a, b) {
    return (a.ObjectId) - (b.ObjectId);
}