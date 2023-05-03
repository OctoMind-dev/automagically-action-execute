import core from "@actions/core";
import fetch from "node-fetch";

const url = core.getInput("url");
console.log("🚀 ~ file: main.js:5 ~ url:", url)
const token = core.getInput("token");
console.log("🚀 ~ file: main.js:7 ~ token:", token)

try {
  const response = await fetch(
    "https://automagically-5vr3ysri3a-ey.a.run.app/api/v1/execute",
    {
      body: JSON.stringify({ token, url }),
      method: "POST",
    }
  );

  core.setOutput("result", await response.json());
} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error.message);
  } else {
    core.setFailed("unknown Error");
  }
}
