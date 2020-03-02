import { NETLIFY_BUILD_HOOK } from "../global";

export function deploy() {
  if (process.env.NEED_DEPLOY === "1") {
    return fetch(NETLIFY_BUILD_HOOK, {method: "POST"});
  }
}
