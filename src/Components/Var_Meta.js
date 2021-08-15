import React, {useState , useEffect} from 'react'
import axios from 'axios'


function Var_Meta(props) {
  const [Data , newData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/store/?id='+ props.match.params.id + '&var_id='+ props.match.params.var_id  )
        .then(res => {
            console.log(res)
            newData(res.data.metafields)
            
        })
        .catch(error => {
            console.log(error)
        })
        
    } , [props.match.params.id , props.match.params.var_id ])

 

    const [Curr_Metafields , Edited_Metafields] = useState("")

    const MetaEditHandler = (event) => {
      Edited_Metafields(event.target.value)
      console.log("Metafields edited", Edited_Metafields)   
    }

    console.log("test", props)
    var Product_id = props.match.params.id
    console.log("product_id",Product_id)
    var Variant_id = props.match.params.var_id 
    console.log("variant_id",Variant_id)

    
    const UpdateMetafield = (id) => {
        axios.post('http://localhost:5000/post' , 
      {
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'Metafield_id': id ,
          'Product_id':Product_id,
          'Variant_id':Variant_id,
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
     <p>META_APP</p>
     {
          Data.map(variant =>(
            <div key={variant.id}>
         <p>Variant_Metafield_Id = {variant.id}</p>
         <p>product_name_Space = {variant.namespace}</p>
         <p>product_Value = {variant.value}</p>
         <input type="text" defaultValue={variant.value} onChange={MetaEditHandler} style={{padding:20,height:80,width:1000}} /><br></br>
         <button onClick={()=>UpdateMetafield(variant.id)}>UPDATE_METAFIELDS</button>
         </div>
          )
           )}
    </div>
  );
}

export default Var_Meta;
