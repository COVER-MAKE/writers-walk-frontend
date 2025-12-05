import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// 레이아웃 불러오기
import MainLayout from './layouts/MainLayout';

// 페이지들 불러오기
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
// import BookListPage from './pages/BookListPage';
// import BookDetailPage from './pages/BookDetailPage';
import NewBookPage from './pages/NewBookPage';
import MyPage from './pages/MyPage';

function App() {
    return (
        <BrowserRouter>
            {/* CssBaseline: 브라우저 기본 스타일 초기화 */}
            <CssBaseline />

            <Routes>
                {/* 헤더 없는 페이지 */}
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signup" element={<SignupPage />} />

                {/* 헤더 있는 페이지 (MainLayout 적용) */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<div></div>/*<BookListPage />*/} />
                    <Route path="/books/new" element={<NewBookPage />} />
                    <Route path="/books/:id" element={<div></div>/*<BookDetailPage />*/} />
                    <Route path="/mypage" element={<MyPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
