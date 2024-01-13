export default class AbstractBlock {
  constructor(x,y) {
    if(this.constructor == AbstractBlock) {
      throw new Error("Class is of abstract type and can't be instantiated");
    };
    
    if(this.initialise_cells == undefined) {
      throw new Error("initialise_cells method must be implemented");
    };

    this.x_centre = x;
    this.y_cente = y;
    this.cells = this.initialise_cells();
  }

  shift(direction = 'down') {
    this.cells = this.get_next_position(direction);
    switch (direction) {
      case 'down':
        this.y_cente += 1;
        break;
      case 'right':
        this.x_centre += 1;
        break;
      case 'left':
        this.x_centre -= 1;
        break;
      case 'rotate':
        // centre stays the same
        break;
    }

  }

  get_next_position(direction = 'down') {
    return this.cells.map((c) => {
      const x = parseInt(c[0]);
      const y = parseInt(c[1]);
      let new_cell;
      switch (direction) {
        case 'down':
          new_cell = [x, y + 1];
          break;
        case 'right':
          new_cell = [x + 1, y];
          break;
        case 'left':
          new_cell = [x - 1, y];
          break;
        case 'rotate':
          let rel_x = x - this.x_centre;
          let rel_y = y - this.y_cente;
          new_cell = [this.x_centre + rel_y, this.y_cente - rel_x];
          break;
      }
      return new_cell;
    });
  }
}