const mongoose = require('mongoose')
const URL = 'mongodb+srv://lishikagoel:lishika05@atlascluster.1qsg4nw.mongodb.net/resumaid'

mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser:true})
const connection = mongoose.connection

connection.on('connected',()=>{
    console.log('Mongo Db connection successfull')
})

connection.on('error',(error)=>{
    console.log(error)
})