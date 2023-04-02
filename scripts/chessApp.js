import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import appsData from "./../data/appData.js";

export const openChessApp = (chess) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    // append default window container for the app
    mainScreen.appendChild(createAppContainer("chess-app"));
    // allow the app to move on drag
    const chessApp = document.querySelector(".allowed-area__chess-app");
    moveApp(chessApp);
    // customise the app header to the specified app
    appHeaderControl(chessApp, appsData[1]);

    const chessMain = document.querySelector(".chess-app__main");
    // create a board container to hold the chess pieces
    const boardCon = document.createElement("div");
    boardCon.classList.add("main", "main__chess-board");

    chessMain.append(boardCon);
    renderBoard(populateBoardArr(chess.pieces, chess));
};

// render board from an array
const renderBoard = (chess) => {
    const boardCon = document.querySelector(".main__chess-board");
    const chessPieceImg = (imageSrc, color) =>
        `<img src ="${imageSrc}" class="piece piece--${color}"/>`;
    for (let x = 0; x < chess.board.length; x++) {
        for (let y = 0; y < chess.board[x].length; y++) {
            const div = chess.board[y][x].html;
            const chessPiece = chess.board[y][x].piece;
            if (chessPiece && chessPiece.isWhite) {
                div.innerHTML = chessPieceImg(chessPiece.iconSrc, "white");
            } else if (chessPiece && !chessPiece.isWhite) {
                div.innerHTML = chessPieceImg(chessPiece.iconSrc, "black");
            } else {
                div.innerHTML = "";
            }
            boardCon.append(div);
        }
    }
};
//  render board after each move
const populateBoardArr = (chessPieces, chess) => {
    const fillCell = (chess) => {
        // used to alternate the checkered board pattern
        let isAlternating = false;
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                chess.board[x][y] = {
                    ...createCellObject(
                        createHTML(x, y, chess, isAlternating),
                        x,
                        y
                    ),
                };
            }
            isAlternating = !isAlternating;
        }
        return chess;
    };
    const piecesOnBoard = (chessPieces, chess) => {
        for (let i = 0; i < chessPieces.length; i++) {
            const piece = chessPieces[i];
            const position = piece.position;
            chess.board[position.x][position.y].piece = {
                ...piece,
            };
        }
        return chess;
    };
    return piecesOnBoard(chessPieces, fillCell(chess));
};

const createHTML = (x, y, chess, isAlternating) => {
    const html = document.createElement("div");
    html.classList.add("chess-board__chess-cell");
    html.classList.add("chess-cell");
    html.addEventListener("mousedown", (e) => {
        e.preventDefault();
        holdPiece(x, y, chess);
    });
    html.addEventListener("mouseup", (e) => {
        e.preventDefault();
        placePiece(x, y, chess);
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
const holdPiece = (x, y, chess) => {
    const chessPiece = chess.board[x][y].piece;
    if (chessPiece) {
        chess.heldPiece = chessPiece;
        chessPiece = false;
    }
    // validMoves(board.heldPiece, board);
    return chess, renderBoard(chess);
};

// on mouse up place piece that is in hand
const placePiece = (x, y, chess) => {
    const heldPiece = chess.heldPiece;
    const chessPiece = chess.board[x][y].piece;
    if (heldPiece) {
        chessPiece = heldPiece;
        chessPiece.position = { x: x, y: y };
    }
    chess.heldPiece = false;
    return chess, renderBoard(chess);
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
