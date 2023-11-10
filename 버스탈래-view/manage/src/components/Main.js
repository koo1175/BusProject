import React from 'react';
import { useNavigate } from 'react-router';

function Main() {

    const navigate = useNavigate();
    const goRegist = () => {
        navigate('/regist');
    }
    const goManage = () => {
        navigate('/manage');
    }
    return (
        <>
            <div style={{ 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                width: '100%', height: '100vh'
                }}>
                <button type="button" id='regist' onClick={goRegist}>
                기사님 등록
                </button>
                <button type="button" id='manage' onClick={goManage}>
                    기사님 관리
                </button>
            </div>
            
            
        </>
    )
}

export default Main;