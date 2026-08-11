/* Order API */

app.post("/order",(req,res)=>{

const order = req.body

fs.appendFile("orders.txt",JSON.stringify(order)+"\n",()=>{

res.json({message:"Order received"})

})

})