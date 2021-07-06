<img style="border: 0px solid black !important; border-radius:20px; " src="https://user-images.githubusercontent.com/63224278/124624683-0db13c80-deb8-11eb-9af2-0fb6038066d0.png" width="1500px" height = "300px" /> 
</br>


<h1 align="center"> Welcome to ChaRo-Server 🚙 </h1>
<p align="center">
  <img src="https://img.shields.io/badge/typescript-4.2.4-blue" />
  <img src="https://img.shields.io/badge/ts--node-9.1.1-yellowgreen" />
  <img src="https://img.shields.io/badge/%20mysql2-2.2.5-blue" />
  <a href="https://www.instagram.com/charo_2021_official/">
      <img alt="Instagram: Charo_Official" src="https://img.shields.io/badge/charo-instagram-ff69b4" target="_blank" />
  </a>
</p>

차에서의, 차로위에서의 즐거움을 추구하는 경험 기반 드라이브 코스 공유 플랫폼 <br /> 
> **차로 ChaRo** <br/> <Core Value : 차로의 핵심 가치는 '즐거움과 편리함'입니다. <br /><br /> SOPT 28th APPJAM  <br/> 프로젝트 기간: 2021.06.26 ~ 2021.07.17 <br/>

</br>

## ✨Service IA
<img width=100% src=https://user-images.githubusercontent.com/63224278/123808257-8b5ed080-d92b-11eb-8ac7-e2ef5286909a.png>



<br>
<br>

