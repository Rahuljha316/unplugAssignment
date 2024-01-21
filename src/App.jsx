import { Provider } from 'react-redux'
import './App.css'
import Details from './components/Details'
import Functionality from './components/Functionality'
import Header from './components/Header'
import store from './redux/store'
import { useState } from 'react'

function App() {
  const [total, setTotal ] = useState("")


  return (
    <Provider store={store}>
      <div className='main-content'>
          <div className='content' id='pdf-container'>
            <Header total={total} setTotal={setTotal}/>
            <Details total={total} setTotal={setTotal}/>
          </div>
          <div className='sidebar'>
            <Functionality total={total} setTotal={setTotal}/>
          </div>
            
      </div>

      
    </Provider>
    
  )
}

export default App
