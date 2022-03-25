import { useState, useEffect } from "react";
import Form from "./form";

function Animals() {
//const [animals, setAnimals] = useState([]);
const [sightings, setSightings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/sightings")
        .then((response) => response.json())
        .then(sightings =>{
            //setStudents((students[3]));
            //console.log("Testing", typeof students);
            for (let index in sightings){
               if( index !== "3"){
                   setSightings(sightings);
               }
            };       
        })
        
    }, []);


    // useEffect(() => {
    //     fetch("http://localhost:5000/api/sightings")
    //     .then((response) => response.json())
    //     .then(sightings =>{
    //         //setStudents((students[3]));
    //         //console.log("Testing", typeof students);
    //         for (let index in sightings){
    //            if( index !== "3"){
    //                setSightings(sightings);
    //            }
    //         };       
    //     })
        
    // }, [sightings]);



    // const addSighting = (newsSighting) => {
    //     console.log(newsSighting);
    //     //postStudent(newStudent);
    //     setSightings((sightings) => [...sightings, newsSighting]);
    // }

    // console.log(addSighting);
  
        // { id: 1, firstName: 'Lisa', lastName: 'Lee' },
    // const addAnimal = (newAnimal) => {
    //     //console.log(newStudent);
    //     //postStudent(newStudent);
    //     setAnimals((animals) => [...animals, newAnimal]);
    // }
    //
    // {sightings.map((sighting, index) =>
    //     <li key={index}> {sighting.id} {sighting.dateseen} {sighting.locationseen} {sighting.healthy} {sighting.nickname} </li>)}
    //x{formatDate(post.createdAt)}

    const addAnimal = (newsSighting) => {
        //console.log(newStudent);
        //postStudent(newStudent);
        setSightings((sightings) => [...sightings, newsSighting]);
    }
    return (
      <div className="animals">
        <h2>List of Sightings</h2>
        <ul>
            {sightings.map((sighting, index) =>
                <li key={index}> {sighting.id} {sighting.nickname} {sighting.locationseen} {sighting.healthy} </li>)}
        </ul>
        <Form addAnimal={addAnimal} />
        <div>
            {/* {JSON.stringify(sightings)} */}
            </div> 
      </div>
      
    );
  }
  
  export default Animals;