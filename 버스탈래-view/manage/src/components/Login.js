import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Outer = styled.div`
position: relative;
background-color: #E4E9FF;
`

const InnerDiv = styled.div`
position: absolute;
width: 40%;
height: 60%;
left: 35%;
margin-top: 20%;

background: #FFFFFF;
border-radius: 2px;
`

const IdDiv = styled.input`
position: absolute;
width: 40%;

background: #FFFFFF;
border: 0.1px solid #000000;
border-radius: 3px;

`

const PwDiv = styled.input`
position: absolute;
width: 40%;

margin-top: 5%;
background: #FFFFFF;
border: 0.1px solid #000000;
border-radius: 3px;
`

const LoginBtn = styled.button`
    position: absolute; 
    width: 40%;

    margin-top: 15%;
    background: #6691FF;
    border-radius: 3px;
`

const Text = styled.td`
position: absolute;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 3px;
line-height: 4px;

color: #000000;

`


function Login() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    
    const login = async () => {
        try{
            await axios.post("https://port-0-java-springboot-12fhqa2blnemug25.sel5.cloudtype.app/user/login",null, {
            // await axios.post("https://10.20.106.156:8080/user/login",null, {
                    params: {
                  user_id: userId,
                  password: password,
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
        <>
        <Outer>
            <InnerDiv>
            <tr>
                ID
            </tr>
            <tr>
                <IdDiv type='text' id='id' onChange={(e) => setUserId(e.target.value)}></IdDiv>
                
            </tr>
            <tr>
                PW
            </tr>
            <tr>
                <PwDiv type='password' id='pw' onChange={(e) => setPassword(e.target.value)}></PwDiv>

            </tr>
            <tr>
                <LoginBtn type="button" id='login' onClick={login}>
                    로그인
                </LoginBtn>
            </tr>
              
            </InnerDiv>
        </Outer>
        </>
    )
}

// // inner css Example
// const Login_but = styled.button`
// border: none;
// justify-content
// `

export default Login;