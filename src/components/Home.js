import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
//import showAlert from "../App"
import Notes from './Notes';

 export const Home = (props) => {
  const {showAlert}= props   //extracting the showAlerts by destructing
  return ( 
    <div > 
<Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
