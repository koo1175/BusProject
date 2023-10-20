import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function Detail() {

    // const [drivers, seThrivers] = useState('');
    // const [test, setTest] = useState('');/
    const [names, setNames] = useState('');
    const [busUids, setBusUids] = useState('');
    const [busNums, setBusNums] = useState('');
    const [phoneNums, setPhoneNums] = useState('');
    const [companys, setCompanys] = useState('');

    const { id } = useParams();

    // const navigate = useNavigate();/
    const deleteDriver = (id) => {
      axios.post();
    };

    useEffect(() => {
        // const fetchData = () => {
          axios.post(`http://10.20.106.112:8080/driver/detail`, null, {
            params:{

            }
          }) // 노선 ID
          .then(response => {
            // 가져온 데이터를 상태에 저장 response.data == bus Class
            setNames(response.data.stationNames);
            setBusUids(response.data.bus_uid)
            setBusNums(response.data.bus_num);
            setPhoneNums(response.data.phone_num);
            setCompanys(response.data.company);
            console.log('EndPoint : 200 요청 성공', response.data.stationNames);
          })
          .catch(error => {
            console.log('error : 요청 실패');
            console.error('Error fetching bus stops:', error);
          });
  
  }, []);

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
            <TableRow key={index}>
              <Td>{names}</Td>
              <Td>{phoneNums}</Td>
              <Td>{busNums}</Td>
              <Td>{busUids}</Td>
              <Td>{companys}</Td>
            </TableRow>
          ))}
          </tbody>
          <input type="button" value="삭제" onClick={deleteDriver(id)} />
        </Table>
        
        </>
    )
}

export default Detail;