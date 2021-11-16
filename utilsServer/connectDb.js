const mongoose =  require ("mongoose");

async await connect() {  //tutor session
    try {
    await useNewParser: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false
    });
    console.log ("Mongodb connected!");
} catch (error) {
    console.log (error);
    process.exit (1);
}


}

module.exports = connectDB;