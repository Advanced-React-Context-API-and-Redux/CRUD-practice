import React, { useState, useEffect } from "react";

import AnimalForm from "./AnimalForm.js";
import AnimalList from "./AnimalsList.js";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";

export default function AnimalDashboard() {
    
    const [ animals, setAnimals ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [error, setError] = useState(false);
    const [update, setUpdate] = useState(false)

    //const [isLoading, setIsLoading] = useState(false); => then add isLoading to dependencyArray
    
    // How can get fetch the data from the server when the component mounts?
    // How can we capture and set that data to state?

    useEffect(() => {
        setIsLoading(false)
        axiosWithAuth()
        .get('animals')
        .then(response => {
            console.log(response.data)
            setAnimals(response.data)
            setIsLoading(false)
            console.log('should be false',isLoading)
        })
        .catch(error => {
            setIsLoading(false)
            setError(error)
            console.log(`Error fetching animals ${error.response}`)
        })
    },[])

    return(
        <div className="dash">
            { isLoading && <div style={{ color: `green`, fontSize: 34, marginLeft: 20 }}> Loading ...</div> }
            {error && <div style={{ color: `red`, fontSize: 34, marginLeft: 20 }}>You messed up...</div> }
            <AnimalForm animals={animals} updateAnimals={setAnimals} />
            <AnimalList animals={animals} />
        </div>
    )
}