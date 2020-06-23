const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/tasks",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`DATABASE::CONNECTED`);
}).catch(err => {
    console.log(err);
});
