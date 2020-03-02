import React, { useState, useEffect } from "react";

import AnimalForm from "./AnimalForm.js";
import AnimalList from "./AnimalsList.js";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";

export default function AnimalDashboard() {
    
    const [ animals, setAnimals ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [update, setUpdate] = useState(false)

    //const [isLoading, setIsLoading] = useState(false); => then add isLoading to dependencyArray
    
    // How can get fetch the data from the server when the component mounts?
    // How can we capture and set that data to state?

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            axiosWithAuth()
            .get('animals')
            .then(response => {
                console.log('reponse from axios with auth',response.data)
                setAnimals(response.data)
                setUpdate(false)
                setIsLoading(false);
        })
        .catch(error => {
            console.log(`Error fetching animals ${error.response}`
            );
            setIsLoading(false);
        }, );
        },2000);
    },[update]);

    return(
        <div className="dash">
           {update ? 'LOADING' : ''}
            <AnimalForm 
            animals={animals} 
            updateAnimals={setAnimals} 
            update={setUpdate}
            />
            <AnimalList animals={animals} />
        </div>
    );
}