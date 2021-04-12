// require google-spreadsheet api wrapper
const { GoogleSpreadsheet } = require('google-spreadsheet');
// require .env file
require('dotenv').config();
const fs = require('fs')
const csv = require('csv-parser');
const csvParser = require('csv-parser');
const credentials = require('./credentials_gsheet.json');
//const path = require('path');
//const NodeGoogleDrive = require('node-google-drive');
//const { PerformanceObserver, performance } = require('perf_hooks');

// Read csv file using a module named csv-parser

const results = []
fs.createReadStream('Volvo_B2C.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {

  //******NOTE******// R Design is an exception because it is always written as Rdesign with does not result a match  

  // give the row number of the model you wanna map
   const numb = 1804;
   let key1 = results[numb].model + results[numb].trim_level.replace(/\s/g, '')   + results[numb].kw
   let key2 = results[numb].model + results[numb].trim_level.replace(/\s/g, '')   + results[numb].ps //+ results[0].gear_type;
   let splitOriginal = (results[numb].variation).toLowerCase().split(' ') 
    console.log(key1)
    GetCarComponents(key1,key2,splitOriginal)
  });

async function GetCarComponents (key1,key2,splitOriginal){ 
    const doc = new GoogleSpreadsheet(JATO_ID); // set spreadsheet id
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    const sheet = await doc.sheetsByTitle['B2C']
    const rows = await sheet.getRows()
    console.log(splitOriginal)  

    for (var i = 0 ; i < rows.length ; i++){
    // [ 'volvo', 'xc40', 'b4', 'b', 'awd', 'geartronic', 'inscription' ] 
     let match1 = rows[i].Baureihe + rows[i].Typ.replace(/\s/g, '') + rows[i]['Leistung in kW'] //+ rows[i].Getriebeart //+ rows[i]
     let match2 = rows[i].Baureihe + rows[i].Typ.replace(/\s/g, '') + rows[i]['Leistung in PS'] // removes space within the string

       
      	// here I split the string of model name and make suggestions if it matches with the original model we are looking for 

        let splitMatch = rows[i].display_name.toLowerCase().split(' ') 
       // console.log(rows[i].vehiculum_car_id)
       // console.log(splitMatch)
        
        let map = {};
        splitMatch.forEach(i => map[i] = false);
        splitOriginal.forEach(i => map[i] === false && (map[i] = true));
        const jsonArray = Object.keys(map).map(k => ({ name: k, matched: map[k] }));
        //console.log(jsonArray)
        const counts = jsonArray.reduce((c, { matched: key }) => (c[key] = (c[key] || 0) + 1, c), {});
        jsonArray.push(counts,{"car_id":rows[i].vehiculum_car_id})

          if (jsonArray[jsonArray.length-2].true > jsonArray.length-3){
            console.log(jsonArray)
          }
        
    //  }
  }    
        
}
