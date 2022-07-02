const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log('1. 요청에 실행하고 싶어요.');
    next();
}, (req, res, next) => {
    try {
        // error 발생 지점
        console.log(asdfasdf);
    } catch (err) {
        next(err);
    } 
});

app.get('/', (req, res) => {
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify({ hello: 'suhyun' }));

    // 위 두줄을 줄여 아래처럼 사용가능하도록 express에서 service
    return res.json({ hello: 'suhyun' });
    console.log('hello suhyun');
});

// error 처리 middelware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('에러났지롱. 근데 안 알려주지롱~');
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});