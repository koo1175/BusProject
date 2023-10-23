import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [busNum, setBusNum] = useState(""); // XXX번 버스
  const [name, setName] = useState(''); // 기사님 이름
  const [busUid, setBusUid] = useState(''); // 차량 번호
  const [company, setCompany] = useState(""); // 회사명
  const [phone_num, setPhoneNum] = useState(""); // 연락처

  const navigate = useNavigate();
    
  const regist = async () => {
      try{
          await axios.post("http://10.20.106.98:8080/driver/create",null, {
              params: {
                bus_num: busNum,
                bus_uid: busUid,
                name: name,
                company: company,
                phone_num: phone_num,
              }
            }).then(response => {
              console.log("admin 계정 접속 완료", response.data);
              navigate('/main');
            }).catch(error => {
              console.log("접근 권한이 없습니다.", error);
            });
      }catch(error){
          console.log("Error Access Admin ", error);
      }
  }

  return (
    <div>
      <h1>기사님 등록 페이지</h1>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="000번 버스"
        value={busNum}
        onChange={(e) => setBusNum(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="차량 번호판 입력"
        value={busUid}
        onChange={(e) => setBusUid(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="회사명"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="연락처"
        value={phone_num}
        onChange={(e) => setPhoneNum(e.target.value)}
      />
      <br />
      <button type="button" id='regist' onClick={regist}>
        등록
      </button>
    </div>
  );
};

export default Register;
