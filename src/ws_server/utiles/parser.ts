export const parser = (data: string): [string[], number[]] => {
  const [command, ...strParams] = data.split(" ");
  const methods = command.split("_");
  const params = strParams.map((i) => parseInt(i));
  return [methods, params];
};
