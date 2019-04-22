# 크롤링

`node scrap/index` 실행

index -> urlScrap -> imageScrap -> userScrap

## 실행 ->

## 스크롤하면서 url을 가져온다 ->

## url 리스트를 이용해 이미지를 가져온다 ->

## 이미지마다의 유저계정정보를 가져온다

> Google Cloud Vision

상위폴더에 .env 파일 생성 후 입력
GOOGLE_APPLICATION_CREDENTIALS = json 파일 경로
구글클라우드 정보 json 파일

> Config.json

```
{
  "development": {
    "dev": {
      "username": DB유저네임,
      "password": DB암호,
      "database": DB이름,
      "port": 포트번호,
      "host": 엔드포인트,
      "dialect": "mysql"
    },
    "dev2": {
      "username": "",
      "password": "",
      "database": "",
      "host": "",
      "port": 3306,
      "dialect": "mysql"
    }
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "user" : {
    "username": 인스타 계정아이디,
    "password": 인스타 암호
  },
  "bitly" : {
      "token" : "BITLY TOKEN"
  }
}
```

> RDS 연결 정보 AWSConfig.js

```
{
  "accessKeyId": "",
  "secretAccessKey": "",
  "region": "ap-northeast-2"
}
```

S3 키아이디, 암호, 리전( 서울 )
