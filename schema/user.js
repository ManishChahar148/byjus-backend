// category schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
	name:String,
	email:{type:String,unique:true},
	address : String,
    joiningDate: String,
    isDeleted: {type: Boolean, default:false}
});
export default mongoose.model('user',user);
