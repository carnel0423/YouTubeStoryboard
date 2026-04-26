const storageKey = "youtube-conte-maker-state";
const viewModeStorageKey = "youtube-conte-maker-view-mode";
const driveClientIdStorageKey = "youtube-conte-maker-drive-client-id";
const driveScope = "https://www.googleapis.com/auth/drive.appdata";
const driveFileMimeType = "application/json";
const driveAppPropertyKey = "app";
const driveAppPropertyValue = "youtube-conte-maker";

const defaultState = {
  meta: {
    googleClientId: "",
    currentDriveFileId: "",
    currentDriveFileName: "",
    resolveExportFolder: "",
    videoTitle: "",
    titleCandidateB: "",
    contentCategory: "howto",
    targetAudience: "",
    videoGoal: "",
    videoDuration: "",
    publishWindow: "",
    openingHook: "",
    coreMessage: "",
    thumbnailMessage: "",
    thumbnailEmotion: "",
    descriptionLead: "",
    hookType: "story",
    openingValuePromise: "",
    openLoopPayoff: "",
    patternInterruptPlan: "",
    observedCtr: "",
    observedThirtyRetention: "",
    observedAvd: "",
    qualityScoreNote: "",
    improvementActions: "",
    shortsRepurpose: "",
  },
  scenes: [],
};

const ctrBenchmarks = {
  entertainment: "10-15%",
  howto: "8-12%",
  b2b: "4-8%",
};

const hookBenchmarks = {
  story: "Story Tease / avg 30s retention 93%",
  interrupt: "Pattern Interrupt / avg 30s retention 92%",
  result: "Result Preview / avg 30s retention 91%",
  "open-loop": "Open Loop / avg 30s retention 89%",
  bold: "Bold Statement / avg 30s retention 87%",
  controversy: "Controversy / avg 30s retention 86%",
  "direct-value": "Direct Value / avg 30s retention 85%",
  question: "Compelling Question / avg 30s retention 84%",
  "social-proof": "Social Proof / avg 30s retention 83%",
};

const sceneTypeLabels = {
  intro: "Intro",
  problem: "Problem",
  main: "Main",
  example: "Example",
  summary: "Summary",
  cta: "CTA",
};

const templates = {
  "travel-day": [
    makeScene({ title: "旅の見どころを先出し", type: "intro", seconds: 20, chapter: "0:00 見どころ", script: "一番心が動く景色や瞬間を冒頭で見せる。" }),
    makeScene({ title: "出発と今回の旅テーマ", type: "problem", seconds: 40, chapter: "0:20 出発", script: "今回どこへ行くのか、なぜこの旅なのかを短く伝える。" }),
    makeScene({ title: "移動シーンと街の空気感", type: "main", seconds: 70, chapter: "1:00 移動", visual: "駅、車窓、通り、足元、看板、環境音。" }),
    makeScene({ title: "最初の目的地", type: "example", seconds: 85, chapter: "2:10 目的地1", visual: "引きの景色、寄りの質感、リアクション。" }),
    makeScene({ title: "食事または休憩", type: "example", seconds: 70, chapter: "3:35 食事", visual: "店内、料理、湯気、食べる所作。" }),
    makeScene({ title: "後半の見どころ", type: "main", seconds: 85, chapter: "4:45 目的地2", visual: "移動の変化、時間帯の変化、気持ちの変化。" }),
    makeScene({ title: "旅を通して感じたこと", type: "summary", seconds: 60, chapter: "6:10 まとめ", script: "この旅で印象に残ったことや次につながる感想を話す。" }),
    makeScene({ title: "次回へのつなぎ", type: "cta", seconds: 40, chapter: "7:10 次回予告", cta: "次の旅や関連動画への導線を入れる。" }),
  ],
  "travel-city": [
    makeScene({ title: "街の象徴カット", type: "intro", seconds: 20, chapter: "0:00 冒頭", script: "その街らしさが一瞬で伝わる映像から入る。" }),
    makeScene({ title: "今日の街歩きテーマ", type: "problem", seconds: 40, chapter: "0:20 テーマ", script: "今日は何を見て、何を楽しむ街歩きなのかを伝える。" }),
    makeScene({ title: "1つ目の通りやエリア", type: "main", seconds: 75, chapter: "1:00 エリア1" }),
    makeScene({ title: "発見した店や景色", type: "example", seconds: 80, chapter: "2:15 発見1" }),
    makeScene({ title: "移動と途中の雰囲気", type: "main", seconds: 60, chapter: "3:35 移動" }),
    makeScene({ title: "2つ目の通りやエリア", type: "example", seconds: 80, chapter: "4:35 エリア2" }),
    makeScene({ title: "夕方から夜への変化", type: "summary", seconds: 70, chapter: "5:55 夕景" }),
    makeScene({ title: "街歩きの感想とCTA", type: "cta", seconds: 55, chapter: "7:05 まとめ" }),
  ],
  "travel-cafe": [
    makeScene({ title: "完成品を先に見せる", type: "intro", seconds: 15, chapter: "0:00 フック", script: "一番映えるドリンクやスイーツを最初に見せる。" }),
    makeScene({ title: "店までの導入", type: "problem", seconds: 35, chapter: "0:15 導入" }),
    makeScene({ title: "店内の空気感", type: "main", seconds: 70, chapter: "0:50 店内", visual: "席、光、音、内装、窓際。" }),
    makeScene({ title: "注文と提供シーン", type: "example", seconds: 65, chapter: "2:00 注文" }),
    makeScene({ title: "実食と感想", type: "example", seconds: 80, chapter: "3:05 実食" }),
    makeScene({ title: "周辺の街歩き", type: "main", seconds: 70, chapter: "4:25 周辺散策" }),
    makeScene({ title: "この店が合う人", type: "summary", seconds: 70, chapter: "5:35 まとめ" }),
    makeScene({ title: "次のカフェ紹介へつなぐ", type: "cta", seconds: 55, chapter: "6:45 CTA" }),
  ],
  "travel-hotel": [
    makeScene({ title: "部屋の一番いい画を先出し", type: "intro", seconds: 15, chapter: "0:00 フック" }),
    makeScene({ title: "宿を選んだ理由", type: "problem", seconds: 40, chapter: "0:15 予約背景" }),
    makeScene({ title: "チェックインから外観", type: "main", seconds: 65, chapter: "0:55 外観" }),
    makeScene({ title: "部屋ツアー", type: "example", seconds: 95, chapter: "2:00 客室" }),
    makeScene({ title: "設備と使い勝手", type: "example", seconds: 80, chapter: "3:35 設備" }),
    makeScene({ title: "眺望や共用部", type: "main", seconds: 70, chapter: "4:55 館内" }),
    makeScene({ title: "泊まって感じたこと", type: "summary", seconds: 65, chapter: "6:05 感想" }),
    makeScene({ title: "おすすめの人とCTA", type: "cta", seconds: 50, chapter: "7:10 まとめ" }),
  ],
  "travel-food": [
    makeScene({ title: "一番おいしそうな瞬間", type: "intro", seconds: 15, chapter: "0:00 フック" }),
    makeScene({ title: "今回の食べ歩きテーマ", type: "problem", seconds: 35, chapter: "0:15 テーマ" }),
    makeScene({ title: "1軒目", type: "example", seconds: 75, chapter: "0:50 1軒目" }),
    makeScene({ title: "移動しながら街の雰囲気", type: "main", seconds: 60, chapter: "2:05 街歩き" }),
    makeScene({ title: "2軒目", type: "example", seconds: 75, chapter: "3:05 2軒目" }),
    makeScene({ title: "3軒目またはデザート", type: "example", seconds: 75, chapter: "4:20 3軒目" }),
    makeScene({ title: "今回のベスト3", type: "summary", seconds: 70, chapter: "5:35 ベスト" }),
    makeScene({ title: "次回の候補紹介", type: "cta", seconds: 55, chapter: "6:45 CTA" }),
  ],
  "travel-train": [
    makeScene({ title: "車窓の見どころから入る", type: "intro", seconds: 15, chapter: "0:00 フック" }),
    makeScene({ title: "今回の移動ルート紹介", type: "problem", seconds: 40, chapter: "0:15 ルート" }),
    makeScene({ title: "出発前の駅やホーム", type: "main", seconds: 65, chapter: "0:55 出発前" }),
    makeScene({ title: "車内と車窓", type: "example", seconds: 90, chapter: "2:00 車内" }),
    makeScene({ title: "途中駅や変化", type: "main", seconds: 70, chapter: "3:30 途中" }),
    makeScene({ title: "到着地の第一印象", type: "example", seconds: 70, chapter: "4:40 到着" }),
    makeScene({ title: "移動旅の感想", type: "summary", seconds: 70, chapter: "5:50 感想" }),
    makeScene({ title: "次の目的地へつなぐ", type: "cta", seconds: 60, chapter: "7:00 CTA" }),
  ],
  "travel-story": [
    makeScene({ title: "旅のピークを先に見せる", type: "intro", seconds: 20, chapter: "0:00 ピーク" }),
    makeScene({ title: "この旅に出た理由", type: "problem", seconds: 45, chapter: "0:20 背景" }),
    makeScene({ title: "旅の序盤", type: "main", seconds: 75, chapter: "1:05 序盤" }),
    makeScene({ title: "転機になった出来事", type: "example", seconds: 90, chapter: "2:20 転機" }),
    makeScene({ title: "気持ちが変わる場面", type: "main", seconds: 75, chapter: "3:50 変化" }),
    makeScene({ title: "ピークの回収", type: "example", seconds: 80, chapter: "5:05 回収" }),
    makeScene({ title: "旅で残った感情", type: "summary", seconds: 55, chapter: "6:25 余韻" }),
    makeScene({ title: "次回への布石", type: "cta", seconds: 40, chapter: "7:20 CTA" }),
  ],
  review: [
    makeScene({ title: "結論を先に伝える", type: "intro", seconds: 20, chapter: "0:00 結論" }),
    makeScene({ title: "紹介する背景", type: "problem", seconds: 40, chapter: "0:20 背景" }),
    makeScene({ title: "良かった点", type: "example", seconds: 90, chapter: "1:00 良かった点" }),
    makeScene({ title: "気になった点", type: "example", seconds: 80, chapter: "2:30 気になった点" }),
    makeScene({ title: "向いている人", type: "summary", seconds: 70, chapter: "3:50 向いている人" }),
    makeScene({ title: "総評", type: "summary", seconds: 70, chapter: "5:00 総評" }),
    makeScene({ title: "補足や比較", type: "main", seconds: 60, chapter: "6:10 比較" }),
    makeScene({ title: "CTA", type: "cta", seconds: 50, chapter: "7:10 CTA" }),
  ],
  howto: [
    makeScene({ title: "完成イメージを先見せ", type: "intro", seconds: 20, chapter: "0:00 完成形" }),
    makeScene({ title: "前提と準備", type: "problem", seconds: 45, chapter: "0:20 準備" }),
    makeScene({ title: "手順1", type: "main", seconds: 80, chapter: "1:05 手順1" }),
    makeScene({ title: "手順2", type: "main", seconds: 80, chapter: "2:25 手順2" }),
    makeScene({ title: "手順3", type: "main", seconds: 75, chapter: "3:45 手順3" }),
    makeScene({ title: "よくある失敗", type: "example", seconds: 70, chapter: "5:00 失敗例" }),
    makeScene({ title: "コツのまとめ", type: "summary", seconds: 60, chapter: "6:10 まとめ" }),
    makeScene({ title: "CTA", type: "cta", seconds: 50, chapter: "7:10 CTA" }),
  ],
};

