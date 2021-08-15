import React, {useState , useEffect} from 'react'
import axios from 'axios'
import StoreData from './StoreData'

function Data(props) {

    const [Prod_Data , newProd_Data] = useState([])
    // const [Meta_ID , newMeta_ID] = useState('')
    console.log("jay", props)
   

    useEffect(() => {
        axios.get('http://localhost:5000/store/?id='+ props.match.params.id)
        .then(res => {
            console.log(res)
            // console.log("testPointer1")
            newProd_Data(res.data.metafields)
            // newMeta_ID(res.data.metafields.id)
         
            // console.log(newMeta_ID)
        })
        .catch(error => {
            console.log(error)
        })
    } , [props.match.params.id])
    // console.log("test1",Prod_Data)

   const [Curr_Metafields , Edited_Metafields] = useState("")

      const MetaEditHandler = (event) => {
        Edited_Metafields(event.target.value)
        // console.log("Metafields edited", Edited_Metafields)   
      }
      console.log("test2",Curr_Metafields)
      var Prod_ID = props.match.params.id
      console.log("jay2", Prod_ID)
   
   
    const UpdateMetafield = (id) =>{

      axios.post('http://localhost:5000/post' , 
          {
            headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Metafield_id':id,
            'Product_id':Prod_ID,
          },
          body:{
  
            "metafield": 
            {
                "id": id,
                "value": JSON.stringify(JSON.parse(Curr_Metafields)),
               "value_type":"json_string"
            }
          }    
        })
       .then(response => {
          console.log("Status: ", response.status);
          console.log("Data: ", response.data);
        }).catch(error => {
          console.error('Something went wrong!', error);
        });
      }
         
  return (
    <div>     
    <p>PRODUCT_DETAILS</p>   
     {
           Prod_Data.map(product =>(
            <div key={product.id}>
         <p>product_namespace = {product.namespace}</p>
         <p>product_key = {product.key}</p>
         <p>Metafield_Id = {product.id}</p>
         <p>product_value = {product.value}</p>
          <input type="text" defaultValue={product.value} onChange={MetaEditHandler} style={{padding:20,height:80,width:1000}} /><br></br>
          <button onClick={()=>UpdateMetafield(product.id)}>UPDATE_METAFIELDS</button>
         </div>
          )   
          )}
    </div>
  );
}

export default Data;
