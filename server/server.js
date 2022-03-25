const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js');

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

//create the get request
// app.get('/api/animals', cors(), async (req, res) => {
//     // const species = [



//     // //     { id: 4, coomonname: 'elephant, numberinthewild: 'Lee' },
//     // //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
//     // //     { id: 3, firstName: 'Fariba', lastName: 'Dako' },
//     // //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
//     // //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
//     // ];
//     // res.json(species);


// //     try {
// //         const { rows: sightings} = await db.query('SELECT * FROM sightings');
// //         res.send(sightings);
// //     } catch (e){
// //         return res.status(400).json({e});
// //     }
// // });
//     try {
//         const { rows: species} = await db.query('SELECT * FROM species');
//         res.send(species);
//     } catch (e){
//         return res.status(400).json({e});
//     }
// });



app.get('/api/sightings', cors(), async (req, res) => {
    // const species = [



    // //     { id: 4, coomonname: 'elephant, numberinthewild: 'Lee' },
    // //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
    // //     { id: 3, firstName: 'Fariba', lastName: 'Dako' },
    // //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
    // //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
    // ];
    // res.json(species);

    //original query for just sightings
    //     try {
    //         const { rows: sightings} = await db.query('SELECT * FROM sightings');
    //         res.send(sightings);
    //     } catch (e){
    //         return res.status(400).json({e});
    //     }
    // });

    try {
        const { rows: sightings } = await db.query('SELECT individual_animals.nickname, individual_animals.id, dateseen, email, timeseen, locationseen, healthy FROM sightings INNER join individual_animals on sightings.indiviualid = individual_animals.id;');
        res.send(sightings);
    } catch (e) {
        return res.status(400).json({ e });
    }
});


//create the POST request
app.post('/api/sightings', cors(), async (req, res) => {
    const newAnimal = { dateseen: req.body.dateseen, email: req.body.email, timeseen: req.body.timeseen, locationseen: req.body.locationseen, healthy: req.body.healthy, nickname: req.body.nickname, individualid: req.body.individualid}
    //console.log([newUser.firstname, newUser.lastname]);
    console.log(req.body);
    const result = await db.query(
        'INSERT INTO sightings(dateseen, email, timeseen, locationseen, healthy, indiviualid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        [newAnimal.dateseen, newAnimal.email, newAnimal.timeseen, newAnimal.locationseen, newAnimal.healthy, newAnimal.nickname, newAnimal.individualid]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


// original post 
// app.post('/api/sightings', cors(), async (req, res) => {
//     const newAnimal = { dateseen: req.body.dateseen, email: req.body.email, timeseen: req.body.timeseen, locationseen: req.body.locationseen, healthy: req.body.healthy }
//     //console.log([newUser.firstname, newUser.lastname]);
//     console.log(req.body);
//     const result = await db.query(
//         'INSERT INTO sightings(dateseen, email, timeseen, locationseen, healthy, indiviualid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
//         [newAnimal.dateseen, newAnimal.email, newAnimal.timeseen, newAnimal.locationseen, newAnimal.healthy]
//     );
//     console.log(result.rows[0]);
//     res.json(result.rows[0]);
// });