// Camera + Teachable Machine integration
const URL = "./my_model/"; // your exported model folder
let model, webcam, maxPredictions;
let stopped = true;
const threshold = 0.7; // confidence threshold

async function initCameraModel() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  webcam = new tmImage.Webcam(320, 240, true);
  await webcam.setup();
  await webcam.play();
  document.getElementById("webcam-container").innerHTML = "";
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  stopped = false;
  window.requestAnimationFrame(loop);
}

async function loop() {
  if (stopped) return;
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  const labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = "";
  let best = {className: null, probability: 0};
  for (let i = 0; i < prediction.length; i++) {
    const p = prediction[i];
    const text = `${p.className}: ${p.probability.toFixed(2)}`;
    const el = document.createElement("div");
    el.textContent = text;
    labelContainer.appendChild(el);
    if (p.probability > best.probability) {
      best = {className: p.className, probability: p.probability};
    }
  }

  // Map the model class names to the normalized keys used in BODY_INFO
  // expected model labels: "Head/Face", "Arms/Hands", "Legs/feet", "Eye", "Ears"
  if (best.probability >= threshold) {
    const norm = normalizeLabel(best.className);
    showInfo(norm);
    document.getElementById("thresholdVal").textContent = threshold.toFixed(2);
  }
}

function normalizeLabel(label) {
  // Lowercase and replace common characters to match keys
  return label.toLowerCase()
    .replace(/\s*\/\s*/g, "_")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

// show info in the same panel as bodymap
function showInfo(key){
  const info = getBodyInfo(key);
  document.getElementById("partName").textContent = info.name;
  document.getElementById("anatomy").innerHTML = `<strong>Anatomy:</strong> ${info.anatomy}`;
  document.getElementById("function").innerHTML = `<strong>Function:</strong> ${info.function}`;
  document.getElementById("health").innerHTML = `<strong>Health tips:</strong> ${info.health}`;
}

// Start / stop buttons
document.addEventListener("DOMContentLoaded", () => {
  const start = document.getElementById("startBtn");
  const stop = document.getElementById("stopBtn");
  start.addEventListener("click", async () => {
    if (!model) {
      start.textContent = "Loading...";
      await initCameraModel();
      start.textContent = "Restart";
    } else {
      stopped = false;
      window.requestAnimationFrame(loop);
    }
  });
  stop.addEventListener("click", () => {
    stopped = true;
    if (webcam) webcam.stop();
  });
});
