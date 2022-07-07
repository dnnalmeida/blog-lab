import fs from "fs";
import path from "path";

export const listFiles = (
  pathname: string = "",
  shouldListOnlyFilename: boolean = true
) => {
  const directory = path.join(process.cwd(), pathname);
  const files = fs
    .readdirSync(directory)
    .filter((filename) => !filename.includes("tsx"));
  return shouldListOnlyFilename
    ? files
    : files.map((filename) => `${directory}/${filename}`);
};

export const readFile = (pathname: string, filename: string) => {
  const directory = path.join(process.cwd(), pathname);
  const fullPath = `${directory}/${filename}`;
  return fs.readFileSync(fullPath, "utf-8");
};
