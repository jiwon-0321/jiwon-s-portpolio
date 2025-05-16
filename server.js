const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// 모든 라우트에 대해 index.html 제공
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 포트 충돌 방지 및 명시적 3000 포트 설정
app.listen(3000, () => {
    console.log(`서버가 http://localhost:3000 에서 실행 중입니다.`);
});