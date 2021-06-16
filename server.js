const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const authRoute = require('./Routes/auth')
const fileRoute = require('./Routes/file')
const userRoute = require('./Routes/user')
const path = require('path')

const routeS = require('./route')
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');

const app = express();
const URI = 'mongodb+srv://prachi:prachi123@prachi-324ca.mongodb.net/bigdata?retryWrites=true&w=majority'

app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());
// app.use('/', route);
app.use('/api', authRoute);
app.use('/api', fileRoute);
app.use('/api', userRoute);

// app.use('/api', routeS);
console.log(process.env.MONGODB_URI);
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true }).then(()=> {
    console.log('Mongodb connected')
}).catch(err=> console.log(err))



const port = process.env.PORT || 3030;
if(process.env.NODE_ENV === 'production' ||  process.env.NODE_ENV === 'staging'){
    app.use(express.static('client/build'))

    app.get('*', (req, res)=> {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    })
}
app.listen(port, ()=> {
    console.log(`server running on ${port}`)
});   