import { LivingEntity } from "./LivingEntity.js";
import { KeyBoardControls } from "../controller/KeyboardControls.js";
import { MouseControls } from "../controller/MouseControls.js";
import { gameArea } from "../GameArea.js";
import { DynamicEntity } from "./DynamicEntity.js";

export class PlayerEntity extends LivingEntity {
    constructor(datas) {
        super(datas);
    }

    update() {
        super.update();
        this.is_moving();
        this.is_shooting();
    }

    is_moving(){
        if (KeyBoardControls.keymap.z) {
            this.speed.y = -10;
        } else if (KeyBoardControls.keymap.s) {
            this.speed.y = 10;
        } else {
            this.speed.y = 0;
        }
        if (KeyBoardControls.keymap.q) {
            this.speed.x = -10;
        } else if (KeyBoardControls.keymap.d) {
            this.speed.x = 10;
        } else {
            this.speed.x = 0;
        }
    }

    is_shooting(){
        if (MouseControls.controls.left) {
            gameArea.entities.push(new DynamicEntity({ pos: { x: this.pos.x, y: this.pos.y }, size: { x: 10, y: 10 }, color: 'blue', speed: { x: MouseControls.controls.current_coords.x, y: MouseControls.controls.current_coords.y } }));
            console.log('pew pew');
        }
    }
}