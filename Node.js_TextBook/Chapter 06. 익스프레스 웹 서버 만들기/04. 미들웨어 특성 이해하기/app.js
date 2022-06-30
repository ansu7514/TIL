const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    console.log('1. 요청에 실행하고 싶어요.');
    next();
}, (req, res, next) => {
    console.log('2. 요청에 실행하고 싶어요.');
    next();
}, (req, res, next) => {
    console.log('3. 요청에 실행하고 싶어요.');
    next();
}
// 에러 처리하는 방법
// , (req, res, next) => {
//     throw new Error('에러가 났어요');
// }
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    // res를 동시에 사용하면 에러 발생 (요청 한 번에 응답 한 번)
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    // res.send('안녕하세요.');
    // res.json({ hello: 'zerocho '});
    // res.writeHead(200, { 'Content-Type': 'text/html' });
});

app.post('/', (req, res) => {
    res.send('Hello express!');
});

app.use((req, res, next) => {
    // 상태 코드를 수정할 수 있다.
    res.status(404).send('404입니다.');
});

// error middleware는 4가지 매개변수 필수!
app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러 났지롱. 근데 안 알려주지롱');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});