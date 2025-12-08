import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

function MyPage() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        email: '',
        joinDate: '',
    });

    const [myBooksCount, setMyBooksCount] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 로그인 상태 확인
                const checkResponse = await axios.get('http://localhost:8080/api/v1/auth/check');

                // status가 200인 경우에만 다음 단계 진행
                console.log(checkResponse.data);
                if (checkResponse.data.status === 200) {

                    // 내 정보 상세 조회
                    const meResponse = await axios.get('http://localhost:8080/api/v1/users/me');

                    if (meResponse.data.status === 200) {
                        const { email, createdAt } = meResponse.data.data;

                        // 날짜 포맷팅 (2025-12-07T... -> 2025. 12. 7.)
                        const dateObj = new Date(createdAt);
                        const formattedDate = `${dateObj.getFullYear()}. ${dateObj.getMonth() + 1}. ${dateObj.getDate()}.`;

                        setUserInfo({
                            email: email,
                            joinDate: formattedDate,
                        });
                    }
                } else {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate('/login');
                }
            } catch {
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = async () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (!confirmLogout) return;

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/logout');
            if(response.status === 200) {
                alert('로그아웃 되었습니다.');
                navigate('/login');
            }
        } catch {
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* 페이지 제목 */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                마이페이지
            </Typography>

            {/* 1. 내 정보 카드 */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    mb: 3,
                    border: '1px solid #e0e0e0',
                    borderRadius: 3
                }}
            >
                {/* 카드 헤더 */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PersonOutlineIcon sx={{ color: '#555', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                        내 정보
                    </Typography>
                </Box>

                {/* 정보 리스트 (이메일, 가입일) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, px: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 500 }}>이메일</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{userInfo.email || '불러오는 중...'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 500 }}>가입일</Typography>
                        <Typography sx={{ fontWeight: 500 }}>{userInfo.joinDate || '불러오는 중...'}</Typography>
                    </Box>
                </Box>

                {/* 로그아웃 버튼 */}
                <Button
                    variant="outlined"
                    fullWidth
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                        py: 1.5,
                        borderColor: '#e0e0e0',
                        color: '#555',
                        borderRadius: 2,
                        '&:hover': {
                            borderColor: '#bdbdbd',
                            bgcolor: '#f5f5f5'
                        }
                    }}
                >
                    로그아웃
                </Button>
            </Paper>

            {/* 2. 내가 등록한 책 카드 */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    border: '1px solid #e0e0e0',
                    borderRadius: 3,
                    minHeight: 200
                }}
            >
                {/* 카드 헤더 (제목 + 개수) */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <BookOutlinedIcon sx={{ color: '#555', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                            내가 등록한 책
                        </Typography>
                    </Box>
                    <Typography sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                        {myBooksCount}권
                    </Typography>
                </Box>

                {/* 리스트가 비었을 때 보여줄 화면 */}
                {myBooksCount === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4, color: '#9e9e9e' }}>
                        <Typography>아직 등록한 책이 없습니다.</Typography>
                    </Box>
                ) : (
                    // 나중에 책이 있을 때 여기에 리스트 렌더링
                    <Box>책 리스트가 여기에 들어옵니다.</Box>
                )}
            </Paper>
        </Container>
    );
}

export default MyPage;