import { handleMouseMove, handleDraw } from "../services";

export const controller = (methods: string[], params: number[]) => {
  const [key, method] = methods;

  switch (key) {
    case "mouse":
      handleMouseMove(method, params);
      break;

    case "draw":
      handleDraw(method, params);
      break;

    default:
      console.log("No such command");
      break;
  }
};
