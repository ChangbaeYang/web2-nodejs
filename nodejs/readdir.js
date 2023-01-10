// 파일목록 알아내기(배열로 나타남)
var testFolder = '../data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist) {
    console.log(filelist) // ['CSS', 'HTML', 'JavaScript']
})