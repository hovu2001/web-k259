const mongoose = require("../../common/database")();

const adSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String
        },
         link: { 
            type: String, 
            required: true 
        },
        image: { 
            type: String 
        }, 
        status: { 
            type: Boolean, 
            default: true 
        }, 
        type: { 
            type: String, 
            enum: ["slider", "banner"], 
            required: true }, 
        position: { 
            type: Number, 
            default: 1 
        },
        clickCount: { 
            type: Number, 
            default: 0 
        }, 

    }, { timestamps: true}
);
module.exports = mongoose.model("Advertisements",adSchema);
