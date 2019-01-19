const mongoose = require('mongoose');
var Schema=mongoose.Schema;
var dataType=mongoose.Schema.Types;

const Truck = new Schema({
    truckReg:{
        type:dataType.String,unique:true
    },
    owner:{
        type:dataType.String
    },
    capacity:{
        type:Number,required:false
    },
    location:{
        type:dataType.Array,default:[]
    },
    otherInformation:{
        type:String,required:false
    },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports=mongoose.model('truck',Truck);