import BlockFactory from "./block_factory.js";

export default class Board {
  constructor(base, height, width) {
    console.log("Initing board with: ", base, height, width);
    this.base = base;
    this.height = height;
    this.width = width;
    this.playing = false;
    this.board = this.build_empty_board(this.height, this.width);
    this.block_factory = new BlockFactory();
    this.initialise_board();
    
    this.static_cells = [];
    this.spawn_point = [10, 3];
    this.add_block();

    this.setup_key_listners();

    this.run_game_loop();
  }

  initialise_board() {
    let board = $(`<div id="main_board_${this.height}_x_${this.width}"></div>`);
    board.addClass('board');

    for ( const row_num of Array(this.height).keys()) {
      let row = $(`<div id="row_${row_num}"></div>`);
      row.addClass('row');
      for (const col_num of Array(this.width).keys()) {
        let cell = $(`<div id="col_${row_num}_x_${col_num}"></div>`);
        cell.addClass('cell');
        cell.css('width', '25px');
        cell.css('height', '25px');
        this.board[row_num][col_num] = cell;
        row.append(cell);
      }
      board.append(row);
    }
    this.base.append(this.controls());
    this.base.append(board);
  }

  controls() {
    let controls = $("<div id='controls'></div>");
    let play = $('<i class="fa-solid fa-play"></i>');
    let pause = $('<i class="fa-solid fa-pause"></i>')

    play.on('click', () => {
      if (!this.playing) {
        this.run_game_loop();
      }
    });
    pause.on('click', () => {
      if (this.playing) {
        this.pause_game_loop();
      }
    });
    
    controls.append(play);
    controls.append(pause);
    return controls;
  }

  build_empty_board(n,m) {
    let single_row = () => Array.apply(null, Array(m));
    let my_board = Array.apply(null, Array(n)).map(single_row);
    return my_board
  }

  add_block() {
    const rand = Math.random();
    const new_block = this.block_factory.new_block(this.spawn_point);

    this.active_block = new_block;

    if (!this.can_move_block()) {
      this.game_over();
    }
  }

  run_game_loop() {
    this.playing = true;
    this.render_blocks();

    let i = 0;
    this.game_interval = setInterval(() => {
      console.log(`Game loop tick #${i}`)
      i += 1;
      this.shift_block_down();
    }, 1000);
  }

  pause_game_loop() {
    this.playing = false;
    clearInterval(this.game_interval);
  }

  shift_block_down() {
    // check that blocak can't move down right after moving so we don't get delay
    // that allows user to slide a supposedly stationary block sideways.
    if (this.can_move_block('down')){
      this.active_block.shift('down');
    } else {
      this.static_cells.push(...this.active_block.cells);
      this.add_block();
    }
    this.clear_full_rows();
    this.render_blocks();
  }

  can_move_block(direction = 'down') {
    const next_position = this.active_block.get_next_position(direction);

    for (const coord of next_position) {
      if (coord[1] >= this.height || coord[0] >= this.width || coord[0] < 0) {
        return false;
      }
      for (const static_coord of this.static_cells) {
        if (coord[0] === static_coord[0] && coord[1] === static_coord[1]) {
          return false
        }
      }
    }
    return true;
  }

  render_blocks() {
    this.clear_board();

    for (const coord of this.active_block.cells) {
      this.activate_cell(coord);
    }

    for (const coord of this.static_cells) {
      this.activate_cell(coord);
    }
  }

  clear_full_rows() {
    // TODO: clear the coords for a row that is full,
    // and shift all cells above the row down
    
  }

  activate_cell(coord) {
    const x = coord[0];
    const y = coord[1];
    this.board[y][x].addClass('active');
  }

  clear_board() {
    for (const row of this.board){
      for (const cell of row) {
        cell.removeClass('active');
      }
    }
  }

  game_over() {
    this.pause_game_loop();
    alert("Game over man!!");
  }

  setup_key_listners() {
    document.onkeydown = (event) => {
      console.log("Key Event: ", event.key);
      if (!this.playing) {
        return;
      }
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (this.can_move_block('left')){
            this.active_block.shift('left');
            this.render_blocks();
          };
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (this.can_move_block('right')){
            this.active_block.shift('right');
            this.render_blocks();
          };
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.shift_block_down();
          break;
        case ' ':
          event.preventDefault();
          if (this.can_move_block('rotate')){
            this.active_block.shift('rotate');
            this.render_blocks();
          };
          break;
      }
    };
  }
}
