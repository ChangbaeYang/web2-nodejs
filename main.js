var http = require('http'); // http : hyper text transfer language
var fs = require('fs');     // fs: file system
var url = require('url');   // url : uniform resource locator

var app = http.createServer(function(request,response){
    var _url = request.url; // 요청받은 url, request는 요청 정보가 있는 객체
    console.log(`1. ${_url}`);  // /?id=HTML 과 같이 queryString이 나옴. 이는 사용자가 입력할 수 있는 곳
    var queryData = new URL('http://localhost:3000' + _url).searchParams;
    var pathname = new URL('http://localhost:3000' + _url).pathname; 
    // new 생성자 함수를 통해 URL 객체를 만들고, 이 중에서 queryString을 뽑아내는, searchParams 메서드를 실행
    console.log(queryData); // URLSearchParams {'id' => 'css'} 객체?? 가 나옴
    // 하나 더 추가(?id=css&name=zzangbae)할 경우 {'id' => 'css', 'name' => 'zzangbae' 와 같이 나옴}
    console.log(queryData.get('id')); // 해당 파람스에서 'id'를 얻다
    // console.log(queryData.id) : 구시대의 유물

    console.log(new URL('http://localhost:3000'+ _url)) // URL 객체가 나오게 됨

    if (pathname === '/') {
      if (queryData.get('id') === null) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `
        response.writeHead(200);
        response.end(template)
      } else {
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
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `
          response.writeHead(200);
          response.end(template)
        })
      }
    } else { // 없는 값의 경우 pathname: '없는값~~~'으로 뜸
      response.writeHead(404);
      response.end('Not Found')
    }
    console.log(`3. ${__dirname + _url}`); // 아래의 파일read용 문서를 주는 거였음- 바뀌고 난 후, 이제, 이것을 사용자가 입력한 값으로 보내줄 수 있게함
    // 장점은 파일 구조를 들키지 않을 수 있고(보안강화), 편의성 올라감
    // response.end(template); // end다음이 브라우저에서 해석되는 부분
    // response.end(queryData.get('id'));
    // response.end('egoing :');
    // response.end(fs.readFileSync(__dirname + _url));
 
});
app.listen(3000);