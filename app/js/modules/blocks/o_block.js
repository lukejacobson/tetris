import AbstractBlock from "./abstract_block.js";

export default class OBlock extends AbstractBlock {
  constructor(x,y) {
    super(x,y);
  }

  initialise_cells() {
    const x = this.x_centre;
    const y = this.y_cente;
    let cells = [[x, y]];
    cells.push([x, y + 1]);
    cells.push([x + 1, y]);
    cells.push([x + 1, y + 1]);
    return cells;
  }

  // override the default rotations as this block doesn't rotate.
  shift(direction) {
    if (direction === 'rotate') {
      // do nothing
    } else {
      super.shift(direction);
    }
  }

  get_next_position(direction = 'down') {
    if (direction === 'rotate') {
      // rotating does nothing
      return this.cells;
    } else {
      return super.get_next_position(direction);
    }
  }
}