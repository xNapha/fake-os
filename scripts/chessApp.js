import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import { apps } from "../data/appData.js";

export const openChessApp = (chessPiecesData, board) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    mainScreen.appendChild(createAppContainer("Chess-App"));
    moveApp(document.querySelector(".allowed-area__chess-app"));
    appHeaderControl(
        document.querySelector(".allowed-area__chess-app"),
        apps[0]
    );

    const chessMain = document.querySelector(".chess-app__main");
    // create a board container to hold the chess pieces
    const boardCon = document.createElement("div");
    boardCon.classList.add("main");
    boardCon.classList.add("main__chess-board");

    chessMain.append(boardCon);
    renderBoard(populateBoardArr(chessPiecesData, board));
};

// render board from an array
const renderBoard = (boardObject) => {
    const boardCon = document.querySelector(".main__chess-board");
    for (let x = 0; x < boardObject.boardArr.length; x++) {
        for (let y = 0; y < boardObject.boardArr[x].length; y++) {
            const div = boardObject.boardArr[y][x].html;
            if (
                boardObject.boardArr[y][x].piece &&
                boardObject.boardArr[y][x].piece.isWhite
            ) {
                div.innerHTML = `<img src ="${boardObject.boardArr[y][x].piece.iconSrc}" class="piece piece--white"/>`;
            } else if (
                boardObject.boardArr[y][x].piece &&
                !boardObject.boardArr[y][x].piece.isWhite
            ) {
                div.innerHTML = `<img src ="${boardObject.boardArr[y][x].piece.iconSrc}" class="piece piece--black"/>`;
            } else {
                div.innerHTML = "";
            }
            boardCon.append(div);
        }
    }
};
//  render board after each move
const populateBoardArr = (chessPiecesData, board) => {
    const fillCell = (board) => {
        // used to alternate the checkered board pattern
        let isAlternating = false;
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                board.boardArr[x][y] = {
                    ...createCellObject(
                        createHTML(x, y, board, isAlternating),
                        x,
                        y
                    ),
                };
            }
            isAlternating = !isAlternating;
        }
        return board;
    };
    const piecesOnBoard = (chessPiecesData, board) => {
        for (let i = 0; i < chessPiecesData.length; i++) {
            const piece = chessPiecesData[i];
            const position = piece.position;
            board.boardArr[position.x][position.y].piece = {
                ...piece,
            };
        }
        return board;
    };
    return piecesOnBoard(chessPiecesData, fillCell(board));
};

const createHTML = (x, y, board, isAlternating) => {
    const html = document.createElement("div");
    html.classList.add("chess-board__chess-cell");
    html.classList.add("chess-cell");
    html.addEventListener("mousedown", (e) => {
        e.preventDefault();
        holdPiece(x, y, board);
    });
    html.addEventListener("mouseup", (e) => {
        e.preventDefault();
        placePiece(x, y, board);
    });
    // used to create a checkered board pattern
    if ((y % 2 === 0 && isAlternating) || (y % 2 !== 0 && !isAlternating)) {
        html.classList.add("chess-cell--brown");
    } else {
        html.classList.add("chess-cell--biege");
    }
    return html;
};

const createCellObject = (html, x, y) => {
    const cellObject = {
        html: html,
        piece: false,
        position: { x: x, y: y },
    };
    return cellObject;
};

// check position on board if there is a piece save location and then place piece at the next place clicked
const holdPiece = (x, y, board) => {
    const isTrue = board.boardArr[x][y].piece;
    if (isTrue) {
        board.heldPiece = board.boardArr[x][y].piece;
        board.boardArr[x][y].piece = false;
    }
    // validMoves(board.heldPiece, board);
    return board, renderBoard(board);
};

// on mouse up place piece that is in hand
const placePiece = (x, y, board) => {
    const heldPiece = board.heldPiece;
    console.log(heldPiece.position, "held piece");
    if (heldPiece) {
        // console.log(validMoves(heldPiece, board), "valid");
        board.boardArr[x][y].piece = heldPiece;
        board.boardArr[x][y].piece.position = { x: x, y: y };
    }
    board.heldPiece = false;
    return board, renderBoard(board);
};

// const validMoves = (piece, board) => {
//     // valid pawn moves, 1 infront if space is empty or 1 diagonal if enemy is there
//     if (piece.type === "pawn" && piece.isWhite) {
//         const whitePawn =
//             board.boardArr[piece.position.x][piece.position.y + 1];
//         highlightMove(whitePawn.html);
//         return whitePawn.position;
//     } else if (piece.type === "pawn" && !piece.isWhite) {
//         const blackPawn =
//             board.boardArr[piece.position.x][piece.position.y - 1];
//         highlightMove(blackPawn.html);
//         return blackPawn.position;
//     }
// };

const highlightMove = (cellHTML) => {
    return cellHTML.classList.toggle("valid-moves");
};
/*
different types of chess pieces
pawn
knight
bishop
rook
king
queen


*/