let state = loadState();
let deferredInstallPrompt = null;
let isViewerMode = loadInitialViewMode();
let accessToken = "";
let tokenClient = null;
let tokenExpiresAt = 0;
let driveFiles = [];

const metaIds = [
  "googleClientId",
  "resolveExportFolder",
  "videoTitle",
  "titleCandidateB",
  "contentCategory",
  "targetAudience",
  "videoGoal",
  "videoDuration",
  "publishWindow",
  "openingHook",
  "coreMessage",
  "thumbnailMessage",
  "thumbnailEmotion",
  "descriptionLead",
  "hookType",
  "openingValuePromise",
  "openLoopPayoff",
  "patternInterruptPlan",
  "observedCtr",
  "observedThirtyRetention",
  "observedAvd",
  "qualityScoreNote",
  "improvementActions",
  "shortsRepurpose",
];

const sceneList = document.getElementById("sceneList");
const emptyState = document.getElementById("emptyState");
const template = document.getElementById("sceneTemplate");
const storageStatus = document.getElementById("storageStatus");
const loadJsonInput = document.getElementById("loadJsonInput");
const installAppButton = document.getElementById("installAppButton");
const installStatus = document.getElementById("installStatus");
const toggleViewerButton = document.getElementById("toggleViewerButton");
const viewerBackButton = document.getElementById("viewerBackButton");
const viewerShell = document.getElementById("viewerShell");
const viewerMeta = document.getElementById("viewerMeta");
const viewerHook = document.getElementById("viewerHook");
const viewerCore = document.getElementById("viewerCore");
const viewerScenes = document.getElementById("viewerScenes");
const driveStatus = document.getElementById("driveStatus");
const driveFileSelect = document.getElementById("driveFileSelect");

initialize();

function initialize() {
  bindMetaInputs();
  bindButtons();
  setupPwaSupport();
  render();
}

function bindMetaInputs() {
  metaIds.forEach((id) => {
    const element = document.getElementById(id);
    element.value = state.meta[id] || "";
    const sync = () => {
      state.meta[id] = element.value;
      persistState();
      renderStats();
      renderCheckLists();
      renderViewer();
      updateStorageStatus();
    };
    element.addEventListener("input", sync);
    element.addEventListener("change", sync);
  });
}

