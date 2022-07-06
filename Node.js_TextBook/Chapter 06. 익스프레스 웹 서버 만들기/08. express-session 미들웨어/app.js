const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'suhyun',
    // session일 때 쿠키는 사용해야 함 (4강 참조)
    cookie: {
        httpOnly: true,
    },
    // 읽을 수 없는 문자열로 변경 됨
    name: 'connect.sid',
}));

app.use((req, res, next) => {
    console.log('1. 요청에 실행하고 싶어요');
    next();
});

app.get('/', (req, res, next) => {
    // 요청마다 개인의 저장 공간을 생성해준다고 생각하면 됨
    req.session.id = 'hello';
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