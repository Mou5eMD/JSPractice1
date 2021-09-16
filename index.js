const express = require('express');
const http = require('http');
const cors = require('cors');
const { read, cpSync } = require('fs');
const { parse } = require('path');
const { reverse, REFUSED } = require('dns');
const { url } = require('inspector');
const prompt = require('prompt-sync')();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.all('/test', (req, res) => {
  res.status(200).json({ message: 'KKKKKK'});
})

app.use('/sum', (req, res, next) => {
  let x = parseInt(prompt("Enter 1 number: "));
  let y = parseInt(prompt("Enter 2 number: "));
  const sum = x + y;
    
  res.status(200).json({ sum });

  console.log(sum);

  next();
})

app.use('/reverseCase', (req, res, next) => {

  function reverseString(str) {

    let newStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newStr += str[i];
    }
    return newStr;
  }

  const string = prompt('Enter a string for reverse: ');

  const result = reverseString(string);
  console.log(result);
  res.status(200).json({ result });

  next();
  
})

app.use('/reverseArray', (req, res, next) =>{
  var inputArray = [];
  var size = 3;
  for (var i=0; i < size; i++){
      inputArray[i] = prompt("Enter an elements " + (i + 1) + " ");
  }
  const reversed = inputArray.reverse();

  res.status(200).json({ reversed }); 
  console.log(reversed);
  next();
})

http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})

