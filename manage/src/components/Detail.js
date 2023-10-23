import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Detail( ) {

    const name = sessionStorage.getItem("name");
    const phoneNum = sessionStorage.getItem("phoneNum");
    const busNum = sessionStorage.getItem("busNum");
    const busUid = sessionStorage.getItem("busUid");
    const company = sessionStorage.getItem("company");
    
    console.log(busUid);

    const navigate = useNavigate();
    
    const deleteDriver = () => {
      navigate(`/delete`);
    };
    const modifyDriver = () => {
      navigate(`/modify`);
    };

    useEffect(() => {
        // const fetchData = () => {
          axios.post(`http://10.20.106.98:8080/driver/detail`, null, {
            params:{
              busUid: busUid,
            }
          }) // 노선 ID
          .then(response => {
            // 가져온 데이터를 상태에 저장 response.data == bus Class
            console.log('EndPoint : 200 요청 성공', response.data.stationNames);
          })
          .catch(error => {
            console.log('error : 요청 실패');
            console.error('Error fetching bus stops:', error);
          });
  
  }, []);

    return (
        <>
          <h1>기사님 디테일 페이지</h1>
          <p>이름 : {name}</p>
          <p>연락처 : {phoneNum}</p>
          <p>버스 번호 : {busNum} 번</p>
          <p>버스 차량 번호 : {busUid}</p>
          <p>회사명 : {company}</p>
          <input type="button" value="삭제" onClick={deleteDriver(busUid)} />
          <input type="button" value="수정" onClick={modifyDriver(busUid)} />
        </>
    )
}

export default Detail;