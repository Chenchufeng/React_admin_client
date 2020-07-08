import React,{Component} from 'react';
// import { Button } from 'antd';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import './App.css';
import Login from './Pages/login/login'
import Admin from './Pages/admin/admin'
class App extends Component {
  // return (
  //   <div className="App">
  //     <Button type="primary">Button</Button>
  // </div>
  // );
  render() {
    return (
     <BrowserRouter>
  
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route> 
      </Switch>
       
    </BrowserRouter>
    )
  }
}

export default App;
