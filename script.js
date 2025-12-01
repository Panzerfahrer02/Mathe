// ================= Theorie =================

const theoryText = [
  "1. Was ist eine lineare Gleichung?",
  "   Eine lineare Gleichung ist eine Gleichung, in der die Variable x",
  "   nur mit Exponent 1 vorkommt. Beispiele:",
  "      2x + 3 = 7",
  "      -4x + 10 = 2x - 8",
  "",
  "2. Ziel beim Lösen:",
  "   Wir wollen x freistellen:",
  "      x = (irgendeine Zahl)",
  "",
  "3. Erlaubte Umformungen (Äquivalenzumformungen):",
  "   - Auf beiden Seiten die gleiche Zahl addieren oder subtrahieren",
  "   - Beide Seiten mit derselben (≠ 0) Zahl multiplizieren oder dividieren",
  "   Wichtig: Was du links machst, musst du auch rechts machen!",
  "",
  "4. Standard-Vorgehen bei ax + b = c:",
  "   Beispiel: 2x + 3 = 11",
  "   (1) Konstante auf die andere Seite bringen:",
  "       2x + 3 = 11      | -3",
  "       2x = 8",
  "   (2) Durch den Koeffizienten vor x teilen:",
  "       2x = 8           | :2",
  "       x = 4",
  "",
  "5. Standard-Vorgehen bei ax + b = cx + d:",
  "   Beispiel: 3x + 5 = x - 1",
  "   (1) Alle x auf eine Seite holen:",
  "       3x + 5 = x - 1   | -x",
  "       2x + 5 = -1",
  "   (2) Konstante auf die andere Seite:",
  "       2x + 5 = -1      | -5",
  "       2x = -6",
  "   (3) Durch Koeffizienten teilen:",
  "       2x = -6          | :2",
  "       x = -3",
  "",
  "6. Probe:",
  "   Setze deine Lösung wieder in die Ausgangsgleichung ein.",
  "   Wenn links = rechts, ist die Lösung korrekt."
].join("\n");

function showTheory() {
  const theoryBox = document.getElementById("theory-box");
  const exerciseBox = document.getElementById("exercise-box");
  const theoryContent = document.getElementById("theory-content");

  theoryContent.textContent = theoryText;
  theoryBox.classList.remove("hidden");
  exerciseBox.classList.add("hidden");
}

// ================= Hilfsfunktionen für Zufall =================

function randomInt(min, max) {
  // inkl. min und max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ================= Aufgaben Typ 1: ax + b = c =================

function generateTaskType1() {
  const xSolution = randomInt(-10, 10);
  const possibleA = [];
  for (let i = -10; i <= 10; i++) {
    if (i !== 0) possibleA.push(i);
  }
  const a = chooseRandom(possibleA);
  const b = randomInt(-10, 10);
  const c = a * xSolution + b;

  return { a, b, c, xSolution };
}

function solveType1Steps({ a, b, c, xSolution }) {
  const steps = [];
  steps.push(`Ausgangsgleichung: ${a}x + ${b} = ${c}`);

  const rhsAfterSub = c - b;
  if (b !== 0) {
    steps.push("");
    steps.push("1) Konstante auf die andere Seite bringen:");
    steps.push(`   ${a}x + ${b} = ${c}   | -${b}`);
    steps.push(`   ${a}x + ${b} - ${b} = ${c} - ${b}`);
    steps.push(`   ${a}x = ${rhsAfterSub}`);
  } else {
    steps.push("");
    steps.push(
      "1) Es gibt keinen konstanten Term b, daher ist dieser Schritt nicht nötig."
    );
  }

  steps.push("");
  steps.push("2) Durch den Koeffizienten vor x teilen:");
  steps.push(`   ${a}x = ${rhsAfterSub}   | :${a}`);
  steps.push(`   x = ${rhsAfterSub} / ${a} = ${xSolution}`);

  const lhs = a * xSolution + b;
  steps.push("");
  steps.push("3) Probe:");
  steps.push(`   Setze x = ${xSolution}:`);
  steps.push(`   Linke Seite:  ${a} * ${xSolution} + ${b} = ${lhs}`);
  steps.push(`   Rechte Seite: ${c}`);
  steps.push(`   → ${lhs} = ${c} ✅`);

  return steps.join("\n");
}

// ================= Aufgaben Typ 2: ax + b = cx + d =================

function generateTaskType2() {
  const xSolution = randomInt(-10, 10);

  let a, c;
  const values = [];
  for (let i = -5; i <= 5; i++) {
    if (i !== 0) values.push(i);
  }
  while (true) {
    a = chooseRandom(values);
    c = chooseRandom(values);
    if (a !== c) break;
  }

  const b = randomInt(-10, 10);
  const d = a * xSolution + b - c * xSolution; // ausgleich, damit xSolution passt

  return { a, b, c, d, xSolution };
}

function solveType2Steps({ a, b, c, d, xSolution }) {
  const steps = [];
  steps.push(`Ausgangsgleichung: ${a}x + ${b} = ${c}x + ${d}`);
  steps.push("");
  steps.push("1) Alle x-Terme auf eine Seite bringen (hier: links):");
  steps.push(`   ${a}x + ${b} = ${c}x + ${d}   | -${c}x`);
  const leftCoef = a - c;
  steps.push(`   (${a}x - ${c}x) + ${b} = ${d}`);
  steps.push(`   ${leftCoef}x + ${b} = ${d}`);

  let rhsAfterSub = d - b;
  if (b !== 0) {
    steps.push("");
    steps.push("2) Konstante auf die rechte Seite bringen:");
    steps.push(`   ${leftCoef}x + ${b} = ${d}   | -${b}`);
    steps.push(`   ${leftCoef}x = ${d} - ${b}`);
    steps.push(`   ${leftCoef}x = ${rhsAfterSub}`);
  } else {
    steps.push("");
    steps.push(
      "2) Es gibt keinen konstanten Term b auf der linken Seite, daher entfällt dieser Schritt."
    );
    rhsAfterSub = d;
  }

  steps.push("");
  steps.push("3) Durch den Koeffizienten vor x teilen:");
  steps.push(`   ${leftCoef}x = ${rhsAfterSub}   | :${leftCoef}`);
  steps.push(`   x = ${rhsAfterSub} / ${leftCoef} = ${xSolution}`);

  const lhs = a * xSolution + b;
  const rhs = c * xSolution + d;
  steps.push("");
  steps.push("4) Probe:");
  steps.push(`   Linke Seite:  ${a} * ${xSolution} + ${b} = ${lhs}`);
  steps.push(`   Rechte Seite: ${c} * ${xSolution} + ${d} = ${rhs}`);
  if (lhs === rhs) {
    steps.push(`   → ${lhs} = ${rhs} ✅ Gleichung erfüllt.`);
  } else {
    steps.push(`   → ${lhs} != ${rhs} ❌ (sollte hier eigentlich nicht passieren)`);
  }

  return steps.join("\n");
}

// ================= UI & Steuerung =================

let currentTask = null;
let currentType = null; // "type1" oder "type2"

function setFeedback(msg, isOk) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = msg;
  feedback.classList.remove("ok", "error");
  if (!msg) return;
  feedback.classList.add(isOk ? "ok" : "error");
}

