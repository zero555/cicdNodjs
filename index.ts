import * as http from 'http';
import * as url from 'url';
import * as querystring from 'querystring';

const hostname:string = 'localhost';
const port:number = Number(process.env.PORT) || 8080;

const server:http.Server = http.createServer((request, response) => {
    const urlObject:url.Url = url.parse(request.url);
    const searchParamsString:string = urlObject.query as string;
    const searchParamsJSON:any = querystring.parse(searchParamsString);
    const lowestNumber:number = Number(searchParamsJSON.von);
    const highestNumber:number = Number(searchParamsJSON.bis);

    let table = '<table><tr><th>n</th><th>n<sup>2</sup></th>';
    for (let i = lowestNumber; i <= highestNumber; i++) {
        table += `<tr><th>${i}</th><th>${i*i}</th>`;
    }
    table += '</table>';

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    response.write('<html><head><title>Squared numbers</title></head><body>');
    response.write('<style type="text/css"> table, td, th { border-collapse: collapse; border: 1px solid; }' +
        'tr:not(:first-child) { text-align: right } </style>');
    response.write(`<h1>Quadratzahlen ${lowestNumber}<sup>2</sup> bis ${highestNumber}<sup>2</sup></h1>`);
    response.write(`${table}`);
    response.end('</body></html>');
}).listen(port,() => {
    console.log(`Server gestartet auf http://${hostname}:${port}`);
});