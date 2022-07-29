const express = require("express");
const server = express();

const request = require('request')
const NAVER_CLIENT_ID     = 'yXbYarOcT_B7bUxGOa3S'
const NAVER_CLIENT_SECRET = 'zEIpQQkF3a'
const option = {
  query  : '이소연', //이미지 검색 텍스트
  start  : 1, //검색 시작 위치
  display: 3, //가져올 이미지 갯수
  sort   : 'sim', //정렬 유형 (sim:유사도)
  filter : 'small' //이미지 사이즈
}

server.use(express.static(__dirname + "/public"));

request.get({
  uri:'https://openapi.naver.com/v1/search/image', //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
  qs :option,
  headers:{
    'X-Naver-Client-Id':NAVER_CLIENT_ID,
    'X-Naver-Client-Secret':NAVER_CLIENT_SECRET
  }
}, function(err, res, body) {
  let json = JSON.parse(body) //json으로 파싱
  console.log(json)
})

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
  
server.listen(3000, (err) => {
if (err) return console.log(err);
console.log("The server is listening on port 3000");
});