import db from "mongoose";

//export the database connect function
export function dbConnect (url:string) {
    db.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},() => {
        console.log("Succesfully connected to Database")
    })
}