import React, {useState , useEffect} from 'react'
import axios from 'axios'


function StoreData(props) {

    const [Data , newData] = useState([])
   
   
    useEffect(() => {
        axios.get('http://localhost:5000/store')
        .then(res => {
            console.log(res)
            newData(res.data.products)
            console.log(newData) 
            var PROD_DATA = [];
            PROD_DATA = res.data.products;
            console.log( "Product_Data",PROD_DATA)
            
            })
            
        .catch(error => {
            console.log(error)
        })
    } , [])


  return (
    <div  >
       <p>META_APP</p>
          {
             Data.map(product =>( 
             <div key={product.id}>
              <p>product_title = {product.title}</p>
              <p>product_vendor = {product.vendor}</p>
              <p>product_type = {product.product_type}</p>
              <p>PRODUCT_ID = {product.id}</p>
              <a href={'/store/'+ product.id}>PRODUCT_METAFIELDS= {product.title}</a><br></br>
               <div>
                <ul>
                {product.variants.map((sub) => 
                <div key={sub.id}>
                    <li>
                    VARIANT_ID = {sub.id} LINK =
                    <a href={'/store/'+ product.id + '/'+ sub.id }>VARIANT_METAFIELDS = {sub.title}</a>
                  </li>
                </div>
                
                  )}
                </ul>
         
                </div> 
            </div>
          )
           )}
    </div>
  );
}

export default StoreData;
