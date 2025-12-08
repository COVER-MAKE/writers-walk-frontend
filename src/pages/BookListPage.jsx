import { useState } from 'react';

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { useNavigate } from "react-router-dom";



export default function BookListPage() {
    // 임시 상품 목록(데이터 나중에 가져오기)
    const books = [
        {
            id: 1,
            name: "Book1",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA2T11Ya_1vQ32OhYaTgi37lanDQevZO-SjQ&s"
        },
        {id: 2, name: "Book2", image: ""},
        {id: 3, name: "Book3", image: ""},
        {id: 4, name: "Book4", image: ""},
        {id: 5, name: "Book5", image: ""},
        {id: 6, name: "Book6", image: ""},
        {id: 7, name: "Book7", image: ""},
        {id: 8, name: "Book8", image: ""},
        {id: 9, name: "Book9", image: ""},
        {id: 10, name: "Book10", image: ""},
        {id: 11, name: "Book11", image: ""}

    ];

    // 버튼 클릭 횟수 상태
    const [count, setCount] = useState(0)


    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const changePage = (event, value) => {
        setCurrentPage(Number(value));  // ★ 숫자로 변환
    };
    // 버튼 클릭 시 새 창 열기 + 클릭 횟수 증가
    const handleClick = () => {
        setCount(count + 1);
        console.log("버튼 클릭됨");
    };

    const pages = 5;

    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("title");

    const booksPerPage = 10;

    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

    return (
        <div style={{padding: "20px"}}>
            <h1>도서 목록</h1>


            <div style={{display: "flex", gap: "10px", marginBottom: "20px"}}>
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}>
                    <option value="title">제목</option>
                    <option value="genre">장르</option>
                    <option value="author">키워드</option>
                </select>

                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{flex: 1}}
                />
                <button onClick={handleClick}>
                    검색
                </button>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "40px",
                    marginTop: "100px"
                }}
            >

                {currentBooks.map(books => (
                    <div key={books.id} style={{textAlign: "center"}}
                         onClick={() => navigate(`/books/${books.id}`)}>
                        <div
                            style={{
                                width: "150px",
                                height: "200px",
                                margin: "0 auto",
                                borderRadius: "4px",
                                overflow: "hidden",
                                backgroundColor: books.image ? "transparent" : "#e0e0e0",
                                border: books.image ? "none" : "1px solid #ccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {books.image ? (
                                <img
                                    src={books.image}
                                    alt={books.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            ) : (
                                // 이미지 없을 때 네모 상자
                                <span style={{color: "#999"}}>No Image</span>
                            )}
                        </div>

                        <p>{books.name}</p>
                    </div>
                ))}


            </div>
            <div style={{width: "100%", marginTop: "100px"}}>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "nowrap",   // ★ 강제 한 줄
                        overflow: "hidden"    // ★ 혹시라도 밀려도 한 줄 유지
                    }}
                >

                    <Pagination
                        count={pages}
                        page={currentPage}
                        onChange={changePage}
                        siblingCount={0}   // 숫자 0 중요!
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        renderItem={(item) => {
                            // 해당 페이지 범위 계산
                            const start = (item.page - 1) * booksPerPage;
                            const end = start + booksPerPage;

                            // 항목이 없으면 true
                            const isEmpty = books.slice(start, end).length === 0;

                            return (
                                <PaginationItem
                                    {...item}
                                    disabled={isEmpty}   // 항목 없으면 클릭 불가 + 회색 처리
                                />
                            );
                        }}
                    />
                </div>
                </div>
            </div>
    )
}