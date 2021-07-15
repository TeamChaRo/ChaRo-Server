<img style="border: 0px solid black !important; border-radius:20px; " src="https://user-images.githubusercontent.com/63224278/125830017-40449c05-87e0-43b7-b80d-b8333443f57c.png" width="1500px"/> 
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

> **차로 ChaRo** <br/> 차에서의, 차로위에서의 즐거움을 추구하는 경험 기반 드라이브 코스 공유 플랫폼 <br />  Core Value : 차로의 핵심 가치는 '즐거움과 편리함'입니다. <br /><br /> SOPT 28th APPJAM  <br/> 프로젝트 기간: 2021.06.26 ~ 2021.07.17 <br/>

</br>

## ChaRo-Server Contributors

<a href="https://github.com/TeamChaRo/ChaRo-Server/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TeamChaRo/ChaRo-Server" />
</a>

<br>
<br>

## ✨Service IA
<img width=50% src=https://user-images.githubusercontent.com/63224278/123808257-8b5ed080-d92b-11eb-8ac7-e2ef5286909a.png>

<br>
<br>
 

## 📃 API DOC LINK
> [ChaRo-Server API Doc](https://www.notion.so/API-Wiki-ff615fc923104555b65b9b3c635e36d4)

<br>
<br>


## 🌈 Server Architecture
<img style="border: 0px solid black !important; border-radius:20px; " src="https://user-images.githubusercontent.com/63224278/125830951-f39281ce-1842-4ab0-9a17-0176a7028d18.png"/> 

- [Async & Await](https://www.npmjs.com/package/async)
- [request(HTTP)](https://www.npmjs.com/package/request)
- [Node.js](https://nodejs.org/ko/) - Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임
- [Express.js](http://expressjs.com/ko/) - Node.js 웹 애플리케이션 프레임워크
- [NPM](https://rometools.github.io/rome/) - 자바 스크립트 패키지 관리자
- [vscode](https://code.visualstudio.com/) - 편집기
- [mySQL](https://www.mysql.com/) - DataBase
- [Sequelize](https://sequelize.org/) - Sequelize ORM
- [AWS EC2](https://aws.amazon.com/ko/ec2/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_ec2_b&sc_content=ec2_e&sc_detail=aws%20ec2&sc_category=ec2&sc_segment=177228231544&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177228231544!e!!g!!aws%20ec2&ef_id=WkRozwAAAnO-lPWy:20180412120123:s) - 클라우드 환경 컴퓨팅 시스템

<br>
<br>



## ⚙️ Dependency Module
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
</div>
</details>

<br>
<br>


## 🧬 ERD & Models
<img width="360" alt="models" src="https://user-images.githubusercontent.com/63224278/125830346-e3502899-7efa-48b2-b88b-f28927323c6c.png">

<br>
<br>


## 💻 Coding Convention   
<details>
 <summary> 🗂 폴더구조 </summary>
 <div markdown="1">       


---
```markdown

🗂 node_modules
   
🗂 src

    - api 🗂

    - config 🗂

    - Loaders 🗂
    
    - middleware 🗂

    - models 🗂

    - service 🗂
   
    - controller 🗂
   

indes.ts
   
.env
   
nodemon.json
   
package.json
   
tsconfig.json

```
<br>
 </div>
 </details>
 

<details>
<summary> 🖋 네이밍 </summary>
<div markdown="1">       


---

**Class & Contructor**

- Class, Contructors는 **Pascal Case (=UpperCamelCase)**를 사용합니다.

  <kbd>좋은 예</kbd>

    ```typescript
    CamelCase
    ```

  <kbd>나쁜 예</kbd>

    ```typescript
    camelCase
    ```
<br/>
**함수 & 변수 & 상수**

- 함수와 변수에는 **lowerCamelCase**를 사용합니다.

- 함수의 경우 **동사+명사**형태로 구성합니다.
  - ex) getUserInformation()

- 글자의 길이
  - 글자의 길이는 **20자 이내**로 제한합니다.
  - 4단어 이상이 들어가거나, 부득이하게 20자 이상이 되는 경우에는 **팀원과의 상의**를 거쳐야 합니다.
    
- flag로 사용되는 변수
  - Boolean의 경우 **조동사+flag** 종류로 구성합니다.
  - ex) isNum, hasNum

- 약칭의 사용
  - 약어는 되도록 사용하지 않습니다.

  <kbd>좋은 예</kbd>

    ```typescript
    let index;
    let count;
    let array;
    let seoulToBucheon;
    ```

  <kbd>나쁜 예</kbd>
    
    ```typescript
    let idx;
    let cnt;
    let arr;
    let seoul2Bucheon;
    ```
<br>

</div>
</details>
 
 
 
 <details>
 <summary> 🏷 주석 </summary>
 <div markdown="1">       
 
 
 ---

 - 한줄은 `//`로 적고, 그 이상은 `/** */`로 적습니다.
 ```typescript
 // 한줄 주석일 때
 /**
  * 여러줄
  * 주석일 때
  */
 ```  
 - 함수에 대한 주석
   - backend에서 공통적으로 사용하는 함수의 경우, 모듈화를 통해 하나의 파일로 관리합니다.
   - 하나의 파일의 시작 부분에 주석으로 상세 내용을 작성합니다.
     - **함수의 전체 기능**에 대한 설명
     - **함수의 파라미터**에 대한 설명 (type: ..., 역할)
     - router 또는 api일 때에는 성공 여부도 적어줍니다.
     - 예시 코드

     ```typescript
     /**
      *  @route Post api/auth
      *  @desc Authenticate user & get token(로그인)
      *  @access Public
      */
     router.get(
      
     );
     ```
   
 <br>

 </div>
 </details>


<details>
<summary> 📎 기타 </summary>
<div markdown="1">       


---

- 탭 사이즈는 2로 사용합니다.
- 한 줄의 최대 길이는 80자로 제한합니다.
- 최대 tab depth 제한
  - tab의 최대 depth는 4로 제한합니다.
  - 이 이상으로 depth가 길어지면 함수를 통해 나눌 수 있도록 합니다.
  - 그 이상으로 개선할 수 없다고 판단되는 경우, 팀원들과의 코드리뷰를 통해 개선합니다.
  ```typescript
     function func() {
       //tab1
       if() {
         //tab2
         array.reduce((pre, cur) => {
           //tab3
           if(cur == status) {
             //tab4
           }
         }
       }
     }
     ```
- 괄호 사용
  - (if, while, for)문 괄호 뒤에 한칸을 띄우고 사용합니다.
  ```typescript
     if (left == true) {
	   // logic
     }
     ```
  
- 띄어쓰기
  ```typescript
  let a = 5;  ( = 양쪽 사이로 띄어쓰기 하기)
  if (a == 3) {
	  // logic
  }
  ```
</div>
</details>
 

👉🏻 [Coding Convention 한 눈에 보기](https://github.com/TeamChaRo/ChaRo-Server/wiki/CodingConvention)  
👉🏻 다음 [Style Guide](https://github.com/tipjs/javascript-style-guide)를 참고헀습니다.  
  
  
</br>

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

## <img width=3% img src="https://user-images.githubusercontent.com/63224278/124635517-7ef5ed00-dec2-11eb-9a42-6d6d5cc72dce.png" /> Github mangement
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

## 🚙 기능별 개발여부 + 담당자
> [ChaRo-Server 개발 일지](https://www.notion.so/_-bb545ae363334b57bee9d861ea3ba432)


| 기능 | 개발 여부 | 담당자 |
|:----------|:----------:|:----:|
| 모델 설계 | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원,황지은 |
| DB 연결 | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 이미지 업로드 | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 로그인 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은 |
| 회원가입 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은 |
| 닉네임 중복검사 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은 |
| 아이디 중복검사 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은 |
| 회원가입 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은 |
| 게시물 작성하기 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 메인뷰 조회 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은, 오예원 |
| 게시물 상세정보 조회 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은 |
| 더보기 게시물 내 최신순 필터 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 더보기 게시물 조회 및 좋아요 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 검색하기 게시물 조회 및 좋아요 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은 |
| 검색하기 게시물 내 최신순 필터 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 황지은 |
| 최근 검색 기록 저장 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 최근 검색 기록 조회 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 게시물 저장하기 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 게시물 좋아요 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 마이페이지 조회 (인기순, 최신순) API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png> | 오예원 |
| 게시물 수정하기 API | <img width=20px src=https://user-images.githubusercontent.com/63224278/125832335-4eed9f89-105c-4775-9195-11a1415fe2ed.png>s | 오예원 |


<br>
<br>
 

## 👩🏻‍💻 ChaRo-Server Dev

| 오예원 | 황지은 |
|:---:|:---------:|
| <img src="https://user-images.githubusercontent.com/63224278/119237669-f8d35080-bb78-11eb-9211-834eebd49dd1.PNG" width="200px" />  | <img src="https://user-images.githubusercontent.com/63224278/103209152-b436e680-4945-11eb-91e4-bd8622e442e2.png" width="200px" />  |
| [yaeoni](https://github.com/yaeoni) | [hwangji-dev](https://github.com/hwangJi-dev) |

<br>
<br>



<img style="border: 0px solid black !important; border-radius:20px; " src="https://user-images.githubusercontent.com/63224278/124624683-0db13c80-deb8-11eb-9af2-0fb6038066d0.png" width="1500px" height = "200px" /> 
