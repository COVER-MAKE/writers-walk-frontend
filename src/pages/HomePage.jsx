import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box, Grid, Card, CardContent, Container } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function HomePage() {
    return (
        <Box sx={{ py: 8, minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* 1. 상단 섹션 (제목 + 버튼) */}
            <Container maxWidth="md" sx={{ textAlign: 'center', mb: 8 }}>
                <Box sx={{ display: 'inline-flex', p: 2, bgcolor: '#e3f2fd', borderRadius: '50%', mb: 2 }}>
                    <MenuBookIcon sx={{ fontSize: 40, color: '#2196f3' }} />
                </Box>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    도서관리 시스템
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, wordBreak: 'keep-all' }}>
                    도서를 등록하고 관리하세요. AI가 도서 내용을 분석하여<br />
                    멋진 표지 이미지를 자동으로 생성해드립니다.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/books/new"
                        sx={{ px: 4, py: 1.5, borderRadius: 2, fontSize: '1.1rem', fontWeight: 'bold', bgcolor: '#2196f3' }}
                    >
                        + 새 도서 등록
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        component={Link}
                        to="/books"
                        sx={{ px: 4, py: 1.5, borderRadius: 2, fontSize: '1.1rem', fontWeight: 'bold', borderColor: '#2196f3', color: '#2196f3' }}
                    >
                        전체 목록 보기
                    </Button>
                </Box>
            </Container>

            {/* 2. 하단 기능 소개 카드 3개 */}
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">

                    {/* 카드 1: 도서 관리 */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: 4 }}>
                            <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                                <Box sx={{
                                    width: 50, height: 50, borderRadius: 2,
                                    bgcolor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#2196f3', mb: 2
                                }}>
                                    <LibraryBooksIcon fontSize="medium" />
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>도서 관리</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'keep-all', lineHeight: 1.6 }}>
                                    도서를 쉽고 빠르게 등록하고, 언제든지 수정하거나 삭제할 수 있습니다.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* 카드 2: 상세 정보 조회 */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: 4 }}>
                            <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                                <Box sx={{
                                    width: 50, height: 50, borderRadius: 2,
                                    bgcolor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#2196f3', mb: 2
                                }}>
                                    <MenuBookIcon fontSize="medium" />
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>상세 정보 조회</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'keep-all', lineHeight: 1.6 }}>
                                    등록된 도서의 줄거리, 저자, 출판일 등 상세 정보를 한눈에 확인할 수 있습니다.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* 카드 3: AI 표지 생성 */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: 4 }}>
                            <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                                <Box sx={{
                                    width: 50, height: 50, borderRadius: 2,
                                    bgcolor: '#e1f5fe', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#0288d1', mb: 2
                                }}>
                                    <AutoAwesomeIcon fontSize="medium" />
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>AI 표지 생성</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'keep-all', lineHeight: 1.6 }}>
                                    AI가 도서의 내용을 분석하여 책의 분위기에 딱 맞는 표지를 자동으로 만들어줍니다.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}

export default HomePage;