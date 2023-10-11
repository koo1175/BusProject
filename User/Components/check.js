// // check.js
//
// function isThatRight(){
//     let inputId = document.getElementById('id');
//     let inputPw = document.getElementById('pw');
//     let inputPw2 = document.getElementById('pw2');
//     let inputName = document.getElementById('name');
//     let inputPhone = document.getElementById('phone');
//
//     // 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~12자리인지 검사
//     let regexrId = /^[a-zA-Z0-9]{4,12}$/;
//     // 알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~12자리인지 검사
//     let regexrPw = /^[a-zA-Z0-9]{4,12}$/;
//     // 이름
//     let regexrName = /^[가-힣]{2,4}$/;
//     // 전화 번호 형식
//     let regexrPhone = /\d{3}-\d{3,4}-\d{4}/g;
//     if(inputId.value == ""){
//         alert('아이디를 입력해주세요.');
//         inputId.focus();
//         return false;
//     }
//     if(!regexrId.test(inputId.value)){
//         alert("아이디는 영어 대소문자 또는 숫자로 시작하고 끝나며 4~12자리로 입력해야합니다.");
//         inputId.value = "";
//         inputPhone.focus();
//         return false;
//     }
//     if(!regexrPw.test(inputPw.value)){
//         alert("비밀번호는 영어 대소문자 또는 숫자로 시작하고 끝나며 4~12자리로 입력해야합니다.");
//         inputPw.value = "";
//         inputPw.focus();
//         return falseqwe
//     }
//     if (inputPw.value == inputId.value) {
//         alert('아이디와 비밀번호는 동일할 수 없습니다.');
//         inputPw.value = "";
//         inputPw2.value = "";
//         inputPw.focus();
//         return false;
//     }
//     if (inputPw.value !== inputPw2.value) {
//         alert('비밀번호가 일치하지 않습니다.');
//         inputPw2.value = "";
//         inputPw2.focus();
//         return false;
//     }
//
//     if(!regexrName.test(inputName.value)){
//         alert("이름이 올바르지 않습니다.");
//         inputName.value = "";
//         inputName.focus();
//         return false;
//     }
//
//
//     if(!regexrPhone.test(inputPhone.value)){
//         alert("핸드폰 번호가 올바르지 않습니다.");
//         inputPhone.value = "";
//         inputPhone.focus();
//         return false;
//     }
// }
//
