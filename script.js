// ================= Theorie =================

const theoryHtml = `
  <h3>1. Was ist eine lineare Gleichung?</h3>
  <p>
    Eine lineare Gleichung ist eine Gleichung, in der die Variable <strong>x</strong>
    nur mit Exponent 1 vorkommt.
  </p>
  <ul>
    <li>Beispiele: <code>2x + 3 = 7</code>, <code>-4x + 10 = 2x - 8</code></li>
  </ul>

  <h3>2. Ziel beim Lösen</h3>
  <p>
    Wir wollen <strong>x freistellen</strong>, also:
    <code>x = (irgendeine Zahl)</code>.
  </p>

  <h3>3. Erlaubte Umformungen (Äquivalenzumformungen)</h3>
  <ul>
    <li>Auf beiden Seiten die gleiche Zahl addieren oder subtrahieren</li>
    <li>Beide Seiten mit derselben Zahl (≠ 0) multiplizieren oder dividieren</li>
    <li><strong>Wichtig:</strong> Was du links machst, musst du auch rechts machen!</li>
  </ul>

  <h3>4. Standard-Vorgehen bei <code>ax + b = c</code></h3>
  <p>Beispiel: <code>2x + 3 = 11</code></p>
  <ol>
    <li>
      Konstante auf die andere Seite bringen:<br />
      <code>2x + 3 = 11 &nbsp; | -3</code><br />
      <code>2x = 8</code>
    </li>
    <li>
      Durch den Koeffizienten vor x teilen:<br />
      <code>2x = 8 &nbsp; | :2</code><br />
      <code>x = 4</code>
    </li>
  </ol>

  <h3>5. Standard-Vorgehen bei <code>ax + b = cx + d</code></h3>
  <p>Beispiel: <code>3x + 5 = x - 1</code></p>
  <ol>
    <li>
      Alle x-Terme auf eine Seite holen:<br />
      <code>3x + 5 = x - 1 &nbsp; | -x</code><br />
      <code>2x + 5 = -1</code>
    </li>
    <li>
      Konstante auf die andere Seite bringen:<br />
      <code>2x + 5 = -1 &nbsp; | -5</code><br />
      <code>2x = -6</code>
    </li>
    <li>
      Durch den Koeffizienten teilen:<br />
      <code>2x = -6 &nbsp; | :2</code><br />
      <code>x = -3</code>
    </li>
  </ol>

  <h3>6. Probe</h3>
  <p>
    Setze deine Lösung wieder in die ursprüngliche Gleichung ein.
    Wenn links und rechts der gleiche Wert herauskommt, ist die Lösung korrekt.
  </p>

  <h3>7. Diskriminante bei quadratischen Gleichungen</h3>
  <p>
    Eine quadratische Gleichung hat die Form <code>ax² + bx + c = 0</code> (mit <code>a ≠ 0</code>).
    Die <strong>Diskriminante</strong> ist die Zahl
    <code>Δ = b² - 4ac</code>.
  </p>
  <ul>
    <li><code>Δ &gt; 0</code>: zwei verschiedene reelle Lösungen</li>
    <li><code>Δ = 0</code>: genau eine (doppelte) reelle Lösung</li>
    <li><code>Δ &lt; 0</code>: keine reelle Lösung</li>
  </ul>
  <p>
    In der Mitternachtsformel <code>x = (-b ± √Δ) / (2a)</code> steckt Δ unter der Wurzel.
    Ist Δ negativ, kann man die Wurzel in den reellen Zahlen nicht berechnen.
  </p>
`;

function showTheory() {
  const theoryBox = document.getElementById("theory-box");
  const exerciseBox = document.getElementById("exercise-box");
  const theoryContent = document.getElementById("theory-content");

  theoryContent.innerHTML = theoryHtml;
  theoryBox.classList.remove("hidden");
  exerciseBox.classList.add("hidden");
}

