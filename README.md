# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## ElasticBeanstalk deploy
### 주의점
- 배포되는 소스는 git commit이 된 소스만 올라감

### 사전 작업
1. Eb cli install
- https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/eb-cli3-install.html

2. Acesskey 발급(비밀키)
- https://us-east-1.console.aws.amazon.com/iam/home?region=ap-northeast-2#/security_credentials
- 엑세스키, 비밀키 발급

### dev
```bash
eb init #엑세스키, 비밀키 작성
eb create # 개인 개발용 ElasticBeanstalk 생성
eb use %{ENV_NAME} # create에서 작성했던 environment, .elasticbeanstalk/config.yml 참고
eb deploy
eb open
```

### prod
todo) git action을 사용해서 배포하도록 작업 예정