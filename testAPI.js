const axios = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
const router = express.Router();
var bodyParser = require('body-parser');
const { response } = require("express");
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())


var API_TOKEN = "138d6fd192de0fcd2b425e2e23844698";
var SECRET_KEY ="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";
var DOMAIN = "kvslteststore1.myshopify.com";
var VERSION = "2021-01";
var MODULE = "products";

var PROD_DATA = [];
var PROD_DATA_ID;
var VAR_IDS = [];

var Post_Prod_Id ;
var Post_Meta_Id ;
var Post_Var_Id;



//Route for getting whole Store Data

app.get("/store", function (req, res) {
  let query = req.query.queryStr;
  console.log(req.query)
  let url = ''
 
if(req.query.hasOwnProperty('id')&& req.query.hasOwnProperty('var_id'))
      {
             url=`https://${API_TOKEN}:${SECRET_KEY}@${DOMAIN}/admin/api/${VERSION}/${MODULE}/${req.query.id}/variants/${req.query.var_id}/metafields.json`
      }

else if(req.query.hasOwnProperty('id'))
      {
            url=`https://${API_TOKEN}:${SECRET_KEY}@${DOMAIN}/admin/api/${VERSION}/${MODULE}/${req.query.id}/metafields.json`
      }
else 
      {
            url=`https://${API_TOKEN}:${SECRET_KEY}@${DOMAIN}/admin/api/${VERSION}/${MODULE}.json`  
      }
      
  axios({
    method: "get",
    url,
  })
    .then(function (response) {
      res.send(JSON.stringify(response.data));

      PROD_DATA = response.data.products;
      console.log( "testPointer",PROD_DATA)

    for(i = 0; i< PROD_DATA.length; i++)
      {
           for(j = 0; j< PROD_DATA[i].variants.length ; j++)
             {
                VAR_IDS= PROD_DATA[i].variants[j].id;
                var var_id = VAR_IDS;
                // console.log("pointer3", VAR_IDS )
            }
        }
      })
    .catch(function (error) {
      console.log(error);
    });
});



function updateData (body) {
  var putData = body.body;
  var Body_header = body.headers
  
  let url =''
    if(Body_header.hasOwnProperty('Variant_id')){
       url = `https://${API_TOKEN}:${SECRET_KEY}@${DOMAIN}/admin/api/${VERSION}/${MODULE}/${Post_Prod_Id}/variants/${Post_Var_Id}/metafields/${Post_Meta_Id}.json`
     }

     else {
        url = `https://${API_TOKEN}:${SECRET_KEY}@${DOMAIN}/admin/api/${VERSION}/${MODULE}/${Post_Prod_Id}/metafields/${Post_Meta_Id}.json`
     }


    axios.put( url, putData,{
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json'
            }
  })
  
  .then(response =>{
    console.log("Posted",response);
    // res.send('sucessfully posted to kvslteststore1')
})
.catch(error =>{
    console.log(error)
})
}



// Route for Posting the Changed MetaFields

app.post('/post', urlencodedParser, function (req, res) {
  res.send('sucessfully posted');
  console.log("newpointer" , req.body.headers);
  console.log("testpointer" , req.body.body);
  

  Post_Prod_Id = req.body.headers.Product_id;
  console.log("Product_id", Post_Prod_Id)

  Post_Meta_Id = req.body.headers.Metafield_id;
  console.log("Metafield_id", Post_Meta_Id )
  
  Post_Var_Id = req.body.headers.Variant_id;
  console.log("Variant_id", Post_Var_Id)

  // console.log(res)
  // res.render('/post',{data: req.body.body});
   updateData(req.body)

})

var server = app.listen(port, () => {
  console.log("APP IS RUNNING");
});
