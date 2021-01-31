import React from 'react';
import Homepage from './components/homepage/homepage'
import {BrowserRouter, Route} from 'react-router-dom'


const App = () => {

  return( 
  <BrowserRouter>
    <Route exact path='/' component={Homepage}/>
  </BrowserRouter>
  )
}


export default App