// ================= Hilfsfunktionen =================

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Fisher–Yates Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Zahl oder Bruch (z.B. "5/4") parsen
function parseNumberToken(token) {
  const t = token.trim().replace(",", ".");
  if (!t) return null;
  if (t.includes("/")) {
    const [a, b] = t.split("/").map((s) => s.trim());
    const na = Number(a);
    const nb = Number(b);
    if (!Number.isFinite(na) || !Number.isFinite(nb) || nb === 0) return null;
    return na / nb;
  }
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

// Liste von Zahlen (z.B. "2; 5/4") parsen
function parseNumberList(raw) {
  if (!raw) return [];
  const sep = raw.includes(";") ? ";" : /[\s,]+/;
  return raw
    .split(sep)
    .map((p) => parseNumberToken(p))
    .filter((v) => v !== null);
}

// ================= Trainer: Typ 1 (ax + b = c) =================

function generateTaskType1() {
  const xSolution = randomInt(-10, 10);
  const possibleA = [];
  for (let i = -10; i <= 10; i++) if (i !== 0) possibleA.push(i);
  const a = chooseRandom(possibleA);
  const b = randomInt(-10, 10);
  const c = a * xSolution + b;
  return { a, b, c, xSolution };
}

function solveType1Steps({ a, b, c, xSolution }) {
  const steps = [];
  const rhsAfterSub = c - b;

  steps.push(`Ausgangsgleichung: ${a}x + ${b} = ${c}`);
  if (b !== 0) {
    steps.push("");
    steps.push("1) Konstante auf die andere Seite bringen:");
    steps.push(`   ${a}x + ${b} = ${c}   | -${b}`);
    steps.push(`   ${a}x = ${c} - ${b} = ${rhsAfterSub}`);
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
  steps.push(`   Linke Seite:  ${a} * ${xSolution} + ${b} = ${lhs}`);
  steps.push(`   Rechte Seite: ${c}`);
  steps.push(`   → ${lhs} = ${c} ✅`);

  return steps.join("\n");
}

// ================= Trainer: Typ 2 (ax + b = cx + d) =================

function generateTaskType2() {
  const xSolution = randomInt(-10, 10);
  const values = [];
  for (let i = -5; i <= 5; i++) if (i !== 0) values.push(i);

  let a, c;
  while (true) {
    a = chooseRandom(values);
    c = chooseRandom(values);
    if (a !== c) break;
  }

  const b = randomInt(-10, 10);
  const d = a * xSolution + b - c * xSolution;
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
    steps.push(`   ${leftCoef}x = ${d} - ${b} = ${rhsAfterSub}`);
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
  steps.push(`   → ${lhs} = ${rhs} ✅`);

  return steps.join("\n");
}

// ================= Lernsax-Aufgaben =================

const examTasks = [
  {
    id: "klammergleichung",
    title: "Gleichung mit Klammern",
    promptHtml:
      'Löse die Gleichung: <code>4x - (2 + 9x) = 15x - 27</code>.',
    hint: "Gib die Lösung für x als Zahl oder Bruch ein (z.B. 3/2).",
    check(raw) {
      const values = parseNumberList(raw);
      const correct = 5 / 4;
      const steps = [
        "Ausgangsgleichung: 4x - (2 + 9x) = 15x - 27",
        "",
        "1) Klammer auflösen:",
        "   4x - (2 + 9x) = 4x - 2 - 9x = -5x - 2",
        "   → -5x - 2 = 15x - 27",
        "",
        "2) Alle x-Terme auf eine Seite bringen (z.B. rechts):",
        "   -5x - 2 = 15x - 27   | +5x",
        "   -2 = 20x - 27",
        "",
        "3) Konstante auf die andere Seite bringen:",
        "   -2 = 20x - 27   | +27",
        "   25 = 20x",
        "",
        "4) Durch 20 teilen:",
        "   25 = 20x   | :20",
        "   x = 25/20 = 5/4",
        "",
        "5) Probe durch Einsetzen möglich."
      ].join("\n");

      if (values.length !== 1) {
        return {
          ok: false,
          feedback: "Bitte genau eine Zahl für x eingeben (z.B. 1.2 oder 3/2).",
          steps,
        };
      }
      const x = values[0];
      const ok = Math.abs(x - correct) < 1e-6;
      const feedback = ok
        ? "✅ Richtig! Deine Zahl erfüllt die Gleichung."
        : `❌ Nicht ganz. Deine Lösung ist x = ${x}. Schau dir die Rechenschritte an und vergleiche.`;
      return { ok, feedback, steps };
    },
  },
  {
    id: "ungleichung",
    title: "Ungleichung mit Beispiel-Lösung",
    promptHtml:
      "Löse die Ungleichung <code>-5 &lt; 3x + 10</code>.<br>" +
      "Gib eine <strong>negative ganze Zahl</strong> an, die eine Lösung dieser Ungleichung ist.",
    hint: "Gib eine negative ganze Zahl ein.",
    check(raw) {
      const values = parseNumberList(raw);
      const steps = [
        "Ausgangsungleichung: -5 < 3x + 10",
        "",
        "1) 10 auf die andere Seite bringen:",
        "   -5 < 3x + 10   | -10",
        "   -15 < 3x",
        "",
        "2) Durch 3 teilen:",
        "   -15 < 3x   | :3",
        "   -5 < x",
        "",
        "→ Alle Zahlen mit x > -5 sind Lösungen.",
        "→ Negative ganze Lösungen sind z.B. -4, -3, -2, -1."
      ].join("\n");

      if (values.length !== 1) {
        return {
          ok: false,
          feedback: "Bitte genau eine ganze Zahl eingeben.",
          steps,
        };
      }
      const x = values[0];
      const isInt = Number.isInteger(x);
      const ok = isInt && x < 0 && -5 < 3 * x + 10;
      const feedback = ok
        ? `✅ Passt! x = ${x} ist eine negative ganze Lösung.`
        : "❌ Das passt nicht. Gesucht ist eine negative ganze Zahl, für die -5 < 3x + 10 gilt.";
      return { ok, feedback, steps };
    },
  },
  {
    id: "quadratisch",
    title: "Quadratische Gleichung",
    promptHtml: "Löse die Gleichung <code>2x² + 5x - 3 = 0</code>.",
    hint: "Gib beide Lösungen durch Semikolon getrennt ein (z.B. 1; 2).",
    check(raw) {
      const values = parseNumberList(raw);
      const steps = [
        "Gleichung: 2x² + 5x - 3 = 0",
        "",
        "1) Mitternachtsformel:",
        "   a = 2, b = 5, c = -3",
        "   Δ = b² - 4ac = 5² - 4·2·(-3) = 25 + 24 = 49",
        "",
        "2) Bedeutung von Δ:",
        "   Δ > 0  → zwei verschiedene Lösungen",
        "   Δ = 0  → genau eine (doppelte) Lösung",
        "   Δ < 0  → keine reelle Lösung",
        "",
        "3) Hier ist Δ = 49 > 0, also erwarten wir zwei Lösungen.",
        "",
        "4) Lösungen berechnen:",
        "   x₁,₂ = (-b ± √Δ) / (2a) = (-5 ± 7) / 4",
        "   x₁ = (-5 + 7)/4 = 2/4 = 1/2",
        "   x₂ = (-5 - 7)/4 = -12/4 = -3",
        "",
        "→ Lösungen: x₁ = -3, x₂ = 1/2."
      ].join("\n");

      if (values.length !== 2) {
        return {
          ok: false,
          feedback:
            "Bitte zwei Lösungen eingeben, getrennt z.B. mit Semikolon: a; b.",
          steps,
        };
      }
      const correctSorted = [-3, 0.5];
      const userSorted = values.slice().sort((a, b) => a - b);

      const ok =
        Math.abs(userSorted[0] - correctSorted[0]) < 1e-6 &&
        Math.abs(userSorted[1] - correctSorted[1]) < 1e-6;

      const feedback = ok
        ? "✅ Richtig! Deine beiden Zahlen sind Lösungen der Gleichung."
        : "❌ Nicht ganz. Schau dir die Mitternachtsformel und die Diskriminante Δ in den Schritten genau an.";
      return { ok, feedback, steps };
    },
  },
  {
    id: "parameter_q",
    title: "Parameter q für genau eine Lösung",
    promptHtml:
      "Bestimme einen Wert für <code>q</code>, so dass die Gleichung <code>4x² + qx + 9 = 0</code> genau eine Lösung hat.",
    hint: "Nutze die Diskriminante Δ = b² - 4ac und überlege, wann es genau eine Lösung gibt.",
    check(raw) {
      const values = parseNumberList(raw);
      const steps = [
        "Gleichung: 4x² + qx + 9 = 0",
        "",
        "1) Allgemeine Form einer quadratischen Gleichung:",
        "   ax² + bx + c = 0 mit Diskriminante Δ = b² - 4ac.",
        "",
        "2) Bedeutung der Diskriminante:",
        "   Δ > 0  → zwei verschiedene Lösungen",
        "   Δ = 0  → genau eine (doppelte) Lösung",
        "   Δ < 0  → keine reelle Lösung",
        "",
        "3) Hier: a = 4, b = q, c = 9",
        "   Δ = q² - 4·4·9 = q² - 144",
        "",
        "4) Für genau eine Lösung brauchen wir Δ = 0:",
        "   q² - 144 = 0",
        "   q² = 144",
        "   q = ±12",
        "",
        "→ Geeignete Werte sind z.B. q = 12 oder q = -12."
      ].join("\n");

      if (values.length !== 1) {
        return {
          ok: false,
          feedback: "Bitte genau einen Wert für q eingeben.",
          steps,
        };
      }
      const q = values[0];
      const ok = Math.abs(q - 12) < 1e-6 || Math.abs(q + 12) < 1e-6;
      const feedback = ok
        ? "✅ Richtig! Dein q-Wert macht Δ = 0, also gibt es genau eine Lösung."
        : "❌ Nicht ganz. Setze Δ = q² - 144 gleich 0 und löse nach q.";
      return { ok, feedback, steps };
    },
  },
  {
    id: "gedachte_zahl",
    title: "Textaufgabe – gedachte Zahl",
    promptHtml:
      "Denke dir eine natürliche Zahl x.<br>" +
      "Addiere zu deiner Zahl das 7-fache dieser Zahl. Teile das Ergebnis durch 4 und erhalte 26.<br>" +
      "Welche Zahl hast du dir gedacht?",
    hint: "Gib die gedachte Zahl x ein (eine natürliche Zahl).",
    check(raw) {
      const values = parseNumberList(raw);
      const steps = [
        "Text in eine Gleichung übersetzen:",
        "   Gedachte Zahl: x",
        "   Addiere das 7-fache dieser Zahl: x + 7x = 8x",
        "   Teile durch 4 und erhalte 26:",
        "   8x / 4 = 26",
        "",
        "1) Vereinfachen:",
        "   8x / 4 = 2x",
        "   → 2x = 26",
        "",
        "2) Durch 2 teilen:",
        "   2x = 26   | :2",
        "   x = 13",
        "",
        "→ Die gedachte Zahl ist 13."
      ].join("\n");

      if (values.length !== 1) {
        return {
          ok: false,
          feedback: "Bitte genau eine natürliche Zahl eingeben.",
          steps,
        };
      }
      const x = values[0];
      const ok = Math.abs(x - 13) < 1e-6;
      const feedback = ok
        ? "✅ Richtig! Deine Zahl erfüllt die Bedingung."
        : "❌ Nicht ganz. Überlege dir zuerst die Gleichung und löse dann 2x = 26.";
      return { ok, feedback, steps };
    },
  },
  {
    id: "lgs1",
    title: "Lineares Gleichungssystem (rechnerisch)",
    promptHtml:
      "Gegeben ist das Gleichungssystem:<br>" +
      "<code>I) &nbsp; 0,9x - 3 = y</code><br>" +
      "<code>II) 3x + 2y = 6</code><br>" +
      "Löse das Gleichungssystem rechnerisch.",
    hint: "Gib x und y mit Semikolon getrennt ein (z.B. 1; 2).",
    check(raw) {
      const values = parseNumberList(raw);
      const steps = [
        "Gleichungssystem:",
        "   I)  0,9x - 3 = y",
        "   II) 3x + 2y = 6",
        "",
        "1) Aus I y ausdrücken:",
        "   y = 0,9x - 3",
        "",
        "2) In II einsetzen:",
        "   3x + 2(0,9x - 3) = 6",
        "   3x + 1,8x - 6 = 6",
        "   4,8x - 6 = 6",
        "",
        "3) Nach x auflösen:",
        "   4,8x - 6 = 6   | +6",
        "   4,8x = 12      | :4,8",
        "   x = 12 / 4,8 = 2,5",
        "",
        "4) x in I einsetzen:",
        "   y = 0,9 · 2,5 - 3 = 2,25 - 3 = -0,75",
        "",
        "→ Lösung: x = 2,5 ; y = -0,75."
      ].join("\n");

      if (values.length !== 2) {
        return {
          ok: false,
          feedback: "Bitte x und y als zwei Zahlen eingeben, z.B. 2,5; -0,75.",
          steps,
        };
      }
      const [x, y] = values;
      const ok =
        Math.abs(x - 2.5) < 1e-6 && Math.abs(y + 0.75) < 1e-6;
      const feedback = ok
        ? "✅ Richtig! Deine Werte sind eine Lösung des LGS."
        : "❌ Nicht ganz. Versuche, zuerst y aus I zu bestimmen und dann in II einzusetzen.";
      return { ok, feedback, steps };
    },
  },
  {
    id: "lgs2",
    title: "Lineares Gleichungssystem (zwei Geraden)",
    promptHtml:
      "Gegeben ist das Gleichungssystem:<br>" +
      "<code>I)  &nbsp; y = x - 1</code><br>" +
      "<code>II) &nbsp; y - 3x = 1</code><br>" +
      "Bestimme den Schnittpunkt der beiden Geraden.",
    hint: "Gib x und y mit Semikolon getrennt ein (z.B. 0; 0).",
    check(raw) {
      const values = parseNumberList(raw);
      const steps = [
        "Gleichungen:",
        "   I)  y = x - 1",
        "   II) y - 3x = 1",
        "",
        "1) Aus I: y = x - 1",
        "2) In II einsetzen:",
        "   (x - 1) - 3x = 1",
        "   x - 1 - 3x = 1",
        "   -2x - 1 = 1",
        "",
        "3) Nach x auflösen:",
        "   -2x - 1 = 1   | +1",
        "   -2x = 2       | :(-2)",
        "   x = -1",
        "",
        "4) In I einsetzen:",
        "   y = x - 1 = -1 - 1 = -2",
        "",
        "→ Schnittpunkt: (-1 | -2)."
      ].join("\n");

      if (values.length !== 2) {
        return {
          ok: false,
          feedback: "Bitte x und y als zwei Zahlen eingeben, z.B. a; b.",
          steps,
        };
      }
      const [x, y] = values;
      const ok =
        Math.abs(x + 1) < 1e-6 && Math.abs(y + 2) < 1e-6;
      const feedback = ok
        ? "✅ Richtig! Deine Werte sind der Schnittpunkt der beiden Geraden."
        : "❌ Nicht ganz. Nutze Einsetzen: y = x - 1 in die zweite Gleichung.";
      return { ok, feedback, steps };
    },
  },
];

// Reihenfolge für Lernsax-Aufgaben, damit keine Dopplung entsteht
let examOrder = [];
let examPointer = 0;

function initExamOrder() {
  examOrder = examTasks.map((_, i) => i);
  shuffle(examOrder);
  examPointer = 0;
}

// ================= UI & Steuerung =================

let currentTask = null;
let currentType = null; // "type1", "type2", "exam"

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
  const hintElem = document.getElementById("input-hint");

  setFeedback("", false);
  solutionSteps.textContent = "";
  answerInput.value = "";
  hintElem.textContent = "";
  hintElem.classList.add("hidden");

  if (mode === "theory") {
    showTheory();
    return;
  }

  theoryBox.classList.add("hidden");
  exerciseBox.classList.remove("hidden");

  if (mode === "type1") {
    currentTask = generateTaskType1();
    currentType = "type1";
    const { a, b, c } = currentTask;
    equationText.innerHTML = `<code>${a}x + ${b} = ${c}</code>`;
  } else if (mode === "type2") {
    currentTask = generateTaskType2();
    currentType = "type2";
    const { a, b, c, d } = currentTask;
    equationText.innerHTML = `<code>${a}x + ${b} = ${c}x + ${d}</code>`;
  } else if (mode === "mixed") {
    if (Math.random() < 0.5) {
      currentTask = generateTaskType1();
      currentType = "type1";
      const { a, b, c } = currentTask;
      equationText.innerHTML = `<code>${a}x + ${b} = ${c}</code>`;
    } else {
      currentTask = generateTaskType2();
      currentType = "type2";
      const { a, b, c, d } = currentTask;
      equationText.innerHTML = `<code>${a}x + ${b} = ${c}x + ${d}</code>`;
    }
  } else if (mode === "exam") {
    if (examOrder.length === 0 || examPointer >= examOrder.length) {
      initExamOrder();
    }
    const idx = examOrder[examPointer++];
    currentTask = examTasks[idx];
    currentType = "exam";

    equationText.innerHTML = `<strong>${currentTask.title}</strong><br>${currentTask.promptHtml}`;
    if (currentTask.hint) {
      hintElem.innerHTML = currentTask.hint;
      hintElem.classList.remove("hidden");
    }
  }
}

function checkAnswer() {
  if (!currentTask || !currentType) return;

  const answerInput = document.getElementById("answer-input");
  const solutionStepsElem = document.getElementById("solution-steps");
  const raw = answerInput.value.trim();

  // Lernsax-Aufgaben
  if (currentType === "exam") {
    const result = currentTask.check(raw);
    setFeedback(result.feedback, result.ok);
    solutionStepsElem.textContent = result.steps;
    return;
  }

  // Trainer-Modus: eine Zahl als Lösung
  const normalized = raw.replace(",", ".");
  const userValue = Number(normalized);
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
    if (modeSelect.value === "theory") {
      showTheory();
    } else {
      newTask();
    }
  });

  newTaskBtn.addEventListener("click", newTask);
  checkBtn.addEventListener("click", checkAnswer);

  // Start: Theorie anzeigen
  showTheory();
});

