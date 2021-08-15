import StoreData from './Components/StoreData';
// import Product1 from './Components/Product1'
// import Product2 from './Components/Product2'
// import Product3 from './Components/Product3'
import Nav from './Components/Nav';
import Data from './Components/Data'
import Var_Meta from './Components/Var_Meta';

import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'


function App() {
  return (
    <Router>
       <div className="App">
        <h1>KIRO-META-APP</h1>
        <Nav />
        <Switch>
        <Route  path="/" exact component={Home}/>
        <Route  path="/store" exact component={StoreData}/>
        {/* <Route  path="/product1" component={Product1}/>
       
        <Route  path="/product3" component={Product3}/> */}
         
        <Route  path="/store/:id" exact component={Data} />
        <Route path="/store/:id/:var_id" component={Var_Meta}/>
        {/* <Route  path="/product2" component={Product2}/> */}
        </Switch>
      
       </div>
    </Router>
   
  );

 
}
const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
     
  )

export default App;
