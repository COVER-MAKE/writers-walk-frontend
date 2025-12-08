import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Chip,
    Paper,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function BookDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        id: 1,
        title: "에이블스쿨 7기의 여정",
        content: "에이블스쿨 7기 학생들의 성장 이야기를 담은 책입니다. AI와 데이터 분석을 배우며 성장하는 과정을 기록했습니다. 팀 프로젝트와 해커톤을 거치며 진정한 개발자로 거듭나는 그들의 열정과 노력을 엿볼 수 있습니다.",
        genre: "NOVEL",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQileziPs4UMKdTjbFFY4_ZjZANhGjoCdzhtw&s",
    });

    const [apiKey, setApiKey] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleAiCoverClick = async () => {
        let currentKey = apiKey;

        if (!currentKey) {
            const inputKey = window.prompt("OpenAI API Key를 입력해주세요 (sk-...):");
            if (!inputKey) return;

            const cleanKey = inputKey.trim();

            setApiKey(cleanKey);
            currentKey = cleanKey;
        }

        currentKey = currentKey.trim();

        setIsGenerating(true);
        setErrorMsg(null);

        try {
            const prompt = `A book cover for a ${book.genre} genre book titled "${book.title}". 
                            The content is about: ${book.content.substring(0, 100)}. 
                            High quality, artistic, minimal text.`;

            const response = await fetch("/openai/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentKey}`,
                },
                body: JSON.stringify({
                    model: "dall-e-3",
                    prompt: prompt,
                    n: 1,
                    size: "1024x1024",
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || "이미지 생성 실패");
            }

            const data = await response.json();
            const generatedImageUrl = data.data[0].url;

            console.log("생성된 이미지:", generatedImageUrl);

            await axios.put(`/api/v1/books/${id}/cover-url`, { thumbnailUrl: generatedImageUrl });

            setBook((prev) => ({
                ...prev,
                image: generatedImageUrl
            }));

            alert("표지가 성공적으로 생성되었습니다!");

        } catch (error) {
            console.error("Error generating cover:", error);
            setErrorMsg(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* 상단 네비게이션 및 버튼 영역 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/books')}
                    sx={{ color: 'text.secondary' }}
                >
                    목록으로 돌아가기
                </Button>

                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<EditIcon />} color="primary">
                        수정
                    </Button>
                    <Button variant="contained" startIcon={<DeleteIcon />} color="error">
                        삭제
                    </Button>
                </Stack>
            </Box>

            {/*메인 컨텐츠 영역 */}
            <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                    <Box
                        component="img"
                        src={book.image}
                        alt={book.title}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 2,
                            boxShadow: 3,
                            mb: 2,
                            objectFit: 'cover',
                            aspectRatio: '2/3',
                            opacity: isGenerating ? 0.5 : 1, // 로딩 중 흐리게
                            transition: 'opacity 0.3s'
                        }}
                    />
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                        onClick={handleAiCoverClick}
                        disabled={isGenerating}
                        sx={{ py: 1.5, borderRadius: 2, borderColor: '#ddd', color: '#555', '&:hover': { bgcolor: '#f5f5f5' } }}
                    >
                        {isGenerating ? "AI가 표지를 그리는 중..." : "AI 표지 생성"}
                    </Button>
                    {/* 에러 메시지 */}
                    {errorMsg && (
                        <Alert severity="error" sx={{ mt: 2, fontSize: '0.8rem' }}>
                            {errorMsg}
                        </Alert>
                    )}
                </Box>

                {/* 오른쪽: 상세 정보 (제목, 장르, 내용) */}
                <Box sx={{ flex: 1, minWidth: '300px', maxWidth: '600px' }}>
                    <Box sx={{ mb: 2 }}>
                        <Chip
                            label={book.genre}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 'bold', px: 1 }}
                        />
                    </Box>

                    {/* 제목 */}
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        {book.title}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 3, border: '1px solid #eee' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                            책 내용
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#444', whiteSpace: 'pre-line' }}>
                            {book.content}
                        </Typography>
                    </Paper>
                </Box>

            </Box>
        </Container>
    );
}