## 📃 API DOC LINK
> [ChaRo Server API 문서📜](https://www.notion.so/API-Wiki-4844e313dcf248cca8c427f06aa60c64)

<br>
<br>


## ⚙️ Dependency Module
<details>
<summary> 🚙 Charo-Server Dependency Module 🚙 </summary>
<div markdown="1"> 

```
"dependencies": {
    "@types/express": "^4.17.11",
    "dotenv": "^9.0.2",
    "express": "^4.17.1",
    "mongoose": "^5.12.10",
    "morgan": "^1.10.0",
    "mysql2": "^2.2.5",
    "nodemon": "^2.0.7",
    "request": "^2.88.2",
    "sequelize": "^6.6.4",
    "sequelize-cli": "^6.2.0"
  },
```
- [Async & Await](https://www.npmjs.com/package/async)
- [request(HTTP)](https://www.npmjs.com/package/request)
- [Node.js](https://nodejs.org/ko/) - Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임
- [Express.js](http://expressjs.com/ko/) - Node.js 웹 애플리케이션 프레임워크
- [NPM](https://rometools.github.io/rome/) - 자바 스크립트 패키지 관리자
- [vscode](https://code.visualstudio.com/) - 편집기
- [mySQL](https://www.mysql.com/) - DataBase
- [Sequelize](https://sequelize.org/) - Sequelize ORM
- [AWS EC2](https://aws.amazon.com/ko/ec2/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_ec2_b&sc_content=ec2_e&sc_detail=aws%20ec2&sc_category=ec2&sc_segment=177228231544&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177228231544!e!!g!!aws%20ec2&ef_id=WkRozwAAAnO-lPWy:20180412120123:s) - 클라우드 환경 컴퓨팅 시스템

</div>
</details>

<br>
<br>


## 🧬 ERD & Models
<img width="360" alt="models" src="https://user-images.githubusercontent.com/63224278/124627915-e871fd80-deba-11eb-84ee-90af153cbaf1.png">

<br>
<br>



## ✉️ Commit Messge Rules
<details>
<summary> 🚙 Charo-Server Git Commit Message Rules 🚙 </summary>
<div markdown="1">       


---

- 반영사항을 바로 확인할 수 있도록 작은 기능 하나라도 구현되면 커밋을 권장합니다.
- 기능 구현이 완벽하지 않을 땐, 각자 브랜치에 커밋을 해주세요.
<br>


### 📜 커밋 메시지 명령어 모음

```
- feat    : 기능 (새로운 기능)
- fix     : 버그 (버그 수정)
- refactor: 리팩토링
- style   : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
- docs    : 문서 (문서 추가, 수정, 삭제)
- test    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
- chore   : 기타 변경사항 (빌드 스크립트 수정 등)
```
<br>

### ℹ️ 커밋 메세지 형식
  - `[커밋메세지] 설명` 형식으로 커밋 메시지를 작성합니다.

좋은 예 > 

```
  [Feat] 메인뷰 조회 API 구현 완료
```

나쁜 예 >
```
  메인뷰 API 구현 성공
```

</div>
</details>
<br>

## 💻 Github mangement

<details>
<summary> 🚙 Charo-Server Gitflow 🚙 </summary>
<div markdown="1">       


---

- main 브랜치
- develop 브랜치
  - feat 브랜치

```
default는 main브랜치입니다.

하위에 develop브랜치를 만들어 안전하게 관리합니다.

기능 개발시 → feat/번호 로 브랜치를 파서 관리합니다.

* 단 feat은 자세한 기능 한 가지를 담당하며, 기능 개발이 완료되면 develop브랜치로 Pull Request를 보냅니다. 
* 다른 팀원이 pr을 확인하고, 코드리뷰를 진행한 뒤 문제가 없으면 develop 브랜치에 병합을 합니다.
```

<br>

```
- Main
- develop
   └── feat/기능번호
```

<br>

**각자 자신이 맡은 기능 구현에 성공시! 브랜치 다 쓰고 병합하는 방법**

- 브랜치 만듦

```bash
git branch 기능(or 이름 브랜치)
```

- 원격 저장소에 로컬 브랜치 push

```bash
git push --set-upstream origin 브랜치이름(feat/기능번호 브랜치)
```
```bash
git push -u origin 브랜치이름(feat/기능번호 브랜치)
```


- 브랜치 전환

```bash
git checkout feat/기능번호 브랜치
```

- 코드 변경 (현재 **feat/기능번호** 브랜치)

```bash
git add .
git commit -m "커밋 메세지" origin feat/기능번호 브랜치
```

- 푸시 (현재 **feat/기능번호** 브랜치)

```bash
git push origin feat/기능번호 브랜치
```

- 뷰이름 브랜치에서 할 일 다 했으면 **develop** 브랜치로 전환

```bash
git checkout develop
```

- 머지 (현재 **develop** 브랜치)

```bash
git merge feat/기능번호 브랜치
```

- 다 쓴 브랜치 삭제 (local) (현재 **develop** 브랜치)

```bash
git branch -d feat/기능번호 브랜치
```

- 다 쓴 브랜치 삭제 (remote) (현재 **develop** 브랜치)

```bash
git push origin :feat/기능번호 브랜치
```

- main pull (현재 **develop** 브랜치)

```bash
git pull or git pull origin develop
```

- main push (현재 **develop** 브랜치)

```bash
git push or git push origin develop
```
</div>
</details>
  
  
  <br>
   <br>


 
## 기능별 개발여부 + 담당자
> [ChaRo Server 개발 일지📜  ](https://www.notion.so/8b15ca756bc44ea29a07a0c7eabbbdcd)


| 기능 | 개발 여부 | 담당자 |
|:----------|:----------:|:----:|
|   | <img width=10px src=https://user-images.githubusercontent.com/63224278/123808035-58b4d800-d92b-11eb-9742-dd67600b20c8.png> | 오예원 |
|   | <img width=10px src=https://user-images.githubusercontent.com/63224278/123808035-58b4d800-d92b-11eb-9742-dd67600b20c8.png> | 오예원 |
|   | <img width=10px src=https://user-images.githubusercontent.com/63224278/123808035-58b4d800-d92b-11eb-9742-dd67600b20c8.png> | 황지은 |


<br>
<br>
 
 

## ChaRo Server Dev

<a href="https://github.com/TeamChaRo/ChaRo-Server/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TeamChaRo/ChaRo-Server" />
</a>

</br>
| 오예원 | 황지은 |
|:---:|:---------:|
| <img src="https://user-images.githubusercontent.com/63224278/119237669-f8d35080-bb78-11eb-9211-834eebd49dd1.PNG" width="200px" />  | <img src="https://user-images.githubusercontent.com/63224278/103209152-b436e680-4945-11eb-91e4-bd8622e442e2.png" width="200px" />  |
| [yaeoni](https://github.com/yaeoni) | [hwangji-dev](https://github.com/hwangJi-dev) |

<br>
<br>
