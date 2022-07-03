const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
app.set('port', process.env.PORT || 3000);

/*
morgan
console에 요청 정보, 응답 정보, 응답 시간이 표시됨
요청과 응답을 기록하는 라우터
*/
// dev보다 combined가 좀 더 자세한 정보 표출해줌
app.use(morgan('dev'));
// app.use(morgan('combined'));
app.use(cookieParser('Suhyunpassword'));
// bodyparser : 알아서 데이터 parsing 됨
// 거의 필수로 사용 중이다.
app.use(express.json());
// form parsing할 때 사용하는데, extended는 true로 해놓는 것을 추천
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('1. 요청에 실행하고 싶어요');
    next();
});

app.get('/', (req, res, next) => {
    // 일반 쿠키 생성
    // req.cookies();
    // 암호화된 쿠키 생성
    // req.signedCookies();
    // 쿠키 생성
    // res.cookie('name', encodeURIComponent(name), {
    //     expires: new Date(),
    //     httpOnly: true,
    //     path: '/',
    // });
    // 쿠키 삭제
    // res.clearCookie('name', encodeURIComponent(name), {
    //     httpOnly: true,
    //     path: '/',
    // });
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    res.send('hello express!');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('에러났지롱. 근데 안 알려주지롱~');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});