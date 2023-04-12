const fs = require('fs');
const connection = require('./db.js');
const request = require('request');

function readFilePromise (filePath){
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, 'utf-8', (fileError, fileResult) => {
            fileError ? reject(fileError) : resolve(fileResult)
        })
    })
}

function DBPromise (sqlQuery){
    return new Promise((resolve, reject)=>{
        connection.query(sqlQuery, (error, result)=> {
            error ? reject(error) : resolve(result);
        })
    })
}

function requestPromise (requestURL){
    return new Promise((resolve, reject)=>{
        request(requestURL, function (error, response) {
            error ? reject(error) : resolve(response);
        })
    })
}

module.exports = {
    readFilePromise,
    DBPromise,
    requestPromise
}