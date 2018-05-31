// POST /enderecoaps/mps3.asp HTTP/1.1
// Host: www010.dataprev.gov.br
// Content-Type: application/x-www-form-urlencoded
// Cache-Control: no-cache
// Postman-Token: 7ba4f253-8c78-43dd-9c90-caf64e339f78

// CEP=20550030

var csvReader = require('csvreader');
var https = require('http');
var format = require("string-format-js");
var querystring = require('querystring');
const csvFiletoRead = './ceps_copa_botafogo.csv';
const csvFileOut = './ceps_copa_botafogo_aps.csv';
const fs = require('fs');
var line = 0;
var registros=[]; 

var args = process.argv;

function recordHandler(data){
  registros.push(data);
}

function headerLineHandler(data){
}

var options = {
  hasHeaders: true,
  headerRecordHandler: headerLineHandler
};

csvReader
  .read(csvFiletoRead, recordHandler, options)
  .then(() => {
    const start = parseInt(args[2]);
    console.log('start:' + start)
    var end =  start + 50;
    console.log('end:'+ end)
    
    if( end > registros.length )
      end = registros.length;
    for(line = start; line < end; line++){
      console.log('cep %s'.format(registros[line][0]));
      requestAPSByCEP(registros[line][0], function(idaps, cep){
          const lineStr = '%s,%s\n'.format(cep, idaps);
          console.log(lineStr);
          fs.appendFileSync(csvFileOut, lineStr);
      });      
    }
    console.log('fim');
  })
  .catch(err => {
    console.error(err);
  });

// request object
function requestAPSByCEP(cep_param, callback){
  var postData = querystring.stringify({
    CEP: cep_param
  });
  // request option
  var options = {
    host: 'www010.dataprev.gov.br',
    port: 80,
    method: 'POST',
    path: '/enderecoaps/mps3.asp',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = https.request(options, function (res) {
    var result = '';
    res.on('data', function (chunk) {
      result += chunk;
    });
    res.on('end', function () {
      const isInexistente = 'CEP inexistente!';
      const isNaoEncontradoAbrangencia = 'CEP n�o encontrado na tabela de abrang�ncia.';
      if(result.indexOf(isInexistente) != -1){
        console.log('CEP inexistente');
        callback('000000000', cep_param);
      }else if (result.indexOf(isNaoEncontradoAbrangencia) != -1){
        console.log('CEP nao encontrado na abrangencia');
        callback('000000000', cep_param);
      }else{
        const searchStr= 'c�digo: <font color="#000000">';
        const idx1 = result.indexOf(searchStr);
        const idx2 = result.indexOf('<br>', idx1);
        const idaps = result.substr(idx1+searchStr.length, (idx2)-(idx1+searchStr.length));
        // console.log('Indices: %d,%d,%s'.format(idx1,idx2,idaps));
        callback(idaps,cep_param);
      }
    });
    res.on('error', function (err) {
      console.log(err);
    })
  });
 
  // req error
  req.on('error', function (err) {
    console.log(err);
  });
 
  //send request witht the postData form
  req.write(postData);
  req.end();
}