var express=require('express');
var app=express();
const path=require('path');

app.use('/', express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
var port=Number(process.env.PORT || 3000);
app.listen(port);