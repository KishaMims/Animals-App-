import { useState } from "react";

const Form = (props) => {
    const [animals, setAnimals] = useState({
        locationseen: "",
        dateseen: "",
        timeseen: "",
        id: "",
        healthy: "",
        email: ""
    });
    const health = ["Yes", "No"];

    //create functions that handle the event of the user typing into the form
    // const handleNameChange = (event) => {
    //     const speciesname = event.target.value;
    //     setAnimals((animals) => ({ ...animals, speciesname }));

    // }

    const handlelocationChange = (event) => {
        const locationseen = event.target.value;
        setAnimals((animal) => ({ ...animal, locationseen }));

    }

    const handledateChange = (event) => {
        const dateseen = event.target.value
        setAnimals((animal) => ({ ...animal, dateseen}));

    }


    const handletimeChange = (event) => {
        const timeseen = event.target.value;
        setAnimals((animal) => ({ ...animal, timeseen}));

        

    }

    const handleidChange = (event) => {
        const id = event.target.value;
        setAnimals((animal) => ({ ...animal, id}));

        

    }

    const handlehealthyChange = (event) => {
        const healthy = event.target.value;
        setAnimals((animal) => ({ ...animal, healthy}));

    }
    const handleemailChange = (event) => {
        const email = event.target.value;
        setAnimals((animal) => ({ ...animal,  email}));

    }

    //A function to handle the post request
    const postAnimal = (newAnimal) => {
        return fetch('http://localhost:5000/api/sightings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAnimal)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("From the post ", data);
            props.addAnimal(data);

        });
    }

    const handleSubmit = (e) => {
        let emptyAnimal = 
        {
        locationseen: "",
        dateseen: "",
        timeseen: "",
        id: "",
        healthy: "",
        email: ""
    }
        
        e.preventDefault();
        setAnimals(animals);
        postAnimal(animals);
        props.addAnimal(animals);
        setAnimals(emptyAnimal);

    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                {/* <label>Species Name</label>
                <input
                    type="text"
                    id="add-species-name"
                    placeholder="Species Name"
                    required
                    value={animals.name}
                    onChange={handleNameChange}

                /> */}
                <label>Location Seen</label>
                <input
                    type="text"
                    id="add-species-locationseen"
                    placeholder="Location Seen"
                    required
                    value={animals.locationseen}
                    onChange={handlelocationChange}
                />
                <label>Date Seen</label>
                <input
                    type="date"
                    id="add-species-dateseen"
                    placeholder="Date Seen"
                    required
                    value={animals.dateseen}
                    onChange={handledateChange}
                />
                <label>Time Seen</label>
                <input
                    type="time"
                    id="add-species-timeseen"
                    placeholder="Time Seen"
                    required
                    value={animals.timeseen}
                    onChange={handletimeChange}
                />
                <label>Indiviual ID</label>
                <input
                    type="number"
                    id="add-species-id"
                    placeholder="Enter ID"
                    required
                    value={animals.id}
                    onChange={handleidChange}
                />
                <label>Health of Animal</label>
                <select required value={animals.healthy} onChange={handlehealthyChange}>
                    <option value="">Is the animal healthy?</option>
                    {health.map((healthy) => (
                        <option key={healthy}>{healthy}</option>
                    ))}
                </select>
                <label>Email</label>
                <input
                    type="text"
                    id="add-scientist-email"
                    placeholder="Enter Email"
                    required
                    value={animals.email}
                    onChange={handleemailChange}
                />
            </fieldset>
            <button type="submit">Add</button>
        </form>
    );
};

export default Form;
