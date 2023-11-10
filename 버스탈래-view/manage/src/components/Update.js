import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Update( ) {

    const navigate = useNavigate();

    const name = sessionStorage.getItem("name");
    const phoneNum = sessionStorage.getItem("phoneNum");
    const busNum = sessionStorage.getItem("busNum");
    const busUid = sessionStorage.getItem("busUid");
    const company = sessionStorage.getItem("company");

    const [uName, setUName] = useState('');
    const [uPhoneNum, setUPhoneNum] = useState('');
    const [uBusNum, setUBusNum] = useState('');
    const [uBusUid, setUBusUid] = useState('');
    const [uCompany, setUCompany] = useState('');


  const updateDriver = () => {
    sessionStorage.setItem("uName", uName);
    sessionStorage.setItem("uPhoneNum", uPhoneNum);
    sessionStorage.setItem("uBusNum", uBusNum);
    sessionStorage.setItem("uBusUid", uBusUid);
    sessionStorage.setItem("uCompany", uCompany);
    navigate(`/updateCheck`);
  };


    return (
        <>
        <h1>기사님 관리 페이지</h1>
        이름 : <input onChange={(event) => setUName(event.target.value)} placeholder={name}></input><br />
        연락처 : <input onChange={(event) => setUPhoneNum(event.target.value)} placeholder={phoneNum}></input><br />
        버스 번호 : <input onChange={(event) => setUBusNum(event.target.value)} placeholder={busNum}></input><br />
        버스 차량 번호 : <input onChange={(event) => setUBusUid(event.target.value)} placeholder={busUid}></input><br />
        회사명 : <input onChange={(event) => setUCompany(event.target.value)} placeholder={company}></input><br />
        <button onClick={updateDriver}>확인</button>
        </>
    )
}

export default Update;