function bindButtons() {
  document.getElementById("addSceneButton").addEventListener("click", () => {
    state.scenes.push(makeScene());
    render();
  });

  document.getElementById("newConteButton").addEventListener("click", () => {
    const shouldReset = window.confirm("現在のコンテ内容をクリアして、新しいコンテを作成しますか？");
    if (!shouldReset) {
      return;
    }
    const preservedGoogleClientId = state.meta.googleClientId || "";
    const preservedResolveExportFolder = state.meta.resolveExportFolder || "";
    state = cloneDefaultState();
    state.meta.googleClientId = preservedGoogleClientId;
    state.meta.resolveExportFolder = preservedResolveExportFolder;
    persistState();
    render();
    updateStorageStatus("新規コンテを作成しました。");
  });

  document.getElementById("saveJsonButton").addEventListener("click", () => {
    downloadJson();
  });

  document.getElementById("loadJsonButton").addEventListener("click", () => {
    loadJsonInput.click();
  });

  installAppButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      updateInstallStatus();
      return;
    }
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice.outcome === "accepted") {
      installStatus.textContent = "ホーム画面への追加が承認されました。";
    } else {
      installStatus.textContent = "ホーム画面への追加はキャンセルされました。";
    }
    deferredInstallPrompt = null;
    installAppButton.hidden = true;
  });

  loadJsonInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      state = normalizeLoadedState(parsed);
      persistState();
      render();
      updateStorageStatus(`読み込み完了: ${file.name}`);
    } catch {
      updateStorageStatus("読み込みに失敗しました。JSONファイルを確認してください。");
    } finally {
      loadJsonInput.value = "";
    }
  });

  document.getElementById("pdfButton").addEventListener("click", () => {
    downloadPdf();
  });

  document.getElementById("exportButton").addEventListener("click", () => {
    downloadExport(buildExportText());
  });

  document.getElementById("resolveZipButton").addEventListener("click", async () => {
    await downloadResolveZip();
  });

  toggleViewerButton.addEventListener("click", () => {
    setViewerMode(!isViewerMode);
  });

  viewerBackButton.addEventListener("click", () => {
    setViewerMode(false);
  });

  document.getElementById("connectDriveButton").addEventListener("click", async () => {
    await connectGoogleDrive({ interactive: true });
  });

  document.getElementById("uploadDriveButton").addEventListener("click", async () => {
    await uploadStateToDrive();
  });

  document.getElementById("downloadDriveButton").addEventListener("click", async () => {
    await downloadStateFromDrive();
  });

  document.getElementById("disconnectDriveButton").addEventListener("click", () => {
    disconnectGoogleDrive();
  });

  document.getElementById("refreshDriveFilesButton").addEventListener("click", async () => {
    await refreshDriveFileList({ interactive: true });
  });

  driveFileSelect.addEventListener("change", () => {
    const selected = getSelectedDriveFile();
    if (selected) {
      updateDriveStatus(`Drive同期: 選択中 (${selected.name})`);
    }
  });

  document.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const scenesToAdd = templates[button.dataset.template].map((scene) => ({ ...scene, id: crypto.randomUUID() }));
      state.scenes = [...state.scenes, ...scenesToAdd];
      render();
    });
  });
}

function render() {
  syncMetaInputs();
  sceneList.innerHTML = "";
  emptyState.hidden = state.scenes.length > 0;

  state.scenes.forEach((scene, index) => {
    const fragment = template.content.cloneNode(true);
    const title = fragment.querySelector(".scene-title");
    const type = fragment.querySelector(".scene-type");
    const seconds = fragment.querySelector(".scene-seconds");
    const emotion = fragment.querySelector(".scene-emotion");
    const chapter = fragment.querySelector(".scene-chapter");
    const script = fragment.querySelector(".scene-script");
    const visual = fragment.querySelector(".scene-visual");
    const direction = fragment.querySelector(".scene-direction");
    const cta = fragment.querySelector(".scene-cta");
    const openLoop = fragment.querySelector(".scene-open-loop");
    const pattern = fragment.querySelector(".scene-pattern");

    fragment.querySelector(".scene-order").textContent = `SCENE ${index + 1}`;
    title.value = scene.title;
    type.value = scene.type;
    seconds.value = scene.seconds;
    emotion.value = scene.emotion;
    chapter.value = scene.chapter;
    script.value = scene.script;
    visual.value = scene.visual;
    direction.value = scene.direction;
    cta.value = scene.cta;
    openLoop.value = scene.openLoop;
    pattern.value = scene.pattern;

    title.addEventListener("input", (event) => updateScene(scene.id, "title", event.target.value));
    type.addEventListener("change", (event) => updateScene(scene.id, "type", event.target.value));
    seconds.addEventListener("input", (event) => updateScene(scene.id, "seconds", Number(event.target.value) || 0));
    emotion.addEventListener("input", (event) => updateScene(scene.id, "emotion", event.target.value));
    chapter.addEventListener("input", (event) => updateScene(scene.id, "chapter", event.target.value));
    script.addEventListener("input", (event) => updateScene(scene.id, "script", event.target.value));
    visual.addEventListener("input", (event) => updateScene(scene.id, "visual", event.target.value));
    direction.addEventListener("input", (event) => updateScene(scene.id, "direction", event.target.value));
    cta.addEventListener("input", (event) => updateScene(scene.id, "cta", event.target.value));
    openLoop.addEventListener("input", (event) => updateScene(scene.id, "openLoop", event.target.value));
    pattern.addEventListener("input", (event) => updateScene(scene.id, "pattern", event.target.value));

    fragment.querySelector(".remove-scene").addEventListener("click", () => {
      state.scenes = state.scenes.filter((item) => item.id !== scene.id);
      render();
    });
    fragment.querySelector(".move-up").addEventListener("click", () => moveScene(index, -1));
    fragment.querySelector(".move-down").addEventListener("click", () => moveScene(index, 1));

    sceneList.appendChild(fragment);
  });

  persistState();
  renderStats();
  renderCheckLists();
  renderViewer();
  applyViewMode();
  renderDriveFileOptions();
  updateDriveStatus();
  updateStorageStatus();
}

function syncMetaInputs() {
  metaIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.value = state.meta[id] || "";
    }
  });
}

function renderStats() {
  const title = state.meta.videoTitle || "";
  const descriptionLead = state.meta.descriptionLead || "";
  const totalSeconds = state.scenes.reduce((sum, scene) => sum + Number(scene.seconds || 0), 0);
  const chapterScenes = state.scenes.filter((scene) => scene.chapter.trim());
  const ctaCount = state.scenes.filter((scene) => scene.type === "cta" || scene.cta.trim()).length;

  document.getElementById("sceneCount").textContent = String(state.scenes.length);
  document.getElementById("totalSeconds").textContent = `${totalSeconds}秒`;
  document.getElementById("chapterCount").textContent = String(chapterScenes.length);
  document.getElementById("ctaCount").textContent = String(ctaCount);
  document.getElementById("titleLength").textContent = `${title.length}文字`;
  document.getElementById("frontLoadedStatus").textContent = title.length === 0 ? "未入力" : title.length <= 40 ? "良好" : "40文字超え";
  document.getElementById("ctrBenchmark").textContent = ctrBenchmarks[state.meta.contentCategory] || "-";
  document.getElementById("descriptionStatus").textContent = descriptionLead.length === 0 ? "未入力" : descriptionLead.length <= 150 ? `${descriptionLead.length}/150` : `${descriptionLead.length}/150 超過`;
  document.getElementById("hookBenchmark").textContent = hookBenchmarks[state.meta.hookType] || "-";
  document.getElementById("firstThirtyStatus").textContent = getFirstThirtyCoverage();
}

