import { createAppContainer, moveApp } from "./utility.js";
import { chessPiecesData } from "./chessPieces.js";

const mainScreen = document.querySelector(".main-screen__allowed-area");
mainScreen.appendChild(createAppContainer("Chess-App"));
moveApp(document.querySelector(".allowed-area__chess-app"));

const chessMain = document.querySelector(".chess-app__main");
// create a board container to hold the chess pieces
const boardCon = document.createElement("div");
boardCon.classList.add("main");
boardCon.classList.add("main__chess-board");

chessMain.append(boardCon);

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

let heldPiece = false;

// render board from an array
const renderBoard = (arr) => {
    const boardCon = document.querySelector(".main__chess-board");
    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr[x].length; y++) {
            const div = arr[x][y].html;
            if (arr[x][y].piece.display) {
                div.innerHTML = arr[x][y].piece.display;
            } else {
                div.innerHTML = "";
            }
            boardCon.append(div);
        }
    }
};

//  render board after each move
const populateBoardArr = (chessPiecesData, board, movePiece) => {
    const fillCell = (chessPiecesData, board) => {
        let newBoard = board;
        // used to alternate the checkered board pattern
        let isAlternating = false;

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const html = document.createElement("div");
                html.classList.add("chess-board__chess-cell");
                html.classList.add("chess-cell");
                html.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    movePiece(x, y, board);
                });
                html.addEventListener("mouseup", (e) => {
                    e.preventDefault();
                    placePiece(x, y, board);
                });
                // used to create a checkered board pattern
                if (
                    (y % 2 === 0 && isAlternating) ||
                    (y % 2 !== 0 && !isAlternating)
                ) {
                    html.classList.add("chess-cell--black");
                } else {
                    html.classList.add("chess-cell--white");
                }
                const cellObject = {
                    html: html,
                    piece: false,
                    position: { x: x, y: y },
                };
                newBoard[x][y] = { ...cellObject };
            }
            isAlternating = !isAlternating;
        }
        return newBoard;
    };
    //place pawns on the board
    const placePawns = (chessPiecesData, board) => {
        let newBoard = [];
        for (const player in chessPiecesData) {
            newBoard = chessPiecesData[player].pawns.reduce((acc, piece) => {
                acc[piece.position.y][piece.position.x].piece = { ...piece };
                return acc;
            }, board);
        }
        return newBoard;
    };
    //place knights on the board
    const placeKnights = (chessPiecesData, board) => {
        let newBoard = [];
        for (const player in chessPiecesData) {
            newBoard = chessPiecesData[player].knights.reduce((acc, piece) => {
                acc[piece.position.y][piece.position.x].piece = { ...piece };
                return acc;
            }, board);
        }
        return newBoard;
    };
    //place bishops on the board
    const placeBishops = (chessPiecesData, board) => {
        let newBoard = [];
        for (const player in chessPiecesData) {
            newBoard = chessPiecesData[player].bishops.reduce((acc, piece) => {
                acc[piece.position.y][piece.position.x].piece = { ...piece };
                return acc;
            }, board);
        }
        return newBoard;
    };
    //place rooks on the board
    const placeRooks = (chessPiecesData, board) => {
        let newBoard = [];
        for (const player in chessPiecesData) {
            newBoard = chessPiecesData[player].rooks.reduce((acc, piece) => {
                acc[piece.position.y][piece.position.x].piece = { ...piece };
                return acc;
            }, board);
        }
        return newBoard;
    };
    //place queenss on the board
    const placeQueens = (chessPiecesData, board) => {
        for (const player in chessPiecesData) {
            const queen = chessPiecesData[player].queen;
            board[queen.position.y][queen.position.x].piece = { ...queen };
        }
        return board;
    };
    //place kings on the board
    const placeKings = (chessPiecesData, board) => {
        for (const player in chessPiecesData) {
            const king = chessPiecesData[player].king;
            board[king.position.y][king.position.x].piece = { ...king };
        }
        return board;
    };
    const placePiecesArr = [
        fillCell,
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
// check position on board if there is a piece save location and then place piece at the next place clicked
const movePiece = (x, y, boardArr) => {
    const isTrue = boardArr[x][y].piece;
    if (isTrue) {
        heldPiece = boardArr[x][y].piece;
        boardArr[x][y].piece = false;
    }
    renderBoard(boardArr);
};

// on mouse up place piece that is in hand
const placePiece = (x, y, boardArr) => {
    if (heldPiece) {
        console.log("test");
        boardArr[x][y].piece = heldPiece;
    }
    heldPiece = false;
    renderBoard(boardArr);
};

renderBoard(populateBoardArr(chessPiecesData, boardArr, movePiece));

/*
different types of chess pieces
pawn
knight
bishop
rook
king
queen


*/
