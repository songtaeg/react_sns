react 미니프로젝트
--
🔔 소개
+ react를 이용해서 sns 기반 사이트 구현
+ 서버 (https://github.com/songtaeg/react_sns_server)
---
💻 개발 기간
+ 2024.10.23~2024.10.30
---
🚀 사용 언어

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JAVASCRIPT](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![MYSQL](https://img.shields.io/badge/MySQL-4285F4?style=for-the-badge&logo=mysql&logoColor=white)

---
🖍 기능
    
1. 로그인
   + 회원 가입

2. 회원 가입
   + 아이디 중복 체크
   + 비밀번호 / 비밀번호 확인
     
- 메인 페이지
3. 피드
   + 피드 누르면 상세 내용 보여줌
   + 본인 피드 삭제 가능
   + 댓글 기능 (자신 댓글 삭제 가능)

4. 피드 등록
   + 제목,내용, 사진(선택사항) 등록 
     
5. 마이페이지
   + 본인 소개(구현 X) 디폴트

---
데이터베이스(DB)
[reactsns_db.xlsx](https://github.com/user-attachments/files/17568152/reactsns_db.xlsx)


---
📚 후기: 
가장 잘한 점은 사용자 인증 시스템과 게시물/댓글 관리 기능을 안정적으로 구현한 부분입니다.<br/> 
특히 로그인/회원가입 기능에서 JWT(Json Web Token)를 활용하여 보안을 강화하고, 클라이언트와 서버 간에 사용자 인증을 명확히 처리할 수 있었습니다. 이를 통해 사용자의 개인정보 보호와 안전한 로그인 시스템을 제공할 수 있었습니다. 또한 게시물 등록과 삭제, 댓글 작성 및 삭제 기능를 구현하여 직관적인 UI를 통해 사용자 경험을 크게 향상시킬 수 있었습니다. 사용자가 본인의 게시물과 댓글을 삭제할 수 있는 기능을 제공함으로써 실제 SNS 사이트와 비슷한 사용자 경험을 구현했다고 생각합니다.

아쉬운 점은 마이페이지 기능을 구현 하지 못한 것입니다.<br/> 
마이페이지는 사용자가 본인이 작성한 피드나 댓글을 쉽게 확인하는 기능입니다. 이를 통해 사용자는 자신의 활동을 관리하고, 더 나은 경험을 제공받을 수 있습니다. SNS 사이트에서 마이 페이지는 매우 중요한 요소인데, 이를 구현하지 못해 아쉬웠습니다. 향후에는 마이페이지 기능을 추가하고, 사용자가 본인이 작성한 피드 목록을 볼 수 있도록 할 계획입니다. <br/>
또한, 마이페이지에서 사용자 정보 수정이나 비밀번호 변경과 같은 추가적인 기능을 구현함으로써, 사용자가 사이트 내에서 자신의 정보를 효율적으로 관리할 수 있도록 개선할 것입니다.

