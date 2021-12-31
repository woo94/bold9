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
한번도 사용해보지 않은 docker, prisma, graphql, apollo server로 프로젝트를 진행해보았습니다. 
짧은 시간에 많은 것을 시도해보고 익힐 수 있는 좋은 경험이었습니다.


마지막으로 프로젝트를 진행하면서 풀리지 않는 의문이 있었습니다.
Q) 위에서 로컬 개발용과 제출용이 있다고 말씀드렸습니다. 
로컬 개발용으로 진행할때는 MySQL container에 외부접속이 허용되게 설정해주지 않으면 DB에 connection이 이루어지지 않았습니다.
하지만 제출용에서는 이러한 설정을 해주지 않아도 app container에서 mysql container로의 connection이 잘 이루어졌습니다.
service/app에서 MYSQL_HOST 환경변수로 넘겨준 mysql network가 resolve 되면서 접속이 가능한게 아닐까라고 하는 추측 이상으로는 실마리를 찾지 못했습니다.


이 현상에 대해서 설명을 해주신다면 정말 감사드리겠습니다.

