import Board from './modules/board.js';

console.log("Welcome to tetris");
const wrapper = $("#game_wrapper");
console.log("Wrapper: ", wrapper)
const my_board = new Board(wrapper, 25, 20);

window.MyBoard = my_board;