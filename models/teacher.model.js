const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      // minlength: 3,
      // maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      // minlength: 3,
      // maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Bitte eine richtige Email eintragen",
      ],
    },
    
    modules:[
      {
        classes:  
            {
              type: Schema.Types.ObjectId,
              ref: "Classes",
              required: false,
            },
          
          subjects:  
            {
              type: Schema.Types.ObjectId,
              ref: "Subject",
              required: false,
            },
            
          
      }
    ],
    // classes: [ 
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Classes",
    //     required: false,
    //   },
    // ],
    // subjects: [ 
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Subject",
    //     required: false,
    //   },
    // ],
    
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema,"teachers");
module.exports = Teacher;
