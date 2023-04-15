
 //Database Connection

 const mysql = require('mysql');

 // (B) CREATE CONNECTION - CHANGE TO YOUR OWN !
 const connection = mysql.createConnection({
   host: "lhcp3324.webapps.net",
   user: "wv59p9ce_angelo_wedding_dba",
   password: "wedding2023.ang",
  //  database: "wv59p9ce_angelo_giulia_wedding"
 });

 connection.connect((error) => {
  if(error){
    console.log('Error connecting to the MySQL Database');
    return;
  }
  console.log('Connection established sucessfully');
});
connection.end((error) => {
});
   
   //End Database Connection




