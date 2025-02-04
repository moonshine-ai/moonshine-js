// Helper script for downloading Moonshine ONNX models from HuggingFace for local development.
import * as fs from "fs";
import * as hub from "@huggingface/hub";

const repo = { type: "model", name: "UsefulSensors/moonshine" };

var models = ["tiny", "base"];

var quantizations = ["float", "quantized", "quantized_4bit"];

var layers = ["decoder_model_merged.onnx", "encoder_model.onnx"];

console.log("Downloading Moonshine ONNX models from HuggingFace...");

models.forEach((model) => {
    quantizations.forEach((quantization) => {
        var dir = "dist/model/" + model + "/" + quantization;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        layers.forEach((layer) => {
            hub.downloadFile({
                repo,
                path: "onnx/merged/" + model + "/" + quantization + "/" + layer,
            }).then((file) => {
                file.arrayBuffer().then((buffer) => {
                    fs.writeFile(dir + "/" + layer, Buffer.from(buffer), () => {
                        console.log(
                            "\tDownloaded " +
                                model +
                                "/" +
                                quantization +
                                "/" +
                                layer +
                                " successfully."
                        );
                    });
                });
            });
        });
    });
});
