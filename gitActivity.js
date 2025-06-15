import chalk from 'chalk';
import fs from 'fs';

const args = process.argv.slice(2);
const userName = args[0];
const dataPath = "https://api.github.com/users/"+userName+"/events"
const emptyArray = [];
let apiData;

console.log(chalk.yellow(dataPath));

if(!fs.existsSync('apiData.json')){
        fs.writeFileSync('apiData.json',JSON.stringify(emptyArray,null,2),utf8);
    }
/*
const apiData = fs.writeFileSync('apiData.json',fetch(dataPath),utf8);
This approach doesn't work, have to use async
console.log(chalk.yellow("Code executed!"));
*/

async function fetchData(){
        const apiData = await fetch(dataPath);
        if(!apiData.ok){
            console.log("Data not fetched from API");
        }
        const data = await apiData.json();
        const dataToWrite = JSON.stringify(data,null,2);

        fs.writeFileSync('apiData.json',dataToWrite,'utf8');
}

fetchData();