function renderCheckLists() {
  document.getElementById("prePublishPoint1").textContent =
    state.meta.videoTitle.length > 40
      ? "タイトルが40文字を超えています。最初の40文字に強い魅力を寄せてください"
      : "タイトルの先頭40文字に一番強い魅力が入っているか";

  const chapterCount = state.scenes.filter((scene) => scene.chapter.trim()).length;
  document.getElementById("prePublishPoint2").textContent =
    chapterCount >= 3
      ? "チャプター数は3以上です。最初が0:00開始かも確認してください"
      : "0:00開始を含む3チャプター以上になっているか";

  document.getElementById("prePublishPoint3").textContent = getFirstThirtyCoverage();

  document.getElementById("postPublishPoint1").textContent = state.meta.observedCtr
    ? `初動48時間CTR ${state.meta.observedCtr} を目標帯 ${ctrBenchmarks[state.meta.contentCategory] || "-"} と比較する`
    : "初動48時間のCTRが目標帯を下回っていないか";

  document.getElementById("postPublishPoint2").textContent = state.meta.observedThirtyRetention
    ? `冒頭30秒維持率 ${state.meta.observedThirtyRetention} が弱いなら冒頭を修正する`
    : "冒頭30秒維持率が弱ければフックを修正する";

  document.getElementById("postPublishPoint3").textContent = state.meta.shortsRepurpose.trim()
    ? `Shorts候補: ${state.meta.shortsRepurpose}`
    : "維持率が高い区間をShorts候補として残す";
}

function renderViewer() {
  const metaRows = [
    { label: "タイトル", value: state.meta.videoTitle || "未入力" },
    { label: "想定尺", value: state.meta.videoDuration || "未入力" },
    { label: "想定視聴者", value: state.meta.targetAudience || "未入力" },
    { label: "サムネ文言", value: state.meta.thumbnailMessage || "未入力" },
  ];

  viewerMeta.innerHTML = metaRows
    .map(
      (row) => `
        <div class="viewer-meta-row">
          <span class="viewer-meta-label">${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(row.value)}</strong>
        </div>
      `
    )
    .join("");

  viewerHook.innerHTML = buildViewerNote([
    { label: "冒頭フック", value: state.meta.openingHook || "未入力" },
    { label: "冒頭の約束", value: state.meta.openingValuePromise || "未入力" },
    { label: "オープンループ", value: state.meta.openLoopPayoff || "未入力" },
  ]);

  viewerCore.innerHTML = buildViewerNote([
    { label: "動画の目的", value: state.meta.videoGoal || "未入力" },
    { label: "視聴後に残したいこと", value: state.meta.coreMessage || "未入力" },
    { label: "変化メモ", value: state.meta.patternInterruptPlan || "未入力" },
  ]);

  if (state.scenes.length === 0) {
    viewerScenes.innerHTML = `<p class="helper-text">まだシーンがありません。編集画面でコンテを作成してください。</p>`;
    return;
  }

  viewerScenes.innerHTML = state.scenes
    .map(
      (scene, index) => `
        <article class="viewer-scene-card">
          <div class="viewer-scene-top">
            <span class="scene-order">SCENE ${index + 1}</span>
            <strong>${escapeHtml(scene.title || "Untitled")}</strong>
          </div>
          <div class="viewer-scene-meta">
            <span>${escapeHtml(scene.chapter || "チャプター未設定")}</span>
            <span>${escapeHtml(formatSeconds(scene.seconds))}</span>
            <span>${escapeHtml(scene.emotion || "感情メモなし")}</span>
          </div>
          <div class="viewer-scene-block">
            <p class="viewer-block-title">話す内容</p>
            <p>${escapeHtml(scene.script || "未入力")}</p>
          </div>
          <div class="viewer-scene-block">
            <p class="viewer-block-title">画づくり</p>
            <p>${escapeHtml(scene.visual || "未入力")}</p>
          </div>
          <div class="viewer-scene-block">
            <p class="viewer-block-title">次へのつなぎ</p>
            <p>${escapeHtml(scene.cta || scene.openLoop || "未入力")}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function updateScene(id, key, value) {
  const scene = state.scenes.find((item) => item.id === id);
  if (!scene) {
    return;
  }
  scene[key] = value;
  persistState();
  renderStats();
  renderCheckLists();
  renderViewer();
  updateStorageStatus();
}

function moveScene(index, direction) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= state.scenes.length) {
    return;
  }
  const nextScenes = [...state.scenes];
  [nextScenes[index], nextScenes[newIndex]] = [nextScenes[newIndex], nextScenes[index]];
  state.scenes = nextScenes;
  render();
}

function getFirstThirtyCoverage() {
  let seconds = 0;
  let reachedIndex = -1;
  for (let index = 0; index < state.scenes.length; index += 1) {
    seconds += Number(state.scenes[index].seconds || 0);
    if (seconds >= 30) {
      reachedIndex = index;
      break;
    }
  }
  if (state.scenes.length === 0) {
    return "シーン未作成";
  }
  if (reachedIndex >= 0) {
    return `30秒はSCENE 1-${reachedIndex + 1}でカバー`;
  }
  return `30秒に不足: 現在${seconds}秒`;
}

function downloadJson() {
  const payload = {
    app: "youtube-conte-maker",
    version: 1,
    savedAt: new Date().toISOString(),
    state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeTitle = (state.meta.videoTitle || "youtube-conte").replace(/[\\/:*?"<>|]+/g, "-");
  link.href = url;
  link.download = `${safeTitle}.json`;
  link.click();
  URL.revokeObjectURL(url);
  updateStorageStatus("コンテをJSONで保存しました。");
}

function normalizeLoadedState(parsed) {
  const loadedState = parsed?.state || parsed;
  return {
    meta: { ...defaultState.meta, ...(loadedState.meta || {}) },
    scenes: Array.isArray(loadedState.scenes) ? loadedState.scenes.map(normalizeScene) : [],
  };
}

function updateStorageStatus(message) {
  if (message) {
    storageStatus.textContent = `${message} 保存形式: JSON`;
    return;
  }
  const title = state.meta.videoTitle || "未命名コンテ";
  const driveLinked = state.meta.currentDriveFileName ? ` / Drive: ${state.meta.currentDriveFileName}` : "";
  storageStatus.textContent = `現在のコンテ: ${title}${driveLinked} / 保存形式: JSON`;
}

function updateDriveStatus(message) {
  if (message) {
    driveStatus.textContent = message;
    return;
  }

  if (!state.meta.googleClientId) {
    driveStatus.textContent = "Drive同期: クライアントID未設定";
    return;
  }

  if (!accessToken) {
    driveStatus.textContent = "Drive同期: クライアントID設定済み / 未接続";
    return;
  }

  driveStatus.textContent = driveFiles.length > 0
    ? `Drive同期: 接続中 / ${driveFiles.length}件`
    : "Drive同期: 接続中";
}

function buildViewerNote(items) {
  return items
    .map(
      (item) => `
        <div class="viewer-note-row">
          <p class="viewer-block-title">${escapeHtml(item.label)}</p>
          <p>${escapeHtml(item.value)}</p>
        </div>
      `
    )
    .join("");
}

function setViewerMode(nextMode) {
  isViewerMode = nextMode;
  localStorage.setItem(viewModeStorageKey, JSON.stringify(isViewerMode));
  applyViewMode();
  syncViewerUrl();
}

function applyViewMode() {
  document.body.classList.toggle("viewer-mode", isViewerMode);
  viewerShell.hidden = !isViewerMode;
  toggleViewerButton.textContent = isViewerMode ? "編集モードへ" : "スマホ確認モード";
}

function syncViewerUrl() {
  const url = new URL(window.location.href);
  if (isViewerMode) {
    url.searchParams.set("mode", "viewer");
  } else {
    url.searchParams.delete("mode");
  }
  window.history.replaceState({}, "", url);
}

async function connectGoogleDrive({ interactive }) {
  try {
    const clientId = getGoogleClientId();
    if (!clientId) {
      updateDriveStatus("Drive同期: 先に Google OAuth クライアントIDを入力してください");
      return false;
    }

    await ensureGoogleIdentityLoaded();
    if (!tokenClient || tokenClient.client_id !== clientId) {
      tokenClient = createTokenClient(clientId);
    }

    if (accessToken && Date.now() < tokenExpiresAt) {
      updateDriveStatus("Drive同期: 接続中");
      return true;
    }

    accessToken = await requestAccessToken(interactive);
    await refreshDriveFileList({ interactive: false });
    updateDriveStatus("Drive同期: 接続中");
    return true;
  } catch (error) {
    updateDriveStatus(`Drive同期: 接続失敗 (${getErrorMessage(error)})`);
    return false;
  }
}

function disconnectGoogleDrive() {
  if (accessToken && window.google?.accounts?.oauth2?.revoke) {
    window.google.accounts.oauth2.revoke(accessToken, () => {});
  }
  accessToken = "";
  tokenExpiresAt = 0;
  driveFiles = [];
  renderDriveFileOptions();
  updateDriveStatus("Drive同期: 接続解除しました");
}

async function uploadStateToDrive() {
  const ready = await connectGoogleDrive({ interactive: true });
  if (!ready) {
    return;
  }

  try {
    updateDriveStatus("Drive同期: Driveへ保存中...");
    const existingFile = getPreferredDriveFile() || getMatchingDriveFileForCurrentState() || await findDriveFileByName(getDriveFileName());
    const payload = JSON.stringify(buildDrivePayload(), null, 2);
    const fileId = await uploadDriveFile(payload, existingFile?.id || "");
    state.meta.currentDriveFileId = fileId || "";
    state.meta.currentDriveFileName = getDriveFileName();
    persistState();
    await refreshDriveFileList({ interactive: false, preferredFileId: fileId });
    updateDriveStatus(`Drive同期: 保存完了 (${existingFile ? "更新" : "新規作成"})`);
    return fileId;
  } catch (error) {
    updateDriveStatus(`Drive同期: 保存失敗 (${getErrorMessage(error)})`);
  }
}

async function downloadStateFromDrive() {
  const ready = await connectGoogleDrive({ interactive: true });
  if (!ready) {
    return;
  }

  try {
    updateDriveStatus("Drive同期: Driveから読込中...");
    if (driveFiles.length === 0) {
      await refreshDriveFileList({ interactive: false });
    }

    const selectedFile = getSelectedDriveFile() || driveFiles[0];
    if (!selectedFile?.id) {
      updateDriveStatus("Drive同期: Drive上に保存されたコンテがありません");
      return;
    }

    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${selectedFile.id}?alt=media`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    await assertDriveResponse(response);
    const parsed = await response.json();
    state = normalizeLoadedState(parsed.state ? parsed : parsed?.payload || parsed);
    state.meta.currentDriveFileId = selectedFile.id;
    state.meta.currentDriveFileName = selectedFile.name;
    persistState();
    render();
    driveFileSelect.value = selectedFile.id;
    updateDriveStatus(`Drive同期: ${selectedFile.name} を読み込みました`);
  } catch (error) {
    updateDriveStatus(`Drive同期: 読込失敗 (${getErrorMessage(error)})`);
  }
}

