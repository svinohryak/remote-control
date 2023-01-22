import { mouse, left, right, up, down, Button, straightTo, Point } from "@nut-tree/nut-js";
import EventEmitter from "events";
import { Direction } from "../types";

export class ReturningData extends EventEmitter {
  getData = () => {
    this.emit("position", getMousePosition());
  };
}

const drawSquare = async (x: number) => {
  try {
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(x));
    await mouse.move(down(x));
    await mouse.move(left(x));
    await mouse.move(up(x));
    await mouse.releaseButton(Button.LEFT);
  } catch (error) {
    console.log(error);
  }
};

const drawRectangle = async (x: number, y: number) => {
  try {
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(x));
    await mouse.move(down(y));
    await mouse.move(left(x));
    await mouse.move(up(y));
    await mouse.releaseButton(Button.LEFT);
  } catch (error) {
    console.log(error);
  }
};

const drawCircle = async (radius: number) => {
  try {
    const position = await getMousePosition();
    const initialX = position.x + radius;
    const initialY = position.y;
    const startPoint = new Point(initialX, initialY);

    await mouse.move(straightTo(startPoint));

    await mouse.pressButton(Button.LEFT);

    for (let i = 0; i < 360; i++) {
      const x: number = Math.round(Math.cos((Math.PI * i) / 180) * radius + position.x);
      const y: number = Math.round(Math.sin((Math.PI * i) / 180) * radius + position.y);
      const target = new Point(x, y);

      await mouse.move(straightTo(target));
    }

    await mouse.releaseButton(Button.LEFT);
  } catch (error) {
    console.log(error);
  }
};

const getMousePosition = async () => {
  const position = await mouse.getPosition();
  return position;
};

export const handleMouseMove = async (method: string, params: number[]) => {
  try {
    const mouseMoveSchema = {
      right: (px: number) => mouse.move(right(px)),
      down: (px: number) => mouse.move(down(px)),
      left: (px: number) => mouse.move(left(px)),
      up: (px: number) => mouse.move(up(px)),
      position: () => getMousePosition(),
    };

    await mouseMoveSchema[method as Direction](params[0]);
  } catch (error) {
    console.log(error);
  }
};

export const handleDraw = (method: string, params: number[]) => {
  const [x, y] = params;

  switch (method) {
    case "square":
      drawSquare(x);
      break;

    case "rectangle":
      drawRectangle(x, y);
      break;

    case "circle":
      drawCircle(x);
      break;

    default:
      console.log("No such sub command");
      break;
  }
};
