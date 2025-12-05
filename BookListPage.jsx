import { useState } from 'react';


export default function BookListPage() {
    // 임시 상품 목록(데이터 나중에 가져오기)
    const books=[
        {id: 1, name: "Book1", image:"Link1"},
        {id: 2, name: "Book2", image:"Link2"},
        {id: 3, name: "Book3", image:"Link3"},
        {id: 4, name: "Book4", image:"Link4"},
        {id: 5, name: "Book5", image:"Link5"},
        {id: 6, name: "Book6", image:"Link6"},
        {id: 7, name: "Book7", image:"Link7"},
        {id: 8, name: "Book8", image:"Link8"},
        {id: 9, name: "Book9", image:"Link9"},
        {id: 10, name: "Book10", image:"Link10"},
        {id: 11, name: "Book11", image:"Link11"}

    ];
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("title");

        const booksPerPage = 10;
        const currentPage = 1;

        const startIndex = (currentPage - 1) * booksPerPage;
        const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

        return(
            <div style={{ padding: "20px" }}>
                <h1>도서 목록</h1>

                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                    <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}>
                        <option value="title">제목</option>
                        <option value="genre">장르</option>
                        <option value="author">저자</option>
                    </select>

                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button>검색</button>
                </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "20px",
                }}
            >
                {currentBooks.map(books=>(
                    <div key={books.id} style={{ textAlign: "center" }}>
                        <img
                            src={books.image}
                            alt={books.name}
                            style={{ width: "100px", height: "120px" }}
                        />
                        <p>{books.name}</p>
                    </div>
                ))}
             </div>
            </div>
            );
        }