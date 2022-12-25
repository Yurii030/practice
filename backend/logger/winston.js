// node.js로 개발할 시 로그를 남기기 위해 winston을 적용하는 것. console.log도 가능하지만, 특정로그를 남기는 용도로 사용된다. (날짜 기록시)

const winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');
 
const logger = winston.createLogger({
// const level ={} : 개발 환경에 따라 표시할 logger레벨을 다르게하기 위해 선언, 개발중이면 0~debug까지 표시, 아니라면 error~warn까지 logger표시
// TRACE > DEBUG > INFO > WARN > ERROR > FATAL - info로 설정하면 warn,error,fatal,info는 표시된다.
    level: 'debug', // 최소 레벨
    // 파일저장
    transports: [
        new winston.transports.DailyRotateFile({
            filename : 'log/system.log', // log 폴더에 system.log 이름으로 저장
            zippedArchive: true, // 압축여부
            format: winston.format.printf( // log 표시형식 표기
                info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
        }),
        // 콘솔 출력
        new winston.transports.Console({
            format: winston.format.printf(
                info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
        })
    ]
});
 
module.exports = logger;
