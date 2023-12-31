const {Schema, model} = require ("mongoose");

const dateFormat = require("../utils/dateFormat");
const ReactionSchema = require('./Reaction');
const thoughtSchema = new Schema ({

    thoughtText:{
        type:String,
        required:"Thought is required here",
        minlength:1,
        maxlength:280
    },
    createdAt:{

        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    username:{
        type:String,
        required:true
    },
    reactions: [ReactionSchema],
},
{

    toJSON:{
        getters: true
    },
    id: false,
}


);

thoughtSchema.virtual("reactionCount").get(function(){

    return this.reactions.length;
});

const Thought = model("Thought" , thoughtSchema);

module.exports = Thought;







