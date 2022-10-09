import React, { useState } from "react";
import "./App.css";

function City({state, estPop, city}) {
  return <div>
    {city}, {state}
  </div>;
}

function ZipSearchField({handleChange}) {
  return <div>
    <label>
      Zip Code:
      <input type="text" name="name" onChange={handleChange}/>
    </label>
</div>;
}

function App() {

  const [zipCode, setZipCode] = useState(null)

  const[zipResults, setZipResults] = useState([])

  const handleChange = (event) => {
    const zipInput = event.target.value
    setZipCode(zipInput)

    if( zipInput.length === 5 ) {
      fetch('https://ctp-zip-api.herokuapp.com/zip/'+zipInput)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then((data) => setZipResults(data))
    }
    else {
      setZipResults([])
    }

    
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <br></br>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField handleChange={handleChange}/>
        <div>
          <City 
            state = {zipResults.State}
            estPop = {zipResults.EstimatedPopulation}
            city = {zipResults.City}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
