const mongoose=require("mongoose");
const Listing =require("../models/listing.js")
const initData=require("./data.js")
console.log(initData.data);


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust_DataBase"
async function main(){
    await mongoose.connect(MONGO_URL);
}
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);

})

const initDB=  async () => {
    // await Listing.deleteMany({});
     await Listing.insertMany(initData.data);
     console.log("data was initialized");
}
initDB();



