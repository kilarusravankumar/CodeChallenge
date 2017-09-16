var express=require('express');
var compression=require('compression');
var app=express();
const path=require('path');

app.use(compression());
app.use('/', express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
var port=Number(3000);
app.listen(port);