function buildDrivePayload() {
  return {
    app: driveAppPropertyValue,
    version: 1,
    savedAt: new Date().toISOString(),
    state,
  };
}

async function refreshDriveFileList({ interactive, preferredFileId = "" }) {
  const ready = await connectGoogleDrive({ interactive });
  if (!ready) {
    return [];
  }

  const files = await listDriveFiles();
  driveFiles = files;
  renderDriveFileOptions(preferredFileId);
  updateDriveStatus();
  return files;
}

async function listDriveFiles() {
  const query = encodeURIComponent(
    `trashed=false and mimeType='${driveFileMimeType}' and appProperties has { key='${driveAppPropertyKey}' and value='${driveAppPropertyValue}' }`
  );
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  await assertDriveResponse(response);
  const data = await response.json();
  return data.files || [];
}

async function findDriveFileByName(fileName) {
  const query = encodeURIComponent(
    `name='${fileName.replace(/'/g, "\\'")}' and trashed=false and appProperties has { key='${driveAppPropertyKey}' and value='${driveAppPropertyValue}' }`
  );
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&fields=files(id,name,modifiedTime)&q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  await assertDriveResponse(response);
  const data = await response.json();
  return data.files?.[0] || null;
}

async function uploadDriveFile(content, fileId) {
  const fileName = getDriveFileName();
  const metadata = fileId
    ? { name: fileName, appProperties: { [driveAppPropertyKey]: driveAppPropertyValue } }
    : { name: fileName, parents: ["appDataFolder"], appProperties: { [driveAppPropertyKey]: driveAppPropertyValue } };
  const boundary = `conte-app-${Date.now()}`;
  const body = [
    `--${boundary}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    JSON.stringify(metadata),
    `--${boundary}`,
    `Content-Type: ${driveFileMimeType}`,
    "",
    content,
    `--${boundary}--`,
  ].join("\r\n");

  const method = fileId ? "PATCH" : "POST";
  const url = fileId
    ? `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`
    : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });
  await assertDriveResponse(response);
  const data = await response.json();
  return data.id;
}

function renderDriveFileOptions(preferredFileId = "") {
  const previousValue = preferredFileId || driveFileSelect.value;

  if (driveFiles.length === 0) {
    driveFileSelect.innerHTML = `<option value="">未取得</option>`;
    driveFileSelect.value = "";
    return;
  }

  driveFileSelect.innerHTML = driveFiles
    .map((file) => `<option value="${escapeHtml(file.id)}">${escapeHtml(file.name)} (${escapeHtml(formatDriveDate(file.modifiedTime))})</option>`)
    .join("");

  const nextValue = driveFiles.some((file) => file.id === previousValue)
    ? previousValue
    : driveFiles[0].id;
  driveFileSelect.value = nextValue;
}

function getSelectedDriveFile() {
  return driveFiles.find((file) => file.id === driveFileSelect.value) || null;
}

function getPreferredDriveFile() {
  const selectedFile = getSelectedDriveFile();
  if (selectedFile?.id) {
    return selectedFile;
  }

  if (state.meta.currentDriveFileId) {
    return driveFiles.find((file) => file.id === state.meta.currentDriveFileId) || null;
  }

  return null;
}

function getDriveFileName() {
  const safeTitle = (state.meta.videoTitle || "youtube-conte").trim() || "youtube-conte";
  return `${safeTitle.replace(/[\\/:*?"<>|]+/g, "-")}.json`;
}

function getMatchingDriveFileForCurrentState() {
  const targetName = getDriveFileName();
  return driveFiles.find((file) => file.name === targetName) || null;
}

async function assertDriveResponse(response) {
  if (response.ok) {
    return;
  }

  let message = `HTTP ${response.status}`;
  try {
    const errorPayload = await response.json();
    message = errorPayload?.error?.message || message;
  } catch {}
  throw new Error(message);
}

function getGoogleClientId() {
  return (state.meta.googleClientId || "").trim();
}

function createTokenClient(clientId) {
  const instance = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: driveScope,
    callback: () => {},
  });
  instance.client_id = clientId;
  return instance;
}

function requestAccessToken(interactive) {
  return new Promise((resolve, reject) => {
    tokenClient.callback = (response) => {
      if (response?.error) {
        reject(new Error(response.error));
        return;
      }

      accessToken = response.access_token || "";
      const expiresInSeconds = Number(response.expires_in || 0);
      tokenExpiresAt = Date.now() + expiresInSeconds * 1000 - 60000;
      resolve(accessToken);
    };

    tokenClient.requestAccessToken({
      prompt: interactive ? "consent" : "",
    });
  });
}

function ensureGoogleIdentityLoaded() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        window.clearInterval(timer);
        resolve();
        return;
      }

      if (Date.now() - startedAt > 10000) {
        window.clearInterval(timer);
        reject(new Error("Google Identity Services の読み込みに失敗しました"));
      }
    }, 100);
  });
}

function getErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "不明なエラー";
}

function setupPwaSupport() {
  updateInstallStatus();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      installStatus.textContent = "Webアプリ登録の準備に失敗しました。";
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installAppButton.hidden = false;
    installStatus.textContent = "ホーム画面に追加できる状態です。";
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    installAppButton.hidden = true;
    installStatus.textContent = "Webアプリとしてインストール済みです。";
  });
}

function updateInstallStatus() {
  if (location.protocol === "file:") {
    installStatus.textContent = "ローカル表示中です。Web公開するとホーム画面追加できます。";
    installAppButton.hidden = true;
    return;
  }

  if (window.matchMedia("(display-mode: standalone)").matches) {
    installStatus.textContent = "Webアプリとして起動中です。";
    installAppButton.hidden = true;
    return;
  }

  installStatus.textContent = "Web公開後にホーム画面追加できます。";
}

function buildExportText() {
  const lines = [
    "# YouTube Storyboard",
    "",
    "## Core",
    `Title: ${state.meta.videoTitle || "-"}`,
    `Swap Test Title: ${state.meta.titleCandidateB || "-"}`,
    `Category: ${state.meta.contentCategory || "-"}`,
    `Audience: ${state.meta.targetAudience || "-"}`,
    `Goal: ${state.meta.videoGoal || "-"}`,
    `Duration: ${state.meta.videoDuration || "-"}`,
    `Publish Window: ${state.meta.publishWindow || "-"}`,
    `Opening Hook: ${state.meta.openingHook || "-"}`,
    `Core Message: ${state.meta.coreMessage || "-"}`,
    "",
    "## CTR Package",
    `Thumbnail Message: ${state.meta.thumbnailMessage || "-"}`,
    `Thumbnail Emotion: ${state.meta.thumbnailEmotion || "-"}`,
    `CTR Benchmark: ${ctrBenchmarks[state.meta.contentCategory] || "-"}`,
    `Description Lead: ${state.meta.descriptionLead || "-"}`,
    "",
    "## First 30 Seconds",
    `Hook Type: ${hookBenchmarks[state.meta.hookType] || "-"}`,
    `Opening Value Promise: ${state.meta.openingValuePromise || "-"}`,
    `Open Loop Promise: ${state.meta.openLoopPayoff || "-"}`,
    `Pattern Change Plan: ${state.meta.patternInterruptPlan || "-"}`,
    "",
    "## Scenes",
    "",
  ];

  state.scenes.forEach((scene, index) => {
    lines.push(`### Scene ${index + 1}: ${scene.title || "Untitled"}`);
    lines.push(`Type: ${sceneTypeLabels[scene.type] || scene.type}`);
    lines.push(`Seconds: ${scene.seconds || 0}`);
    lines.push(`Emotion: ${scene.emotion || "-"}`);
    lines.push(`Chapter: ${scene.chapter || "-"}`);
    lines.push(`Script: ${scene.script || "-"}`);
    lines.push(`Visual: ${scene.visual || "-"}`);
    lines.push(`Direction: ${scene.direction || "-"}`);
    lines.push(`CTA: ${scene.cta || "-"}`);
    lines.push(`Open Loop: ${scene.openLoop || "-"}`);
    lines.push(`Pattern Change: ${scene.pattern || "-"}`);
    lines.push("");
  });

  lines.push("## Post Publish");
  lines.push(`CTR 48h: ${state.meta.observedCtr || "-"}`);
  lines.push(`30s Retention: ${state.meta.observedThirtyRetention || "-"}`);
  lines.push(`AVD: ${state.meta.observedAvd || "-"}`);
  lines.push(`Quality Score Note: ${state.meta.qualityScoreNote || "-"}`);
  lines.push(`Improvement Actions: ${state.meta.improvementActions || "-"}`);
  lines.push(`Shorts Repurpose: ${state.meta.shortsRepurpose || "-"}`);
  return lines.join("\n");
}

