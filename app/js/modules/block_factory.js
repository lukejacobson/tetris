import IBlock from "./blocks/i_block.js";
import JBlock from "./blocks/j_block.js";
import LBlock from "./blocks/l_block.js";
import OBlock from "./blocks/o_block.js";
import SBlock from "./blocks/s_block.js";
import TBlock from "./blocks/t_block.js";
import XBlock from "./blocks/x_block.js";
import ZBlock from "./blocks/z_block.js";

export default class BlockFactory {
  constructor(block_types){
    this.block_types = block_types;
  }

  new_block(coord) {
    const factories = this.sub_factories();
    const factory_count = Object.keys(factories).length;
    const rand_index = Math.floor(Math.random() * factory_count);
    const random_factory = Object.keys(factories).at(rand_index)
    return factories[random_factory](coord);
  }

  sub_factories() {
    return {
      new_i_block: (coord) => {
        return new IBlock(...coord);
      },
      new_j_block: (coord) => {
        return new JBlock(...coord);
      },
      new_l_block: (coord) => {
        return new LBlock(...coord);
      },
      new_o_block: (coord) => {
        return new OBlock(...coord);
      },
      new_s_block: (coord) => {
        return new SBlock(...coord);
      },
      new_t_block: (coord) => {
        return new TBlock(...coord);
      },
      // new_x_block: (coord) => {
      //   return new XBlock(...coord);
      // },
      new_z_block: (coord) => {
        return new ZBlock(...coord);
      }
    }
  }
}