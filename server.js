const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// HTML 파일들에 대한 라우팅
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Vercel과 로컬 환경 모두 지원
app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});