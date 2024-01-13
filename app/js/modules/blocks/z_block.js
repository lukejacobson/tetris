/**
 * ## ##
 *    ## ##
 */

import AbstractBlock from "./abstract_block.js";

export default class ZBlock extends AbstractBlock {
  constructor(x,y) {
    super(x,y);
  }

  initialise_cells() {
    const x = this.x_centre;
    const y = this.y_cente;
    let cells = [[x, y]];
    cells.push([x - 1, y - 1]);
    cells.push([x, y - 1]);
    cells.push([x + 1, y]);
    return cells;
  }
}