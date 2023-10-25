import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Delete( ) {
  
  const name = sessionStorage.getItem("name");
  const phoneNum = sessionStorage.getItem("phoneNum");
  const busNum = sessionStorage.getItem("busNum");
  const busUid = sessionStorage.getItem("busUid");
  const company = sessionStorage.getItem("company");
  const navigate = useNavigate();

    useEffect(() => {
        // const fetchData = () => {
        axios.post(`https://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/driver/delete`, null, {
          // axios.post(`https://10.20.106.156:8080/driver/delete`, null, {
              params:{
              bus_uid: busUid,
            }
          }) // 노선 ID
          .then(response => {
            // 가져온 데이터를 상태에 저장 response.data == bus Class
            console.log('Delete : 200 요청 성공', response.data.stationNames);
            navigate('/main');
          })
          .catch(error => {
            console.log('error : 요청 실패');
            console.error('Error fetching bus stops:', error);
          });
  
  }, []);


    return (
        <>

      </>
    )
}

export default Delete;