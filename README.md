## BOLD9 Back-end team 채용 사전 과제
#### 응시자: 양승우(bestman21c@gmail.com)

### Project 진행사항
- [x] 1. Prisma를 사용하여 총 3개의 table생성
- [x] 2. graphql server는 Nexus, TypeGraphQL을 사용하지 않고, schema first한 방법으로 schema, resolver를 작성
- [x] 3. TypeScript를 사용하여 프로젝트 진행
- [x] 4. apollo-server playground는 true값으로 설정
- [x] 5. 4개의 resolver 작성
- [x] 6. seed file 생성
- [ ] 7. 테스트 코드 작성

이 프로젝트는 로컬 개발용, container를 이용한 제출용의 두가지 방향으로 사용이 가능합니다.
.env 파일을 살펴보면 현재 docker-compose를 이용하여 container를 이용한 제출용으로 환경변수가 설정되어 있음을 확인 할 수 있습니다.
${}로 감싸진 MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DB는 docker-compose.yml 파일에서 넘겨준 환경변수입니다.

```
# using docker-compose env
DATABASE_URL="mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}/${MYSQL_DB}"
PORT="8080"

# using local container env
# DATABASE_URL="mysql://root:secret@localhost:7777/bold9"
```

로컬 개발용의 경우, host의 7777번 port에 MySQL container를 외부접속이 허용되게
(ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'secret'; flush privileges;) 설정해주어야 합니다.


제출용으로 사용하는 경우 package.json의 script에 포함된 2개의 command로 조작이 가능합니다.
```
"scripts": {
  "docker:up": "docker-compose up -d",
  "docker:down": "docker-compose down"
}
```
`npm run docker:up`로 container를 build, create, start합니다. container가 start되면 localhost:8080에서 GraphQL Playground를 사용할 수 있습니다.


`npm run docker:down`up에서 만든 container, network, volume, image를 제거합니다.
***

### 피드백
