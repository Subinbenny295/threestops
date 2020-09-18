import React, { useEffect, useState } from 'react';
import './App.css';
import Display from './Display';
import db from './firebase';
import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

function App() {
  const [arrays, setArrays] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  useEffect(() => {
    db.collection('arrays').orderBy('timestamp', 'desc' ).onSnapshot(snapshot => {
      setArrays(snapshot.docs.map(doc => ({id: doc.id, array: doc.data().array})))
    })
  }, [])

  const addTo = (event) => {
    event.preventDefault();
    const input = input1 +" " +input2;
    db.collection('arrays').add({
      array: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    // setArrays([ ...arrays, input ])
    
    setInput1('');
    setInput2('');
  }
  
  return (
    <div className="app">
     <form className="app__form">
         <TextField name="input1" value={input1} onChange={event => setInput1(event.target.value)} id="outlined-basic" label="FirstName" variant="outlined" />
         <TextField name="input2" value={input2} onChange={event => setInput2(event.target.value)} id="outlined-basic" label="LastName" variant="outlined" />
         <Button type="submit" onClick={addTo} >Add</Button>
     </form>
      <ul>
        {arrays.map(array => (
          <Display array={array} />
        ))}
      </ul>
    </div>
  );
}

export default App;
