## 🔌 Getting Started / 초기 설정

해당 리포지토리를 Pull 받습니다. 이후 필요한 의존성을 설치하기 위해 아래의 명령어를 CMD 등의 환경에서 실행합니다.

```bash
cd HomeFit
npm install
```

이후 루트 폴더(`.gitignore`가 위치한 폴더)에 `.env.local`를 아래와 같이 작성합니다.

```
NEXT_PUBLIC_API_URL=https://localhost:8081
HTTPS=true
SSL_CRT_FILE=cert.pem
SSL_KEY_FILE=key.pem
```

작성이 완료되었으면 아래의 명령어를 추가로 실행합니다.

```bash
npm run dev
```

이후, [https://localhost:3000](https://localhost:3000)으로 접속하시면 자동으로 /login 엔드포인트로 이동하게 됩니다.
