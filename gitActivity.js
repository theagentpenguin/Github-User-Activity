import chalk from 'chalk';
import fs from 'fs';

const args = process.argv.slice(2);
const userName = args[0];
const dataPath = "https://api.github.com/users/"+userName+"/events"
const emptyArray = [];


console.log(chalk.yellow(dataPath));

if(!fs.existsSync('apiData.json')){
        fs.writeFileSync('apiData.json',JSON.stringify(emptyArray,null,2),'utf8');
    }


async function fetchAndDisplayData(){
        const apiData = await fetch(dataPath);
        if(!apiData.ok){
            console.log("Data not fetched from API. Check if the username is valid!");
            return;
        }
        const data = await apiData.json();
        const dataToWrite = JSON.stringify(data,null,2);

        fs.writeFileSync('apiData.json',dataToWrite,'utf8');
        let dataFromFile = fs.readFileSync('apiData.json','utf8');
        let parsedData = JSON.parse(dataFromFile);

        //console.log(parsedData);
        
        let commitCount = 0;
        let newRepo = 0;
        for(let i=0; i<parsedData.length; i++){
            if(parsedData[i].payload.commits){
                commitCount++;
            }
            if(parsedData[i].type==="CreateEvent"){
                newRepo++;
            }
        }
        console.log("The user has pushed "+commitCount+" commits.");
        console.log("The user has created "+newRepo+" new repositories.");

        fs.writeFileSync('apiData.json',JSON.stringify(emptyArray,null,2),'utf8');
}

fetchAndDisplayData();





