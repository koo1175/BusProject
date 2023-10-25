import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Modify( ) {

    const name = sessionStorage.getItem("uName");
    const phoneNum = sessionStorage.getItem("uPhoneNum");
    const busNum = sessionStorage.getItem("uBusNum");
    const busUid = sessionStorage.getItem("uBusUid");
    const company = sessionStorage.getItem("uCompany");
    
    console.log("updateCheck 실행", name);

    const navigate = useNavigate();

    useEffect(() => {
        // const fetchData = () => {
          axios.post(`https://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/driver/update`, null, {
          // axios.post(`https://10.20.106.156:8080/driver/update`, null, {
              params:{
                bus_uid: busUid,
                name : name,
                phone_num : phoneNum,
                bus_num : busNum,
                company : company,
            }
          }) // 노선 ID
          .then(response => {
            // 가져온 데이터를 상태에 저장 response.data == bus Class
            console.log('UpdateCheck : 200 요청 성공', response.data.stationNames);
            navigate('/manage');
          })
          .catch(error => {
            console.log('error : 요청 실패');
            console.error('Error fetching bus stops:', error);
            navigate('/manage');
          });
  
  }, []);



    return (
        <>
        
        </>
    )
}

export default Modify;