// 压缩／解压缩
const fs = require('fs');
const zlib = require('zlib');
const http = require('http');

// 压缩
// const gzip = zlib.createGzip();
// const inFile = fs.createReadStream('./extra/fileForCompress.txt');
// const outFile = fs.createWriteStream('./extra/fileForCompress.txt.gz');
// inFile.pipe(gzip).pipe(outFile);

// 解压缩
// const gunzip = zlib.createGunzip();
// const inFile = fs.createReadStream('./extra/fileForCompress.txt.gz');
// const outFile = fs.createWriteStream('./extra/fileForCompress.txt');
// inFile.pipe(gunzip).pipe(outFile)

// 服务端gzip压缩
// const filePath = './extra/fileForGzip.html'
// let server = http.createServer(function(req, res){
//   var acceptEncoding = req.headers['accept-encoding'];
//   var gzip;
//
//   if(acceptEncoding.indexOf('gzip') != -1){
//     gzip = zlib.createGzip();
//     res.writeHead(200,{
//       'content-encoding': 'gzip'
//     })
//     fs.createReadStream(filePath).pipe(gzip).pipe(res);
//   }
//   else{
//     fs.createReadStream(filePath).pipe(res);
//   }
// })
// server.listen('3000');

// 服务端字符串gzip压缩
const responseText = 'hello world';
const server = http.createServer(function(req, res){
  let acceptEncoding = req.headers['accept-encoding'];
  if(acceptEncoding.indexOf('gzip') != -1){
    res.writeHead(200, {
      'content-encoding': 'gzip'
    })
    res.end(zlib.gzipSync(responseText));
  }else{
    res.end(responseText)
  }
})

server.listen('3000')