function downloadExport(output) {
  const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeTitle = (state.meta.videoTitle || "youtube-conte").replace(/[\\/:*?"<>|]+/g, "-");
  link.href = url;
  link.download = `${safeTitle}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

async function downloadResolveZip() {
  if (!state.scenes.length) {
    updateStorageStatus("Resolve用ZIPを作るにはシーンが必要です。");
    return;
  }
  const safeTitle = safeFileName(state.meta.videoTitle || "storyboard");
  const resolveExportFolder = normalizeWindowsFolder(state.meta.resolveExportFolder || "");
  if (!resolveExportFolder) {
    updateStorageStatus("Resolve書き出しフォルダを入力してから、Resolve用ZIPを作成してください。");
    return;
  }
  const scenes = buildStoryboardScenes();
  const placeholderEntries = [];
  for (const scene of scenes) {
    const blob = await createPlaceholderPng(scene);
    placeholderEntries.push({
      name: `placeholders/${scene.fileName}.png`,
      blob,
    });
  }
  const fcpxml = buildResolveStoryboardFcpxml(scenes, resolveExportFolder);
  const generatorHtml = buildResolveGeneratorHtml(scenes, state.meta.videoTitle || "Storyboard timeline");
  const readme = [
    "DaVinci Resolve import",
    "",
    `1. Extract this ZIP directly into: ${resolveExportFolder}`,
    "2. In DaVinci Resolve, choose File > Import > Timeline.",
    "3. Select storyboard_timeline.fcpxml from the extracted folder.",
    "",
    "The placeholder PNGs are black scene cards. Replace them with real clips during editing.",
    "If Resolve shows the media as offline, open make_resolve_fcpxml.html from the extracted folder and create storyboard_timeline_absolute.fcpxml.",
    "",
  ].join("\n");
  const zipBlob = await createZip([
    { name: "storyboard_timeline.fcpxml", blob: new Blob([fcpxml], { type: "application/xml;charset=utf-8" }) },
    { name: "make_resolve_fcpxml.html", blob: new Blob([generatorHtml], { type: "text/html;charset=utf-8" }) },
    { name: "README.txt", blob: new Blob([readme], { type: "text/plain;charset=utf-8" }) },
    ...placeholderEntries,
  ]);
  downloadBlob(zipBlob, `${safeTitle}_resolve_storyboard.zip`);
  updateStorageStatus(`Resolve用ZIPを書き出しました。ZIPを「${resolveExportFolder}」に展開して、storyboard_timeline.fcpxmlを読み込んでください。`);
}

function buildStoryboardScenes() {
  let recordFrame = 0;
  return state.scenes.map((scene, index) => {
    const seconds = Math.max(1, Number(scene.seconds || 10));
    const durationFrames = Math.max(1, Math.round(seconds * 30));
    const item = {
      index: index + 1,
      id: scene.id || `scene-${String(index + 1).padStart(2, "0")}`,
      title: scene.title || `Scene ${index + 1}`,
      type: scene.type || "scene",
      seconds,
      durationFrames,
      recordFrame,
      fileName: `${String(index + 1).padStart(2, "0")}_${safeFileName(scene.id || `scene-${index + 1}`)}_${safeFileName(scene.type || "scene")}_${Math.round(seconds)}s`,
    };
    recordFrame += durationFrames;
    return item;
  });
}

function buildResolveStoryboardFcpxml(scenes, resolveExportFolder = "") {
  const totalFrames = scenes.reduce((sum, scene) => sum + scene.durationFrames, 0);
  const title = xmlEscape(state.meta.videoTitle || "Storyboard timeline");
  const resources = [
    '    <format id="r1" name="FFVideoFormat1080p30" frameDuration="1/30s" width="1920" height="1080" />',
    ...scenes.map((scene) => {
      const id = `r${scene.index + 1}`;
      const sourcePath = resolveExportFolder
        ? windowsPathToFileUrl(joinWindowsPath(resolveExportFolder, "placeholders", `${scene.fileName}.png`))
        : `placeholders/${encodeURIComponent(scene.fileName)}.png`;
      return `    <asset id="${id}" name="${xmlEscape(scene.fileName)}.png" src="${xmlEscape(sourcePath)}" start="0s" duration="${scene.durationFrames}/30s" hasVideo="1" format="r1" />`;
    }),
  ].join("\n");
  const clips = scenes.map((scene) => {
    const id = `r${scene.index + 1}`;
    const name = xmlEscape(`${String(scene.index).padStart(2, "0")}_${scene.title}_${Math.round(scene.seconds)}s`);
    return [
      `            <asset-clip name="${name}" ref="${id}" offset="${scene.recordFrame}/30s" start="0s" duration="${scene.durationFrames}/30s" tcFormat="NDF">`,
      `              <marker start="0s" duration="${scene.durationFrames}/30s" value="${name}" />`,
      "            </asset-clip>",
    ].join("\n");
  }).join("\n");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<fcpxml version="1.8">',
    '  <resources>',
    resources,
    '  </resources>',
    '  <library>',
    '    <event name="Storyboard">',
    `      <project name="${title}">`,
    `        <sequence format="r1" duration="${Math.max(1, totalFrames)}/30s" tcStart="0s" tcFormat="NDF">`,
    '          <spine>',
    clips,
    '          </spine>',
    '        </sequence>',
    '      </project>',
    '    </event>',
    '  </library>',
    '</fcpxml>',
    '',
  ].join("\n");
}

function buildResolveGeneratorHtml(scenes, timelineTitle) {
  const payload = JSON.stringify({ scenes, timelineTitle });
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Resolve FCPXML Generator</title>
  <style>
    body { font-family: "Yu Gothic UI", Meiryo, sans-serif; margin: 32px; line-height: 1.7; color: #222; }
    button { font: inherit; padding: 12px 18px; border: 0; border-radius: 8px; background: #222; color: #fff; cursor: pointer; }
    code { background: #f2f2f2; padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>DaVinci Resolve用FCPXML生成</h1>
  <p>このHTMLはZIPを展開したフォルダ内で開いてください。</p>
  <p><button id="download">storyboard_timeline_absolute.fcpxml を作成</button></p>
  <p>作成後、DaVinci Resolveで <code>ファイル → 読み込み → タイムライン</code> から読み込んでください。</p>
  <script>
    const payload = ${payload};
    document.getElementById("download").addEventListener("click", () => {
      const base = new URL("./", window.location.href);
      const fcpxml = buildFcpxml(payload.scenes, payload.timelineTitle, base);
      const blob = new Blob([fcpxml], { type: "application/xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "storyboard_timeline_absolute.fcpxml";
      link.click();
      URL.revokeObjectURL(url);
    });

    function buildFcpxml(scenes, timelineTitle, base) {
      const totalFrames = scenes.reduce((sum, scene) => sum + scene.durationFrames, 0);
      const resources = [
        '    <format id="r1" name="FFVideoFormat1080p30" frameDuration="1/30s" width="1920" height="1080" />',
        ...scenes.map((scene) => {
          const src = new URL("placeholders/" + encodeURIComponent(scene.fileName) + ".png", base).href;
          return '    <asset id="r' + (scene.index + 1) + '" name="' + xmlEscape(scene.fileName) + '.png" src="' + xmlEscape(src) + '" start="0s" duration="' + scene.durationFrames + '/30s" hasVideo="1" format="r1" />';
        }),
      ].join("\\n");
      const clips = scenes.map((scene) => {
        const name = xmlEscape(String(scene.index).padStart(2, "0") + "_" + scene.title + "_" + Math.round(scene.seconds) + "s");
        return [
          '            <asset-clip name="' + name + '" ref="r' + (scene.index + 1) + '" offset="' + scene.recordFrame + '/30s" start="0s" duration="' + scene.durationFrames + '/30s" tcFormat="NDF">',
          '              <marker start="0s" duration="' + scene.durationFrames + '/30s" value="' + name + '" />',
          '            </asset-clip>',
        ].join("\\n");
      }).join("\\n");
      return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<fcpxml version="1.8">',
        '  <resources>',
        resources,
        '  </resources>',
        '  <library>',
        '    <event name="Storyboard">',
        '      <project name="' + xmlEscape(timelineTitle || "Storyboard timeline") + '">',
        '        <sequence format="r1" duration="' + Math.max(1, totalFrames) + '/30s" tcStart="0s" tcFormat="NDF">',
        '          <spine>',
        clips,
        '          </spine>',
        '        </sequence>',
        '      </project>',
        '    </event>',
        '  </library>',
        '</fcpxml>',
        '',
      ].join("\\n");
    }

    function xmlEscape(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
  </script>
</body>
</html>`;
}

function createPlaceholderPng(scene) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;
    const context = canvas.getContext("2d");
    context.fillStyle = "#050505";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = '700 76px "Yu Gothic UI", Meiryo, sans-serif';
    wrapCanvasText(context, `${String(scene.index).padStart(2, "0")} ${scene.title}`, 960, 460, 1500, 92);
    context.font = '500 52px "Yu Gothic UI", Meiryo, sans-serif';
    context.fillStyle = "#d8d8d8";
    context.fillText(`${scene.id} / ${Math.round(scene.seconds)}秒`, 960, 650);
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight) {
  const words = Array.from(text);
  const lines = [];
  let line = "";
  words.forEach((char) => {
    const testLine = line + char;
    if (context.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = testLine;
    }
  });
  if (line) {
    lines.push(line);
  }
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((lineText, index) => {
    context.fillText(lineText, x, startY + index * lineHeight);
  });
}

function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeFileName(value) {
  return String(value || "storyboard")
    .replace(/[\\/:*?"<>|\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "storyboard";
}

function normalizeWindowsFolder(value) {
  return String(value || "")
    .trim()
    .replace(/^"|"$/g, "")
    .replace(/[\\/]+$/g, "");
}

function joinWindowsPath(folder, ...parts) {
  return [normalizeWindowsFolder(folder), ...parts]
    .filter(Boolean)
    .join("\\");
}

function windowsPathToFileUrl(path) {
  const normalized = String(path || "").replace(/\\/g, "/");
  const match = normalized.match(/^([A-Za-z]:)(?:\/(.*))?$/);
  if (match) {
    const [, drive, rest = ""] = match;
    const encodedRest = rest.split("/").filter(Boolean).map(encodeURIComponent).join("/");
    return `file:///${drive}/${encodedRest}`;
  }
  const encodedPath = normalized.split("/").filter(Boolean).map(encodeURIComponent).join("/");
  return `file:///${encodedPath}`;
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

async function createZip(entries) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const entry of entries) {
    const data = new Uint8Array(await entry.blob.arrayBuffer());
    const nameBytes = encoder.encode(entry.name);
    const crc = crc32(data);
    const localHeader = zipLocalHeader(nameBytes, crc, data.length);
    localParts.push(localHeader, data);
    centralParts.push(zipCentralHeader(nameBytes, crc, data.length, offset));
    offset += localHeader.length + data.length;
  }
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = zipEndRecord(entries.length, centralSize, offset);
  return new Blob([...localParts, ...centralParts, end], { type: "application/zip" });
}

function zipLocalHeader(nameBytes, crc, size) {
  const bytes = new Uint8Array(30 + nameBytes.length);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 0x0800, true);
  view.setUint16(8, 0, true);
  view.setUint32(14, crc, true);
  view.setUint32(18, size, true);
  view.setUint32(22, size, true);
  view.setUint16(26, nameBytes.length, true);
  bytes.set(nameBytes, 30);
  return bytes;
}

function zipCentralHeader(nameBytes, crc, size, offset) {
  const bytes = new Uint8Array(46 + nameBytes.length);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint16(8, 0x0800, true);
  view.setUint16(10, 0, true);
  view.setUint32(16, crc, true);
  view.setUint32(20, size, true);
  view.setUint32(24, size, true);
  view.setUint16(28, nameBytes.length, true);
  view.setUint32(42, offset, true);
  bytes.set(nameBytes, 46);
  return bytes;
}

function zipEndRecord(entryCount, centralSize, centralOffset) {
  const bytes = new Uint8Array(22);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, 0x06054b50, true);
  view.setUint16(8, entryCount, true);
  view.setUint16(10, entryCount, true);
  view.setUint32(12, centralSize, true);
  view.setUint32(16, centralOffset, true);
  return bytes;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
})();

