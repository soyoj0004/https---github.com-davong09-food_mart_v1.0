const express = require('express'); // express 모듈을 import 
//const bodyParser = require('body-parser');
const path = require('path');   // path 모듈을 import

// express 객체를 생성하여 app 변수에 할당, 
// express 객체의 역할은 웹 서버를 생성하고 구동하는 역할
const app = express(); 
const port = 3000;

// [미들웨어 등록]
// 1. 브라우저에서 form 의 데이터를 자바스크립트를 통해서 json 형태로 변환하여
// 서버로 전송하면 req.body에 파싱된 결과가 들어가게 됨. 그렇게 되면 서버에서
// req.body.id, req.body.password 같은 형태로 데이터를 추축하기 위해서
// 아래의 미들웨어를 구현함. 그렇게 되면 req.body.id, req.body.password로 접근가능.
app.use(express.json());

// 2. form + post 방식으로 데이터를 전송하면 urlencoded 형태로 key=value&key=value
// 형태로 인코딩 되어 서버로 전송된다. 서버에서는 인코딩 된 데이터에 
// .id .password와 같이 편하게 접근하기 위해서 아래의 미들웨어를 구현함.
// 그렇게 되면 req.body.id, req.body.password로 접근 가능
// 여기서 extended: true는 중첩된 객체 표현을 허용할지 말지를 정하는 것인데,
// true로 하면 qs 라이브러리를 사용하여 쿼리스트링을 해석하고, false로 하면
// node.js 내장 querystring 라이브러리를 사용하여 쿼리스트링을 해석한다.
app.use(express.urlencoded({ extended: true }));

// public 폴더를 static 폴더로 지정
// - public 폴더에 있는 파일들을 웹 브라우저에서 접근 가능하도록 하기 위해서
// __dirname : 현재 실행중인 스크립트가 있는 디렉토리의 절대경로를 반환
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 웹서버 구동, 여기서 구동되는 서버는 express 객체가 생성한 서버
// node.js 서버는 아님, 왜 express 객체가 생성한 서버인가?
// express 객체가 내부적으로 node.js의 http 모듈을 사용하여 서버를 생성하고 구동하기 때문
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
