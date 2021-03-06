import { NinePatch, INinePatchCreator, INinePatchFactory } from "@koreez/phaser3-ninepatch";
import { gameConfig } from "../constants/GameConfig";
import {  Images } from "../assets";
import { MushroomView } from "../views";

export class Main extends Phaser.Scene {
    public onCreationCompleteCb: () => void;

    public add: INinePatchFactory;
    public make: INinePatchCreator;

    private ninePatch: NinePatch;
    private direction: number = 1;

    private mushroom: MushroomView;

    public create(): void {
        this.ninePatch = this.add.ninePatch(gameConfig.width * 0.5, gameConfig.height * 0.5, 300, 300, Images.SquareGreen.Name, null, {
            bottom: 14, // Amount of pixels for bottom
            left: 6, // Amount of pixels for left
            right: 6, // Amount of pixels for right
            top: 10 // Amount of pixels for top
        });
        this.handleCreationComplete();
    }

    public creteMushroom():void {
       this.mushroom = new MushroomView(this);
       this.mushroom.setPosition(50, 50);
       this.mushroom.setSize(100, 100);
       this.mushroom.setInteractive();
       this.add.existing(this.mushroom); 
    }

    public update(): void {
        this.ninePatch.angle += this.direction;
    }

    public redraw(width: number, height: number, direction: number): void {
        this.direction = direction;
        this.ninePatch.resize(width, height);
    }

    public init(): void {
        console.log("Main Scene init");
    }

    public shutdown(): void {
        console.log("Main Scene shutdown");
    }

    private handleCreationComplete(): void {
        if (this.onCreationCompleteCb) {
            this.onCreationCompleteCb();
        } else {
            console.warn(`${this.scene.key} scenes onCreationCompleteCb is not initialized`);
        }
    }
}
