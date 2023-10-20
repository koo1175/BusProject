import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Manage() {

    // const [drivers, seThrivers] = useState([]);
    const [test, setTest] = useState('');
    const [names, setNames] = useState([]);
    const [busUids, setBusUids] = useState([]);
    const [busNums, setBusNums] = useState([]);
    const [phoneNums, setPhoneNums] = useState([]);
    const [companys, setCompanys] = useState([]);

    const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/detail/${id}`);
      
    };

    // const navigate = useNavigate();
    const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  `;
  
  const Th = styled.th`
    background-color: #f2f2f2;
    padding: 10px;
    text-align: left;
  `;
  
  const Td = styled.td`
    padding: 10px;
    border: 1px solid #ccc;
  `;
  
  const TableRow = styled.tr`
  &:not(:last-child) {
    margin-bottom: 10px; /* 행 사이의 간격을 조절합니다. */
  }
`;

    useEffect(() => {
        // 스프링 부트 서버(BusRouteAllListController)에서 api에 요청해서 받아온 정류장 데이터를 가져온다
        axios.post("http://10.20.106.57:8080/driver/all", {}) 
          .then(response => {
            // seThrivers(response.data);
            setTest(response.data.driverNames);
            setNames(response.data.driverNames);
            setBusNums(response.data.busNums);
            setBusUids(response.data.busUids);
            setPhoneNums(response.data.phoneNums);
            setCompanys(response.data.companys);
          })
          .catch(error => {
            console.error('Error fetching bus stops:', error);
            setTest(error.toString())
          });
      }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때 한 번만 실행
      
      
    return (
        <>
        <h1>기사님 관리 페이지</h1>
        <Table>
          <thead>
          <tr>
            <Th>기사님 이름</Th>
            <Th>기사님 연락처</Th>
            <Th>버스 번호</Th>
            <Th>차량 번호</Th>
            <Th>회사명</Th>
          </tr>
          </thead>
          <tbody>
          {names.map((item, index) => (
            <TableRow key={index} onClick={() => handleClick(busUids[index])}>
              <Td>{names[index]}</Td>
              <Td>{phoneNums[index]}</Td>
              <Td>{busNums[index]}</Td>
              <Td>{busUids[index]}</Td>
              <Td>{companys[index]}</Td>
            </TableRow>
          ))}
          </tbody>
        </Table>
        
        </>
    )
}

export default Manage;