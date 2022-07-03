const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

// 정적 파일 관리 시, 보안에 장점을 가질 수 있음
// app.use('요청 경로', express.static('실제 경로'));
app.use('/', express.static(__dirname, 'public'));

app.get('/', (req, res, next) => {
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