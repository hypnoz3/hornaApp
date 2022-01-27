const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classIconSchema = new Schema({
    url: String,
    filename: String
});
const roleIconSchema = new Schema({
    url: String,
    filename: String
});


const recruitmentSchema = new Schema({
   class: {
       name: string,
       classicon:[classIconSchema],
       

   }
});





module.exports = mongoose.model('Recruitment', recruitmentSchema);