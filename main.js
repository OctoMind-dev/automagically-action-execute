import core from "@actions/core";
import github from "@actions/github";

const url = core.getInput("url");
const token = core.getInput("token");

const payload = JSON.stringify(github.context.payload, undefined, 2);
console.log(`The event payload: ${payload}`);

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