function crc32(data) {
  let crc = 0xffffffff;
  for (let index = 0; index < data.length; index += 1) {
    crc = crcTable[(crc ^ data[index]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function downloadPdf() {
  const safeTitle = (state.meta.videoTitle || "youtube-conte").replace(/[\\/:*?"<>|]+/g, "-");
  const pdfBytes = createSimplePdf(buildPdfLines());
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeTitle}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

function buildPdfLines() {
  return buildExportText().split("\n").map((line) => sanitizePdfText(line));
}

function createSimplePdf(lines) {
  const objects = [];
  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };

  const pageLines = 42;
  const pages = [];
  for (let i = 0; i < lines.length; i += pageLines) {
    pages.push(lines.slice(i, i + pageLines));
  }

  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds = [];
  const contentIds = [];

  pages.forEach((pageLinesContent) => {
    const stream = buildPdfStream(pageLinesContent);
    const contentId = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    contentIds.push(contentId);
    pageIds.push(addObject(""));
  });

  const pagesId = addObject("");

  pageIds.forEach((_, index) => {
    objects[pageIds[index] - 1] =
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Contents ${contentIds[index]} 0 R /Resources << /Font << /F1 ${fontId} 0 R >> >> >>`;
  });

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

function buildPdfStream(lines) {
  let y = 800;
  const commands = ["BT", "/F1 11 Tf"];
  lines.forEach((line) => {
    commands.push(`1 0 0 1 40 ${y} Tm`);
    commands.push(`(${escapePdfString(line)}) Tj`);
    y -= 18;
  });
  commands.push("ET");
  return commands.join("\n");
}

function sanitizePdfText(text) {
  return String(text || "")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "?");
}

function escapePdfString(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function persistState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  localStorage.setItem(driveClientIdStorageKey, state.meta.googleClientId || "");
}

function loadState() {
  const saved = localStorage.getItem(storageKey);
  const savedDriveClientId = localStorage.getItem(driveClientIdStorageKey) || "";
  if (!saved) {
    const initialState = cloneDefaultState();
    initialState.meta.googleClientId = savedDriveClientId;
    return initialState;
  }
  try {
    const parsed = JSON.parse(saved);
    const normalized = normalizeLoadedState(parsed);
    normalized.meta.googleClientId = normalized.meta.googleClientId || savedDriveClientId;
    return normalized;
  } catch {
    const initialState = cloneDefaultState();
    initialState.meta.googleClientId = savedDriveClientId;
    return initialState;
  }
}

function normalizeScene(scene) {
  return makeScene(scene);
}

function makeScene(overrides = {}) {
  return {
    id: overrides.id || crypto.randomUUID(),
    title: overrides.title || "",
    type: overrides.type || "main",
    seconds: overrides.seconds || 0,
    emotion: overrides.emotion || "",
    chapter: overrides.chapter || "",
    script: overrides.script || "",
    visual: overrides.visual || "",
    direction: overrides.direction || "",
    cta: overrides.cta || "",
    openLoop: overrides.openLoop || "",
    pattern: overrides.pattern || "",
  };
}

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(defaultState));
}

function loadInitialViewMode() {
  const mode = new URLSearchParams(window.location.search).get("mode");
  if (mode === "viewer") {
    return true;
  }

  const saved = localStorage.getItem(viewModeStorageKey);
  if (!saved) {
    return false;
  }

  try {
    return Boolean(JSON.parse(saved));
  } catch {
    return false;
  }
}

function formatSeconds(value) {
  const seconds = Number(value || 0);
  if (seconds <= 0) {
    return "秒数未設定";
  }

  if (seconds < 60) {
    return `${seconds}秒`;
  }

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest === 0 ? `${minutes}分` : `${minutes}分${rest}秒`;
}

function formatDriveDate(value) {
  if (!value) {
    return "更新時刻不明";
  }

  try {
    return new Date(value).toLocaleString("ja-JP");
  } catch {
    return value;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
