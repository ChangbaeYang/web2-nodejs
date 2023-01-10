var http = require('http'); // http : hyper text transfer language
var fs = require('fs');     // fs: file system
var url = require('url');   // url : uniform resource locator

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = new URL('http://localhost:3000' + _url).searchParams;
    var pathname = new URL('http://localhost:3000' + _url).pathname; 

    if (pathname === '/') {
      if (queryData.get('id') === null) {
        var testFolder = './data';
        fs.readdir(testFolder, function(error, filelist) {
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = '<ul>'
          var i = 0;
          while(i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i += 1
          }
          list = list+'</ul>'
          
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `
          response.writeHead(200);
          response.end(template)
        })
      } else {
        var testFolder = './data';
        fs.readdir(testFolder, function(error, filelist) {
          var list = '<ul>'
          var i = 0;
          while(i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i += 1
          }
          list = list+'</ul>'
        
          fs.readFile(`data/${queryData.get('id')}`, 'utf8', function(err, description){
            var title = queryData.get('id');
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `
            response.writeHead(200);
            response.end(template)
          })
        })
      }
    } else {
      response.writeHead(404);
      response.end('Not Found')
    }
 
});
app.listen(3000);