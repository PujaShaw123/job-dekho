const { exec } = require("child_process");

exec(
  "npm-run-all --parallel start-backend start-frontend",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  }
);
