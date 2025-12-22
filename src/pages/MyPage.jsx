import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Container, Typography, Paper, Box, Button, Grid, Card, CardMedia, Chip} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';

function MyPage() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        email: '',
        joinDate: '',
    });

    const [myBooks, setMyBooks] = useState([]);
    const [myBooksCount, setMyBooksCount] = useState(0);

    const genreColors = {
        NOVEL: "primary",
        FANTASY: "secondary",
        ESSAY: "info",
        POETRY: "error",
        HISTORY: "success",
        SCIENCE: "default"
    };

    const genreNames = {
        NOVEL: "소설",
        FANTASY: "판타지",
        ESSAY: "에세이",
        POETRY: "시",
        HISTORY: "역사",
        SCIENCE: "과학"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const checkResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/check`);
                if (checkResponse.data.status === 200) {
                    const meResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`);
                    if (meResponse.data.status === 200) {
                        const { email, createdAt } = meResponse.data.data;
                        const dateObj = new Date(createdAt);
                        const formattedDate = `${dateObj.getFullYear()}. ${dateObj.getMonth() + 1}. ${dateObj.getDate()}.`;
                        setUserInfo({ email, joinDate: formattedDate });
                    }

                    const booksResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me/books`);
                    if (booksResponse.data.status === 200) {
                        const { books, totalCount } = booksResponse.data.data;
                        setMyBooks(books);
                        setMyBooksCount(totalCount);
                    }
                } else {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate("/login");
                }
            } catch {
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = async () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (!confirmLogout) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`);
            if(response.status === 200) {
                alert('로그아웃 되었습니다.');
                navigate("/login");
            }
        } catch {
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                마이페이지
            </Typography>

            {/* 내 정보 카드 */}
            <Paper elevation={0} sx={{ p: 4, mb: 3, border: '1px solid #e0e0e0', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PersonOutlineIcon sx={{ color: '#555', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                        내 정보
                    </Typography>
                </Box>
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
                        '&:hover': { borderColor: '#bdbdbd', bgcolor: '#f5f5f5' }
                    }}
                >
                    로그아웃
                </Button>
            </Paper>

            {/* 내가 등록한 책 카드 */}
            <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: 3, minHeight: 200 }}>
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

                {myBooks.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4, color: '#9e9e9e' }}>
                        <Typography>아직 등록한 책이 없습니다.</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 10 }}>
                        {myBooks.map((book) => (
                            <Grid item xs={1} sm={2} md={2} key={book.id}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        bgcolor: 'transparent',
                                        borderRadius: 2,
                                        position: 'relative',
                                        cursor: 'pointer',
                                        '&:hover .book-title': { color: '#2196f3' }
                                    }}
                                    onClick={() => navigate(`/books/${book.id}`)}
                                >
                                    {/* 썸네일 영역 */}
                                    <Box sx={{
                                        position: 'relative',
                                        width: '180px',
                                        pt: '150%',
                                        bgcolor: '#e3f2fd',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        mb: 1.5,
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
                                    }}>
                                        <Chip
                                            label={genreNames[book.genre] || book.genre}
                                            size="small"
                                            color={genreColors[book.genre] || "default"}
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                zIndex: 1,
                                                fontWeight: 'bold',
                                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                                color: '#333',
                                                height: '24px',
                                                fontSize: '0.75rem',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        />

                                        {book.thumbnailUrl ? (
                                            <CardMedia
                                                component="img"
                                                image={book.thumbnailUrl}
                                                alt={book.title}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0, left: 0, right:0, bottom:0,
                                                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                                                color:'#90caf9'
                                            }}>
                                                <BookOutlinedIcon sx={{ fontSize: 40, mb:1 }} />
                                                <Typography variant="caption" sx={{ color: '#64b5f6' }}>표지 없음</Typography>
                                            </Box>
                                        )}
                                    </Box>

                                    {/* 책 제목 영역 */}
                                    <Box sx={{ px: 0.5 }}>
                                        <Typography
                                            className="book-title"
                                            variant="subtitle2"
                                            component="div"
                                            title={book.title}
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#333',
                                                textAlign: 'center',
                                                transition: 'color 0.2s'
                                            }}
                                        >
                                            {book.title.length > 10
                                                ? `${book.title.substring(0, 10)}...`
                                                : book.title}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Paper>
        </Container>
    );
}

export default MyPage;