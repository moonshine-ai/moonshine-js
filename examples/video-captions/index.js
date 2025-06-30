import * as Moonshine from "https://cdn.jsdelivr.net/npm/@moonshine-ai/moonshine-js@latest/dist/moonshine.min.js"
// uncomment to use latest build in this repo
// import * as Moonshine from "@moonshine-ai/moonshine-js"

var video = document.getElementById("video");
var videoCaptioner = new Moonshine.VideoCaptioner(video, "model/base", true);
