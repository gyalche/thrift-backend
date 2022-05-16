import mongoose from 'mongoose';

const connection_url="mongodb+srv://agile:agile@cluster0.jsv9c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
     useNewUrlParser: true,
     useUnifiedTopology : true
}).then((data) => {
    console.log(`mongodb is connected at ${data.connection.host}`)
})

