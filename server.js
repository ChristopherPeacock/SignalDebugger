
const { exec } = require('child_process');
const express = require('express');
const { stdout } = require('process');
const { PassThrough } = require('stream');
const app = express();
const port = 3000;

//Middlesware Setup
app.use(express.json());

app.post('/get-location', (req, res) => {
    exec('adb shell dumpsys location', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send(`Error: ${error}`);
            return;
        }

     
        let latitude = null;
        let longitude = null;

      
        const lines = stdout.split('\n');
        for (let line of lines) {
            if (line.includes('latitude')) {
                latitude = parseFloat(line.split(':')[1].trim());
            }
            if (line.includes('longitude')) {
                longitude = parseFloat(line.split(':')[1].trim());
            }
        }

        if (latitude && longitude) {
            res.json({ latitude, longitude });
        } else {
            res.status(400).send('Unable to extract coordinates');
        }
    });
});

app.post('/data', (req, res)=>{
    try{
        console.log('Received data:', req.body);
        res.send('Data received')
    } catch (err){
        console.log('Error processing request:', err);
        res.send(500).send('Server error');
    }
 
});



app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
});