function newTask() {
  const mode = document.getElementById("mode-select").value;
  const theoryBox = document.getElementById("theory-box");
  const exerciseBox = document.getElementById("exercise-box");
  const equationText = document.getElementById("equation-text");
  const solutionSteps = document.getElementById("solution-steps");
  const answerInput = document.getElementById("answer-input");

  setFeedback("", false);
  solutionSteps.textContent = "";
  answerInput.value = "";

  if (mode === "theory") {
    showTheory();
    return;
  }

  // Übungen anzeigen
  theoryBox.classList.add("hidden");
  exerciseBox.classList.remove("hidden");

  if (mode === "type1") {
    currentTask = generateTaskType1();
    currentType = "type1";
    const { a, b, c } = currentTask;
    equationText.textContent = `${a}x + ${b} = ${c}`;
  } else if (mode === "type2") {
    currentTask = generateTaskType2();
    currentType = "type2";
    const { a, b, c, d } = currentTask;
    equationText.textContent = `${a}x + ${b} = ${c}x + ${d}`;
  } else if (mode === "mixed") {
    if (Math.random() < 0.5) {
      currentTask = generateTaskType1();
      currentType = "type1";
      const { a, b, c } = currentTask;
      equationText.textContent = `${a}x + ${b} = ${c}`;
    } else {
      currentTask = generateTaskType2();
      currentType = "type2";
      const { a, b, c, d } = currentTask;
      equationText.textContent = `${a}x + ${b} = ${c}x + ${d}`;
    }
  }
}

function checkAnswer() {
  if (!currentTask || !currentType) return;

  const answerInput = document.getElementById("answer-input");
  const solutionStepsElem = document.getElementById("solution-steps");

  const raw = answerInput.value.trim().replace(",", ".");
  const userValue = Number(raw);

  if (Number.isNaN(userValue)) {
    setFeedback("Bitte eine gültige Zahl eingeben.", false);
    solutionStepsElem.textContent = "";
    return;
  }

  const correct = currentTask.xSolution;
  const isOk = Math.abs(userValue - correct) < 1e-6;

  if (isOk) {
    setFeedback("✅ Richtig! Sehr gut!", true);
  } else {
    setFeedback(
      `❌ Nicht ganz. Deine Lösung: x = ${userValue}, korrekt wäre x = ${correct}.`,
      false
    );
  }

  let steps;
  if (currentType === "type1") {
    steps = solveType1Steps(currentTask);
  } else {
    steps = solveType2Steps(currentTask);
  }
  solutionStepsElem.textContent = steps;
}

// ================= Event-Listener =================

window.addEventListener("DOMContentLoaded", () => {
  const modeSelect = document.getElementById("mode-select");
  const newTaskBtn = document.getElementById("new-task-btn");
  const checkBtn = document.getElementById("check-btn");

  modeSelect.addEventListener("change", () => {
    // Beim Moduswechsel direkt reagieren
    if (modeSelect.value === "theory") {
      showTheory();
    } else {
      newTask();
    }
  });

  newTaskBtn.addEventListener("click", newTask);
  checkBtn.addEventListener("click", checkAnswer);

  // Standard: Theorie anzeigen
  showTheory();
});
