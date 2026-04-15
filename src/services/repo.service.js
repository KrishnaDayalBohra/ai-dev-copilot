import simpleGit from "simple-git";
import fs from "fs";
import path from "path";

const git = simpleGit();

// clone repo
export async function cloneRepo(repoUrl, repoId) {
  const repoPath = path.join("repos", repoId);

  if (!fs.existsSync("repos")) {
    fs.mkdirSync("repos");
  }

  // delete if exists
  if (fs.existsSync(repoPath)) {
    fs.rmSync(repoPath, { recursive: true, force: true });
  }

  console.log("Cloning repo...");

 await git.clone(repoUrl, repoPath, ["--depth", "1"]);
  console.log("Repo cloned");

  return repoPath;
}

// get all files
export function getAllFiles(dirPath) {
  let results = [];

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

// filter only code files
export function filterCodeFiles(files) {
  const allowedExtensions = [".js", ".ts", ".jsx", ".json", ".md"];

  return files.filter((file) =>
    allowedExtensions.includes(path.extname(file))
  );
}

// read file
export function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("Error reading file:", filePath);
    return "";
  }
}

// 🔥 THIS WAS MISSING
export async function processRepository(repoUrl, repoId) {
  const repoPath = await cloneRepo(repoUrl, repoId);

  const allFiles = getAllFiles(repoPath);
  const codeFiles = filterCodeFiles(allFiles).slice(0, 20); // limit

  console.log("Total files:", allFiles.length);
  console.log("Code files:", codeFiles.length);

  const fileContents = codeFiles.map((file) => ({
    filePath: file,
    content: readFileContent(file),
  }));

  return fileContents;
}