import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


function Delete( ) {
  
  const name = sessionStorage.getItem("name");
  const phoneNum = sessionStorage.getItem("phoneNum");
  const busNum = sessionStorage.getItem("busNum");
  const busUid = sessionStorage.getItem("busUid");
  const company = sessionStorage.getItem("company");
    // const [drivers, seThrivers] = useState('');
    // const [test, setTest] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // const fetchData = () => {
          axios.post(`http://10.20.106.98:8080/driver/delete`, null, {
            params:{
              busUid: busUid,
            }
          }) // 노선 ID
          .then(response => {
            // 가져온 데이터를 상태에 저장 response.data == bus Class
            console.log('EndPoint : 200 요청 성공', response.data.stationNames);
            navigate('/main');
          })
          .catch(error => {
            console.log('error : 요청 실패');
            console.error('Error fetching bus stops:', error);
          });
  
  }, []);


    return (
        <>
        <h1>기사님 삭제 페이지</h1>
          <p>이름 : {name}</p>
          <p>연락처 : {phoneNum}</p>
          <p>버스 번호 : {busNum} 번</p>
          <p>버스 차량 번호 : {busUid}</p>
          <p>회사명 : {company}</p>
        </>
    )
}

export default Delete;