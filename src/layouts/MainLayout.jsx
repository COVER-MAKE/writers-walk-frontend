import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function MainLayout() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            {/* 파란색 AppBar */}
            <AppBar position="static" elevation={0} sx={{ bgcolor: '#2196f3' }}>
                <Toolbar sx={{ height: 64 }}>
                    {/* 로고 */}
                    <MenuBookIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            도서관리
                        </Link>
                    </Typography>

                    {/* 메뉴 버튼들 */}
                    <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 500 }}>홈</Button>
                    <Button color="inherit" component={Link} to="/books" sx={{ fontWeight: 500 }}>도서 목록</Button>
                    <Button color="inherit" component={Link} to="/books/new" sx={{ fontWeight: 500 }}>새 도서 등록</Button>
                    <Button color="inherit" component={Link} to="/mypage" sx={{
                        ml: 2,
                        bgcolor: 'rgba(255,255,255,0.15)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                    }}>
                        마이페이지
                    </Button>
                </Toolbar>
            </AppBar>

            {/* 컨텐츠 영역 */}
            <Container maxWidth="xl" sx={{ mt: 5, mb: 5, flexGrow: 1 }}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default MainLayout;