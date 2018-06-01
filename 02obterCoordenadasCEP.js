// require csvtojson
var csvReader = require('csvreader');
var Client = require('node-rest-client').Client;
var format = require("string-format-js");
const csvFiletoRead = "./ceps_copa_botafogo.csv";
const csvFileOut = 'ceps_copa_botafogo_coordenadas.csv';
const RATING_LIMIT = 50;
const restartFile = "restartFile";
const GOOGLE_MAP_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=";
const fs = require('fs');

var client = new Client();
var loc = 0, processado = 0;
var lastRec;
var registros=[]; 
try{ 
  lastRec = parseInt(fs.readFileSync(restartFile));
}catch(err){
  lastRec = 0;
  console.log('erro lendo arquivo de restart');
  console.log(err);
}

function headerLineHandler(data){
}

function recordHandler(data){
  registros.push(data[0]);
}

function processRecord(){
  processado = lastRec;
  limite = lastRec + RATING_LIMIT;
  if(limite > registros.length)
    limite = registros.length;
  for(var i = lastRec; i < limite ; i++){
    //converte o CEP inteiro para XXXXX-XXX
    var CEP = registros[i]; 
    var cepLen = CEP.length;
    var cepPart1 = CEP.slice(0, 5);
    var cepPart2 = CEP.slice(5, 8);
    var cepFormatado = cepPart1 + "-" + cepPart2;
    console.log('lastRec:%d, i:%d, cep:%s'.format(lastRec, i, CEP));
    getGeoLoc(CEP, cepFormatado, function(cep, cepFormatado, lat, lng){
      var line = "%s,%.7f,%.7f\n".format(cep, parseFloat(lat).toFixed(7), parseFloat(lng).toFixed(7));
      fs.appendFileSync(csvFileOut, line);
      console.log(line);
      processado++;
      fs.writeFileSync(restartFile, processado);
      if((processado - lastRec) % RATING_LIMIT == 0 || processado > registros.length){
        process.abort();
      }         
    });
  }
}

var options = {
  hasHeaders: true,
  headerRecordHandler: headerLineHandler
};

csvReader
  .read(csvFiletoRead, recordHandler, options)
  .then(() => {
    processRecord();
  })
  .catch(err => {
    console.error(err);
  });

function getGeoLoc(cep, cepFormatado, callback) {
  var url = GOOGLE_MAP_URL.format(cepFormatado);
  client.get(url, function (data, response) {
    // parsed response body as js object 
    // console.log(data);
    if( data.status == "OK")
      callback(cep, cepFormatado, data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
    else if(data.status == "OVER_QUERY_LIMIT"){
      console.log('abortando por rating limit' );
      process.abort();
    }else
      callback(cep, cepFormatado, 0, 0);
  });

 }
