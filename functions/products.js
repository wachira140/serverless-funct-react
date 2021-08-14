require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appHDptSNxFHFSKSj')
  .table('products')
  
exports.handler = async(event,context, cb)=>{
  const {id} =event.queryStringParameters
if (id){
 try {
   const product =await airtable.retrieve(id)
   if(product.error){
     return {
       statusCode:404,
       body:`no product with id ${id}`
     }
   }
   return {
    statusCode:200,
    body:JSON.stringify(product)
  }
 } catch (error) {
 return {
       statusCode:500,
       body:'server error'
     }
 }
  
}
 try {
        const {records} = await airtable.list()
        const products = records.map((product)=>{
            console.log(product);
            const {id} =product;
            const {name,desc,image,price} =product.fields;
            const url = image[0].url;
            return {id,name,url,price}
        })
        return {
        statusCode:200,
        body:JSON.stringify(products),
    }
    } catch (error) {
         return {
        statusCode:500,
        body:'server error',
    }
    }
  
  
}