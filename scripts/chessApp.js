import { createAppContainer, moveApp } from "./utility.js";
import { chessPiecesData } from "./chessPieces.js";

const mainScreen = document.querySelector(".main-screen__allowed-area");
mainScreen.appendChild(createAppContainer("Chess-App"));
moveApp(document.querySelector(".allowed-area__chess-app"));

const chessMain = document.querySelector(".chess-app__main");

const boardCon = document.createElement("div");
boardCon.classList.add("main");
boardCon.classList.add("main__chess-board");

chessMain.append(boardCon);

const renderBoard = (arr) => {
    const boardCon = document.querySelector(".main__chess-board");
    let isAlternating = false;
    for (let y = 0; y < arr.length; y++) {
        boardCon.innerHTML += `<div class="chess-board__chess-col chess-col"></div>`;
        for (let x = 0; x < arr[y].length; x++) {
            const column = document.querySelectorAll(`.chess-col`);
            let isPiece = arr[y][x].display;
            if (
                (x % 2 === 0 && isAlternating) ||
                (x % 2 !== 0 && !isAlternating)
            ) {
                if (!isPiece) {
                    isPiece = "";
                }
                column[
                    y
                ].innerHTML += `<div class="chess-board__chess-cell chess-cell chess-cell--black">${isPiece}</div>`;
            } else {
                if (!isPiece) {
                    isPiece = "";
                }
                column[
                    y
                ].innerHTML += `<div class="chess-board__chess-cell chess-cell chess-cell--white">${isPiece}</div>`;
            }
        }
        isAlternating = !isAlternating;
    }
};

const boardArr = [
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
];

const populateBoard = (chessPiecesData, board) => {
    const placePawns = (chessPiecesData, board) => {
        let newBoard = [];
        for (const player in chessPiecesData) {
            newBoard = chessPiecesData[player].pawns.reduce((acc, piece) => {
                acc[piece.position.x][piece.position.y] = { ...piece };
                return acc;
            }, board);
        }
        return newBoard;
    };
    const placeKnights = (chessPiecesData, board) => {
        let newBoard = [];
        for (const player in chessPiecesData) {
            newBoard = chessPiecesData[player].knights.reduce((acc, piece) => {
                acc[piece.position.x][piece.position.y] = { ...piece };
                return acc;
            }, board);
        }
        return newBoard;
    };
    const placeBishops = (chessPiecesData, board) => {
        let newBoard = [];
        for (const player in chessPiecesData) {
            newBoard = chessPiecesData[player].bishops.reduce((acc, piece) => {
                acc[piece.position.x][piece.position.y] = { ...piece };
                return acc;
            }, board);
        }
        return newBoard;
    };
    const placeRooks = (chessPiecesData, board) => {
        let newBoard = [];
        for (const player in chessPiecesData) {
            newBoard = chessPiecesData[player].rooks.reduce((acc, piece) => {
                acc[piece.position.x][piece.position.y] = { ...piece };
                return acc;
            }, board);
        }
        return newBoard;
    };
    const placeQueens = (chessPiecesData, board) => {
        for (const player in chessPiecesData) {
            const queen = chessPiecesData[player].queen;
            board[queen.position.x][queen.position.y] = queen;
        }
        return board;
    };
    const placeKings = (chessPiecesData, board) => {
        for (const player in chessPiecesData) {
            const king = chessPiecesData[player].king;
            board[king.position.x][king.position.y] = king;
        }
        return board;
    };
    const placePiecesArr = [
        placeBishops,
        placeKings,
        placeKnights,
        placePawns,
        placeQueens,
        placeRooks,
    ];
    const finaliseBoard = (chessPiecesData, board, placePiecesArr) => {
        let newBoard = board;
        for (let i = 0; i < placePiecesArr.length; i++) {
            newBoard = placePiecesArr[i](chessPiecesData, board);
        }
        return newBoard;
    };
    return finaliseBoard(chessPiecesData, board, placePiecesArr);
};

renderBoard(populateBoard(chessPiecesData, boardArr));

/*
different types of chess pieces
pawn
knight
bishop
rook
king
queen


*/
