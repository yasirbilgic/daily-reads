"use strict";
console.log("[DailyReads] main.js LOADED");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => DailyReadsPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian4 = require("obsidian");

// src/types.ts
var DEFAULT_STATE = {
  noteStates: {},
  dailyPlans: {},
  lastPlannedDate: null,
  sequentialCycle: { order: [], cursor: 0, round: 1 },
  initialPaths: []
};
var DEFAULT_SETTINGS = {
  scopeMode: "include",
  folders: [],
  excludeFolders: [],
  dailyTarget: 5,
  defaultIntervalsInDays: [1, 3, 7, 14, 30],
  includeSubfolders: true,
  includeFolderNotes: false,
  stateFolder: "99_S\u0130STEM/Haf\u0131za",
  stateFileName: "daily-reads-state.md",
  sortStrategy: "oldest-due",
  queueMode: "due",
  deferMode: "tomorrow",
  deferDays: 2,
  useDayTargets: false,
  mondayTarget: 5,
  tuesdayTarget: 5,
  wednesdayTarget: 5,
  thursdayTarget: 5,
  fridayTarget: 5,
  saturdayTarget: 3,
  sundayTarget: 3,
  openInNewTab: false,
  openInReadingMode: false,
  deferCapMode: "none",
  deferCapFixedDays: 90,
  deferCapFormulaMultiplier: 2,
  deferCapFormulaMinDays: 7,
  autoOpenNext: true,
  shuffleEveryRound: true,
  intervalMultiplier: 2,
  srsProfile: "standard",
  lang: "en"
};
var VIEW_TYPE = "daily-reads-queue-view";

// src/reading-view.ts
var import_obsidian = require("obsidian");

// src/utils.ts
function toIsoDate(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function addDays(iso, days) {
  const parts = iso.split("-");
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  const dateObj = new Date(y, m, d);
  dateObj.setDate(dateObj.getDate() + days);
  return toIsoDate(dateObj);
}
function getDayTarget(settings, date) {
  var _a;
  if (!settings.useDayTargets) return Math.max(1, settings.dailyTarget);
  const parts = date.split("-");
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  const day = new Date(y, m, d).getDay();
  const map = {
    0: settings.sundayTarget,
    1: settings.mondayTarget,
    2: settings.tuesdayTarget,
    3: settings.wednesdayTarget,
    4: settings.thursdayTarget,
    5: settings.fridayTarget,
    6: settings.saturdayTarget
  };
  return Math.max(1, (_a = map[day]) != null ? _a : settings.dailyTarget);
}

// src/i18n.ts
var TRANSLATIONS = {
  en: {
    // General Settings
    settingsTitle: "Daily Reads Settings",
    tabGeneral: "General",
    tabTargets: "Targets & Scheduling",
    tabScope: "Scope & Filters",
    tabStorage: "Storage",
    generalHeader: "Queue & Reading Behavior",
    queueModeName: "Queue mode",
    queueModeDesc: "Spaced Repetition: interval-based. Sequential: round-robin cycle.",
    sortStrategyName: "Sort strategy",
    sortStrategyDesc: "How notes are prioritized within today's queue.",
    openInNewTabName: "Open notes in new tab",
    openInReadingModeName: "Open notes in reading mode",
    autoOpenNextName: "Auto-open next note",
    autoOpenNextDesc: "After marking a note as read, automatically open the next note in queue.",
    langName: "Language / Dil",
    langDesc: "Choose language for the plugin UI and settings / Eklenti aray\xFCz\xFC ve ayarlar i\xE7in dil se\xE7in.",
    // Targets & Scheduling
    targetsHeader: "Queue Size Targets",
    useDayTargetsName: "Use day-based targets",
    useDayTargetsDesc: "Configure different target counts for each day of the week.",
    dailyTargetName: "Daily target",
    dailyTargetDesc: "Target number of notes to read per day.",
    srsHeader: "Spaced Repetition Scheduling",
    srsProfileName: "Spaced Repetition Profile",
    srsProfileDesc: "Choose standard, light (longer gaps), aggressive (shorter gaps), or custom configuration.",
    reviewIntervalsName: "Review intervals (days)",
    reviewIntervalsDesc: "Comma-separated progressive intervals (e.g. 1, 3, 7, 14, 30).",
    intervalMultiplierName: "Interval multiplier",
    intervalMultiplierDesc: "Multiplier applied beyond the default interval list (e.g. 2 means double the last interval).",
    readLaterModeName: "Read later mode",
    readLaterModeDesc: "Determine how deferred notes are scheduled.",
    readLaterNDaysName: "Read later: N days",
    maxDeferHorizonName: "Maximum defer horizon",
    maxDeferHorizonDesc: "Prevent deferred notes from being pushed too far into the future.",
    deferCapMaxDaysName: "Defer cap: max days",
    deferCapMultiplierName: "Defer cap: multiplier",
    deferCapMinDaysName: "Defer cap: minimum days",
    seqHeader: "Sequential Cycle Scheduling",
    shuffleRoundName: "Shuffle every round",
    shuffleRoundDesc: "Re-shuffle the note order automatically when all notes have been completed.",
    // Scope & Filters
    scopeHeader: "Notes Scope & Filtering",
    includeSubfoldersName: "Include subfolders",
    includeFolderNotesName: "Include Folder Notes",
    includeFolderNotesDesc: "Include notes named identically to their parent folder (e.g. Books/Books.md).",
    selectedFoldersLabel: "Included Folders",
    noFoldersMsg: "No folders selected. All vault notes will be included by default.",
    addFolderScopeName: "Add folder to include",
    addFolderScopeDesc: "Select a folder to include in the reading scope.",
    selectFolderPlaceholder: "-- Select folder --",
    excludedFoldersLabel: "Excluded Folders",
    noExcludedFoldersMsg: "No folders excluded.",
    addFolderExcludeName: "Add folder to exclude",
    addFolderExcludeDesc: "Select a folder to exclude from the reading scope.",
    // Storage
    storageHeader: "State File Storage Settings",
    stateFolderPathName: "State folder path",
    stateFolderPathDesc: "Where the plugin state markdown file is stored inside your vault.",
    stateFileNameName: "State file name",
    stateFileNameDesc: "The name of the state file (e.g., daily-reads-state.md).",
    // UI Panel
    toReadTitle: "To Read",
    readTodayTitle: "Read Today",
    todaySkippedTitle: "Today is Skipped",
    todaySkippedDesc: "You skipped today's reading list. Enjoy your break!",
    unskipTodayBtn: "Unskip Today",
    allCaughtUpTitle: "All Caught Up!",
    allCaughtUpDesc: "You've completed your reading queue for today. Good job!",
    roundLabel: "Round",
    noNotesDue: "No notes due today.",
    rebuildQueueBtn: "Rebuild Queue",
    openNoteTooltip: "Open note",
    markReadTooltip: "Mark as read",
    laterTooltip: "Read later / Defer",
    streakBadge: "day streak",
    totalReadBadge: "read total",
    // Commands
    cmdRebuild: "Rebuild today's Daily Reads list",
    cmdOpenPanel: "Open Daily Reads Panel",
    cmdOpenNext: "Open next note from Daily Reads Panel",
    cmdMarkRead: "Mark current note as read",
    cmdDefer: "Read current note later",
    cmdUndo: "Undo last read action",
    cmdSkipToday: "Skip today",
    cmdUnskipToday: "Unskip today",
    cmdShowStats: "Show reading stats",
    // Notices
    noticeNoActiveNote: "Daily Reads: no active note.",
    noticeOutsideScope: "Daily Reads: note outside scope.",
    noticeNotTracked: "Daily Reads: note not tracked.",
    noticeMarkedRead: "Daily Reads: marked read. Next in {days} day(s).",
    noticeMovedTo: "Daily Reads: moved to {date}.",
    noticeUndone: "Daily Reads: undone.",
    noticeUndoFailed: "Daily Reads: undo failed.",
    noticeTodaySkipped: "Daily Reads: today is skipped.",
    noticeTodayUnskipped: "Daily Reads: today is unskipped.",
    noticeNoNoteInQueue: "Daily Reads: no note in queue.",
    noticeRebuilt: "Daily Reads: queue rebuilt ({count} notes).",
    noticeStats: "Daily Reads: {read}/{total} read at least once, {today} read today.",
    noticeNothingToUndo: "Daily Reads: nothing to undo."
  },
  tr: {
    // Genel Ayarlar
    settingsTitle: "Daily Reads Ayarlar\u0131",
    tabGeneral: "Genel",
    tabTargets: "Hedefler & Planlama",
    tabScope: "Kapsam & Filtreler",
    tabStorage: "Depolama",
    generalHeader: "Kuyruk ve Okuma Davran\u0131\u015F\u0131",
    queueModeName: "Kuyruk modu",
    queueModeDesc: "Spaced Repetition: aral\u0131k bazl\u0131 tekrar. Sequential: s\u0131rayla d\xF6ng\xFCsel okuma.",
    sortStrategyName: "S\u0131ralama y\xF6ntemi",
    sortStrategyDesc: "Notlar\u0131n bug\xFCn\xFCn kuyru\u011Funda nas\u0131l \xF6nceliklendirilece\u011Fi.",
    openInNewTabName: "Notlar\u0131 yeni sekmede a\xE7",
    openInReadingModeName: "Notlar\u0131 okuma modunda a\xE7",
    autoOpenNextName: "Sonraki notu otomatik a\xE7",
    autoOpenNextDesc: "Bir notu okundu i\u015Faretledikten sonra, s\u0131radaki notu otomatik olarak ekrana getirir.",
    langName: "Language / Dil",
    langDesc: "Choose language for the plugin UI and settings / Eklenti aray\xFCz\xFC ve ayarlar i\xE7in dil se\xE7in.",
    // Hedefler & Planlama
    targetsHeader: "Kuyruk Boyutu Hedefleri",
    useDayTargetsName: "G\xFCne g\xF6re farkl\u0131 hedefler kullan",
    useDayTargetsDesc: "Haftan\u0131n her g\xFCn\xFC i\xE7in farkl\u0131 hedef okuma say\u0131s\u0131 belirlemenizi sa\u011Flar.",
    dailyTargetName: "G\xFCnl\xFCk hedef",
    dailyTargetDesc: "G\xFCnde okunacak hedef not say\u0131s\u0131.",
    srsHeader: "Spaced Repetition Planlamas\u0131",
    srsProfileName: "Spaced Repetition Profili",
    srsProfileDesc: "Standart (dengeli), hafif (daha uzun aral\u0131klar), yo\u011Fun (daha s\u0131k tekrar) veya \xF6zel profili se\xE7in.",
    reviewIntervalsName: "Tekrar aral\u0131klar\u0131 (g\xFCn)",
    reviewIntervalsDesc: "Virg\xFClle ayr\u0131lm\u0131\u015F a\u015Famal\u0131 tekrar aral\u0131klar\u0131 (\xF6rn. 1, 3, 7, 14, 30).",
    intervalMultiplierName: "Aral\u0131k \xE7arpan\u0131",
    intervalMultiplierDesc: "Aral\u0131k listesi bittikten sonra uygulanacak \xE7arpan (\xF6rn. 2, son aral\u0131\u011F\u0131 ikiye katlar).",
    readLaterModeName: "Sonra oku y\xF6ntemi",
    readLaterModeDesc: "Ertelenen notlar\u0131n nas\u0131l takvimlendirilece\u011Fini belirler.",
    readLaterNDaysName: "Sonra oku: N g\xFCn sonra",
    maxDeferHorizonName: "Maksimum erteleme s\u0131n\u0131r\u0131",
    maxDeferHorizonDesc: "Ertelenen notlar\u0131n gelecekte \xE7ok a\u015F\u0131r\u0131 uzak bir tarihe gitmesini engeller.",
    deferCapMaxDaysName: "Erteleme s\u0131n\u0131r\u0131: maksimum g\xFCn",
    deferCapMultiplierName: "Erteleme s\u0131n\u0131r\u0131: \xE7arpan",
    deferCapMinDaysName: "Erteleme s\u0131n\u0131r\u0131: minimum g\xFCn",
    seqHeader: "S\u0131ral\u0131 D\xF6ng\xFC Planlamas\u0131",
    shuffleRoundName: "Her turda kar\u0131\u015Ft\u0131r",
    shuffleRoundDesc: "T\xFCm notlar en az bir kere okundu\u011Funda, not s\u0131ras\u0131n\u0131 otomatik olarak kar\u0131\u015Ft\u0131r\u0131r.",
    // Kapsam & Filtreleme
    scopeHeader: "Not Kapsam\u0131 & Filtreleme",
    includeSubfoldersName: "Alt klas\xF6rleri dahil et",
    includeFolderNotesName: "Klas\xF6r Notlar\u0131n\u0131 dahil et",
    includeFolderNotesDesc: "Klas\xF6r ile ayn\u0131 ada sahip notlar\u0131 da dahil eder (\xF6rn. Books/Books.md).",
    selectedFoldersLabel: "Dahil Edilen Klas\xF6rler",
    noFoldersMsg: "Klas\xF6r se\xE7ilmedi. Varsay\u0131lan olarak t\xFCm kasan\u0131z dahil edilecektir.",
    addFolderScopeName: "Dahil edilecek klas\xF6r ekle",
    addFolderScopeDesc: "Okuma kapsam\u0131na dahil etmek i\xE7in bir klas\xF6r se\xE7in.",
    selectFolderPlaceholder: "-- Klas\xF6r se\xE7in --",
    excludedFoldersLabel: "Hari\xE7 Tutulan Klas\xF6rler",
    noExcludedFoldersMsg: "Hari\xE7 tutulan klas\xF6r yok.",
    addFolderExcludeName: "Hari\xE7 tutulacak klas\xF6r ekle",
    addFolderExcludeDesc: "Okuma kapsam\u0131ndan hari\xE7 tutmak i\xE7in bir klas\xF6r se\xE7in.",
    // Depolama
    storageHeader: "Durum Dosyas\u0131 Depolama Ayarlar\u0131",
    stateFolderPathName: "Durum klas\xF6r\xFC yolu",
    stateFolderPathDesc: "Plugin durum verisi markdown dosyas\u0131n\u0131n kasan\u0131zda nerede saklanaca\u011F\u0131.",
    stateFileNameName: "Durum dosyas\u0131 ad\u0131",
    stateFileNameDesc: "Durum dosyas\u0131n\u0131n ad\u0131 (\xF6rn. daily-reads-state.md).",
    // UI Panel
    toReadTitle: "Okunacaklar",
    readTodayTitle: "Bug\xFCn Okunanlar",
    todaySkippedTitle: "Bug\xFCn Atland\u0131",
    todaySkippedDesc: "Bug\xFCnk\xFC okuma listenizi atlad\u0131n\u0131z. \u0130yi dinlenmeler!",
    unskipTodayBtn: "Bug\xFCn\xFC Geri Al",
    allCaughtUpTitle: "Tebrikler!",
    allCaughtUpDesc: "Bug\xFCnk\xFC okuma kuyru\u011Funuzu tamamlad\u0131n\u0131z. Harika i\u015F!",
    roundLabel: "Tur",
    noNotesDue: "Bug\xFCn i\xE7in okunacak not kalmad\u0131.",
    rebuildQueueBtn: "Kuyru\u011Fu Yenile",
    openNoteTooltip: "Notu a\xE7",
    markReadTooltip: "Okundu i\u015Faretle",
    laterTooltip: "Sonra oku / Ertele",
    streakBadge: "g\xFCnl\xFCk seri",
    totalReadBadge: "toplam okunan",
    // Commands
    cmdRebuild: "Bug\xFCn\xFCn Daily Reads listesini yenile",
    cmdOpenPanel: "Daily Reads Panelini A\xE7",
    cmdOpenNext: "S\u0131radaki notu a\xE7 (Daily Reads)",
    cmdMarkRead: "Aktif notu okundu olarak i\u015Faretle",
    cmdDefer: "Aktif notu daha sonra oku",
    cmdUndo: "Son okuma i\u015Flemini geri al",
    cmdSkipToday: "Bug\xFCn\xFC atla",
    cmdUnskipToday: "Bug\xFCn\xFC atlamay\u0131 geri al",
    cmdShowStats: "Okuma istatistiklerini g\xF6ster",
    // Notices
    noticeNoActiveNote: "Daily Reads: aktif not bulunamad\u0131.",
    noticeOutsideScope: "Daily Reads: not kapsam d\u0131\u015F\u0131nda.",
    noticeNotTracked: "Daily Reads: not takip edilmiyor.",
    noticeMarkedRead: "Daily Reads: okundu olarak i\u015Faretlendi. {days} g\xFCn sonra tekrar gelecek.",
    noticeMovedTo: "Daily Reads: {date} tarihine ertelendi.",
    noticeUndone: "Daily Reads: son i\u015Flem geri al\u0131nd\u0131.",
    noticeUndoFailed: "Daily Reads: geri alma ba\u015Far\u0131s\u0131z.",
    noticeTodaySkipped: "Daily Reads: bug\xFCn atland\u0131.",
    noticeTodayUnskipped: "Daily Reads: bug\xFCn\xFC atlama i\u015Flemi geri al\u0131nd\u0131.",
    noticeNoNoteInQueue: "Daily Reads: kuyrukta okunacak not yok.",
    noticeRebuilt: "Daily Reads: kuyruk yenilendi ({count} not).",
    noticeStats: "Daily Reads: {read}/{total} not en az bir kez okundu, bug\xFCn {today} not okundu.",
    noticeNothingToUndo: "Daily Reads: geri al\u0131nacak i\u015Flem yok."
  }
};
function t(lang, key) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS["en"];
  return dict[key] || TRANSLATIONS["en"][key] || String(key);
}

// src/reading-view.ts
var DailyReadsQueueView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  t(key) {
    const lang = this.plugin.settings.lang || "en";
    return t(lang, key);
  }
  getViewType() {
    return VIEW_TYPE;
  }
  getDisplayText() {
    return "Daily Reads";
  }
  getIcon() {
    return "book-open";
  }
  async onOpen() {
    const q = await this.plugin.rebuildTodayQueue({ resync: true, refreshView: false });
    await this.render(q);
  }
  async getStreakAndStats(today, completedCount) {
    const state = await this.plugin.getState();
    let streak = 0;
    let date = today;
    const totalRead = Object.values(state.noteStates).reduce((sum, n) => sum + (n.history ? n.history.length : 0), 0);
    const todayPlan = state.dailyPlans[today];
    const todayCompleted = todayPlan ? todayPlan.completed.length > 0 : false;
    const todaySkipped = todayPlan ? todayPlan.skipped : false;
    if (todayCompleted || todaySkipped) {
    } else {
      date = addDays(today, -1);
    }
    while (true) {
      const plan = state.dailyPlans[date];
      if (plan && (plan.completed.length > 0 || plan.skipped)) {
        streak++;
        date = addDays(date, -1);
      } else {
        break;
      }
    }
    return { streak, totalRead };
  }
  async render(queue) {
    var _a;
    const container = this.contentEl;
    container.empty();
    container.addClass("daily-reads-panel");
    const state = await this.plugin.getState();
    const today = toIsoDate(/* @__PURE__ */ new Date());
    const plan = (_a = state.dailyPlans[today]) != null ? _a : { assigned: [], completed: [], skipped: false };
    const target = getDayTarget(this.plugin.settings, today);
    const sections = await this.plugin.getPlanSections();
    const unread = queue.length > 0 ? queue : sections.unread;
    const read = sections.read;
    const completedCount = read.length;
    const totalCount = unread.length + completedCount;
    const { streak, totalRead } = await this.getStreakAndStats(today, completedCount);
    const header = container.createDiv("daily-reads-header");
    const progressContainer = header.createDiv("progress-container semi-circle-container");
    const progressPercent = totalCount > 0 ? Math.min(100, Math.round(completedCount / totalCount * 100)) : 0;
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("class", "daily-reads-circular-progress semi-circle");
    svgEl.setAttribute("viewBox", "0 0 36 28");
    const bgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bgPath.setAttribute("class", "circular-bg");
    bgPath.setAttribute("d", "M 2.0845,27 A 15.9155,15.9155 0 0 1 33.9155,27");
    const fgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    fgPath.setAttribute("class", "circular-fg");
    fgPath.setAttribute("stroke-dasharray", `${progressPercent / 100 * 50}, 50`);
    fgPath.setAttribute("d", "M 2.0845,27 A 15.9155,15.9155 0 0 1 33.9155,27");
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("x", "18");
    textEl.setAttribute("y", "26");
    textEl.setAttribute("class", "circular-percentage");
    textEl.textContent = `${progressPercent}%`;
    svgEl.appendChild(bgPath);
    svgEl.appendChild(fgPath);
    svgEl.appendChild(textEl);
    progressContainer.appendChild(svgEl);
    const statsContainer = header.createDiv(`stats-container ${this.plugin.settings.queueMode === "sequential-cycle" ? "stats-seq" : "stats-due"}`);
    const streakBadge = statsContainer.createDiv("stat-badge");
    const streakIcon = streakBadge.createDiv("badge-icon");
    (0, import_obsidian.setIcon)(streakIcon, "flame");
    streakBadge.createDiv({ text: `${streak}`, cls: "stat-number" });
    streakBadge.createDiv({ text: this.t("streakBadge"), cls: "stat-label" });
    const totalBadge = statsContainer.createDiv("stat-badge");
    const totalIcon = totalBadge.createDiv("badge-icon");
    (0, import_obsidian.setIcon)(totalIcon, "check-circle-2");
    totalBadge.createDiv({ text: `${totalRead}`, cls: "stat-number" });
    totalBadge.createDiv({ text: this.t("totalReadBadge"), cls: "stat-label" });
    if (this.plugin.settings.queueMode === "sequential-cycle") {
      const seqRound = ((state.sequentialCycle || {}).round) || 1;
      const roundBadge = statsContainer.createDiv("stat-badge" + (seqRound > 1 ? " round-highlight" : ""));
      const roundIcon = roundBadge.createDiv("badge-icon");
      (0, import_obsidian.setIcon)(roundIcon, "repeat");
      roundBadge.createDiv({ text: `${seqRound}`, cls: "stat-number" });
      roundBadge.createDiv({ text: this.t("roundLabel"), cls: "stat-label" });
    }
    const candidates = this.plugin.collectCandidates();
    const candidatePaths = new Set(candidates.map((f) => f.path));
    const initialPaths = state.initialPaths || [];
    const initialSet = new Set(initialPaths);
    const isSeqMode = this.plugin.settings.queueMode === "sequential-cycle";
    const currentRound = isSeqMode ? (((state.sequentialCycle || {}).round) || 1) : 0;
    let totalReadCount = 0;
    let initialUnreadCount = 0;
    let newUnreadCount = 0;
    for (const note of Object.values(state.noteStates)) {
      if (!candidatePaths.has(note.path)) continue;
      const isRead = isSeqMode ? note.lastReadRound === currentRound : note.history.length > 0;
      if (isRead) {
        totalReadCount++;
      } else {
        const isInitial = initialSet.has(note.path);
        if (isInitial) {
          initialUnreadCount++;
        } else {
          newUnreadCount++;
        }
      }
    }
    const totalTracked = totalReadCount + initialUnreadCount + newUnreadCount;
    if (totalTracked > 0) {
      const progressBarContainer = container.createDiv("daily-reads-total-progress-container");
      const barTitle = progressBarContainer.createDiv("daily-reads-total-progress-title");
      barTitle.createSpan({ text: this.plugin.settings.lang === "tr" ? "Genel Okuma \u0130lerlemesi" : "Overall Reading Progress", cls: "title-text" });
      barTitle.createSpan({ text: `${totalReadCount}/${totalTracked}`, cls: "count-text" });
      const bar = progressBarContainer.createDiv("daily-reads-total-progress-bar");
      const createSegment = (cls, count, labelTr, labelEn) => {
        if (count === 0) return;
        const pct = count / totalTracked * 100;
        const segment = bar.createDiv(`progress-segment ${cls}`);
        segment.style.width = `${pct}%`;
        const label = this.plugin.settings.lang === "tr" ? labelTr : labelEn;
        segment.setAttribute("aria-label", `${label}: ${count}`);
      };
      createSegment("read-notes", totalReadCount, "Okunan", "Read");
      createSegment("initial-notes", initialUnreadCount, "Ba\u015Flang\u0131\xE7", "Initial");
      createSegment("new-notes", newUnreadCount, "Yeni", "New");
      const legend = progressBarContainer.createDiv("daily-reads-total-progress-legend");
      const addLegendItem = (cls, labelTr, labelEn, count) => {
        const item = legend.createDiv("legend-item");
        item.createSpan({ cls: `legend-dot ${cls}` });
        const label = this.plugin.settings.lang === "tr" ? labelTr : labelEn;
        item.createSpan({ text: `${label} (${count})`, cls: "legend-text" });
      };
      addLegendItem("read-notes", "Okunan", "Read", totalReadCount);
      addLegendItem("initial-notes", "Ba\u015Flang\u0131\xE7", "Initial", initialUnreadCount);
      addLegendItem("new-notes", "Yeni", "New", newUnreadCount);
    }
    if (plan.skipped) {
      const skippedContainer = container.createDiv("daily-reads-status-card skipped");
      const iconEl = skippedContainer.createDiv("status-icon");
      (0, import_obsidian.setIcon)(iconEl, "calendar-off");
      skippedContainer.createEl("h3", { text: this.t("todaySkippedTitle") });
      skippedContainer.createEl("p", { text: this.t("todaySkippedDesc") });
      const unskipBtn = skippedContainer.createEl("button", { text: this.t("unskipTodayBtn"), cls: "mod-cta" });
      unskipBtn.onclick = async () => {
        await this.plugin.unskipToday();
      };
      return;
    }
    if (totalCount > 0 && unread.length === 0) {
      const celebrationContainer = container.createDiv("daily-reads-status-card success");
      const iconEl = celebrationContainer.createDiv("status-icon");
      (0, import_obsidian.setIcon)(iconEl, "trophy");
      celebrationContainer.createEl("h3", { text: this.t("allCaughtUpTitle") });
      celebrationContainer.createEl("p", { text: this.t("allCaughtUpDesc") });
      if (this.plugin.settings.queueMode === "sequential-cycle") {
        const readAheadBtn = celebrationContainer.createEl("button", {
          text: this.plugin.settings.lang === "tr" ? "\u0130leriye Y\xF6nelik Oku" : "Read Ahead",
          cls: "daily-reads-read-ahead-btn success-card-btn"
        });
        readAheadBtn.onclick = async (evt) => {
          evt.stopPropagation();
          await this.plugin.readAheadRandom();
        };
      }
      return;
    }
    const showKind = this.plugin.settings.queueMode === "due";
    const unreadSection = container.createDiv("daily-reads-list-wrapper");
    const titleRow = unreadSection.createDiv("section-title-row");
    titleRow.createEl("h4", { text: `${this.t("toReadTitle")} (${unread.length})`, cls: "section-title" });
    if (unread.length === 0) {
      const emptyDiv = unreadSection.createDiv({ cls: "daily-reads-empty" });
      (0, import_obsidian.setIcon)(emptyDiv.createDiv("empty-icon"), "info");
      emptyDiv.createDiv({ text: this.t("noNotesDue"), cls: "empty-text" });
      const rebuildBtn = emptyDiv.createEl("button", { text: this.t("rebuildQueueBtn"), cls: "rebuild-btn" });
      rebuildBtn.onclick = async () => {
        await this.plugin.rebuildTodayQueue({ resync: true });
      };
    } else {
      const listContainer = unreadSection.createDiv("daily-reads-list");
      for (const note of unread) {
        const row = this.renderNoteRow(listContainer, note, showKind);
        const actions = row.createDiv("daily-reads-actions");
        const readBtn = actions.createEl("button", { cls: "daily-reads-icon-btn check-btn daily-reads-icon-btn-sm" });
        (0, import_obsidian.setIcon)(readBtn, "check");
        readBtn.setAttribute("aria-label", this.t("markReadTooltip"));
        readBtn.onclick = async (evt) => {
          evt.stopPropagation();
          await this.plugin.markAsRead(note.path);
        };
        if (this.plugin.settings.queueMode === "due") {
          const laterBtn = actions.createEl("button", { cls: "daily-reads-icon-btn later-btn" });
          (0, import_obsidian.setIcon)(laterBtn, "clock");
          laterBtn.setAttribute("aria-label", this.t("laterTooltip"));
          laterBtn.onclick = (evt) => {
            const menu = new import_obsidian.Menu();
            menu.addItem((item) => item.setTitle(this.plugin.settings.lang === "tr" ? "Yar\u0131n (+1 g\xFCn)" : "Tomorrow (+1 day)").onClick(async () => {
              await this.plugin.deferNote(note.path, "tomorrow");
            }));
            menu.addItem((item) => item.setTitle(this.plugin.settings.lang === "tr" ? `N g\xFCn sonra (+${this.plugin.settings.deferDays} g\xFCn)` : `After N days (+${this.plugin.settings.deferDays} days)`).onClick(async () => {
              await this.plugin.deferNote(note.path, "days", this.plugin.settings.deferDays);
            }));
            menu.addItem((item) => item.setTitle(this.plugin.settings.lang === "tr" ? "M\xFCsait ilk g\xFCn" : "Next available day").onClick(async () => {
              await this.plugin.deferNote(note.path, "next-available");
            }));
            menu.showAtMouseEvent(evt);
          };
        }
      }
    }
    const readSection = container.createDiv("daily-reads-list-wrapper");
    readSection.createEl("h4", { text: `${this.t("readTodayTitle")} (${read.length})`, cls: "section-title" });
    if (read.length === 0) {
      const emptyDiv = readSection.createDiv({ cls: "daily-reads-empty" });
      emptyDiv.createDiv({ text: this.plugin.settings.lang === "tr" ? "Bug\xFCn hen\xFCz okunan not yok." : "No notes marked read today.", cls: "empty-text" });
    } else {
      const listContainer = readSection.createDiv("daily-reads-list completed-list");
      for (const note of read) {
        this.renderNoteRow(listContainer, note, showKind);
      }
    }
  }
  renderNoteRow(root, note, showKind) {
    var _a;
    const row = root.createDiv("daily-reads-row");
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    const fileName = (_a = note.path.split("/").pop()) != null ? _a : note.path;
    const label = fileName.replace(/\.md$/i, "");
    row.setAttribute("aria-label", label);
    const titleRow = row.createDiv("daily-reads-note-title");
    titleRow.createDiv({ text: label, cls: "daily-reads-note-name" });
    if (showKind) {
      const isNew = note.history.length === 0;
      const displayLabel = isNew ? this.plugin.settings.lang === "tr" ? "Yeni" : "New" : this.plugin.settings.lang === "tr" ? "Tekrar" : "Review";
      titleRow.createSpan({
        text: displayLabel,
        cls: `daily-reads-kind daily-reads-kind-${isNew ? "new" : "review"}`
      });
    }
    const openNote = async () => {
      const file = this.plugin.app.vault.getAbstractFileByPath(note.path);
      if (file instanceof import_obsidian.TFile) await this.plugin.openNote(file);
    };
    row.addEventListener("click", openNote);
    row.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter" || evt.key === " ") {
        evt.preventDefault();
        openNote();
      }
    });
    return row;
  }
};

// src/settings.ts
var import_obsidian2 = require("obsidian");
var DailyReadsSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.activeTab = "general";
    this.plugin = plugin;
  }
  t(key) {
    const lang = this.plugin.settings.lang || "en";
    return t(lang, key);
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("daily-reads-settings-container");
    containerEl.createEl("h2", { text: this.t("settingsTitle") });
    const tabBar = containerEl.createDiv({ cls: "daily-reads-settings-tabs" });
    const tabs = [
      { id: "general", label: this.t("tabGeneral") },
      { id: "targets", label: this.t("tabTargets") },
      { id: "scope", label: this.t("tabScope") },
      { id: "storage", label: this.t("tabStorage") }
    ];
    for (const tab of tabs) {
      const btn = tabBar.createEl("button", { text: tab.label });
      if (this.activeTab === tab.id) btn.addClass("mod-cta");
      btn.onclick = () => {
        this.activeTab = tab.id;
        this.display();
      };
    }
    if (this.activeTab === "general") {
      this.renderGeneral(containerEl);
      return;
    }
    if (this.activeTab === "targets") {
      this.renderTargets(containerEl);
      return;
    }
    if (this.activeTab === "scope") {
      this.renderScope(containerEl);
      return;
    }
    this.renderStorage(containerEl);
  }
  sectionHeader(containerEl, title) {
    containerEl.createEl("h3", { text: title, cls: "daily-reads-settings-section" });
  }
  renderGeneral(containerEl) {
    this.sectionHeader(containerEl, this.t("generalHeader"));
    new import_obsidian2.Setting(containerEl).setName(this.t("langName")).setDesc(this.t("langDesc")).addDropdown((d) => d.addOption("en", "English").addOption("tr", "T\xFCrk\xE7e").setValue(this.plugin.settings.lang).onChange(async (v) => {
      this.plugin.settings.lang = v;
      await this.plugin.saveSettings();
      this.display();
    }));
    new import_obsidian2.Setting(containerEl).setName(this.t("queueModeName")).setDesc(this.t("queueModeDesc")).addDropdown((d) => d.addOption("due", "Spaced Repetition").addOption("sequential-cycle", "Sequential").setValue(this.plugin.settings.queueMode).onChange(async (v) => {
      this.plugin.settings.queueMode = v;
      await this.plugin.saveSettings();
      await this.plugin.rebuildTodayQueue({ resync: true, refreshView: true });
      this.display();
    }));
    new import_obsidian2.Setting(containerEl).setName(this.t("sortStrategyName")).setDesc(this.t("sortStrategyDesc")).addDropdown((d) => d.addOption("oldest-due", "Oldest due first").addOption("alphabetical", "Alphabetical").addOption("random", "Random").setValue(this.plugin.settings.sortStrategy).onChange(async (v) => {
      this.plugin.settings.sortStrategy = v;
      await this.plugin.saveSettings();
      await this.plugin.refreshView();
    }));
    new import_obsidian2.Setting(containerEl).setName(this.t("openInNewTabName")).addToggle((t2) => t2.setValue(this.plugin.settings.openInNewTab).onChange(async (v) => {
      this.plugin.settings.openInNewTab = v;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName(this.t("openInReadingModeName")).addToggle((t2) => t2.setValue(this.plugin.settings.openInReadingMode).onChange(async (v) => {
      this.plugin.settings.openInReadingMode = v;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName(this.t("autoOpenNextName")).setDesc(this.t("autoOpenNextDesc")).addToggle((t2) => t2.setValue(this.plugin.settings.autoOpenNext).onChange(async (v) => {
      this.plugin.settings.autoOpenNext = v;
      await this.plugin.saveSettings();
    }));
  }
  renderTargets(containerEl) {
    this.sectionHeader(containerEl, this.t("targetsHeader"));
    new import_obsidian2.Setting(containerEl).setName(this.t("useDayTargetsName")).setDesc(this.t("useDayTargetsDesc")).addToggle((t2) => t2.setValue(this.plugin.settings.useDayTargets).onChange(async (v) => {
      this.plugin.settings.useDayTargets = v;
      await this.plugin.saveSettings();
      await this.plugin.rebuildTodayQueue({ refreshView: true });
      this.display();
    }));
    if (!this.plugin.settings.useDayTargets) {
      new import_obsidian2.Setting(containerEl).setName(this.t("dailyTargetName")).setDesc(this.t("dailyTargetDesc")).addText((t2) => t2.setValue(String(this.plugin.settings.dailyTarget)).onChange(async (v) => {
        const n = Number(v);
        if (Number.isFinite(n) && n > 0) {
          this.plugin.settings.dailyTarget = Math.floor(n);
          await this.plugin.saveSettings();
          await this.plugin.rebuildTodayQueue({ refreshView: true });
        }
      }));
    } else {
      const days = [
        ["mondayTarget", "Monday"],
        ["tuesdayTarget", "Tuesday"],
        ["wednesdayTarget", "Wednesday"],
        ["thursdayTarget", "Thursday"],
        ["fridayTarget", "Friday"],
        ["saturdayTarget", "Saturday"],
        ["sundayTarget", "Sunday"]
      ];
      for (const [key, label] of days) {
        new import_obsidian2.Setting(containerEl).setName(label + " target").addText((t2) => t2.setValue(String(this.plugin.settings[key])).onChange(async (v) => {
          const n = Number(v);
          if (Number.isFinite(n) && n > 0) {
            this.plugin.settings[key] = Math.floor(n);
            await this.plugin.saveSettings();
            await this.plugin.rebuildTodayQueue({ refreshView: true });
          }
        }));
      }
    }
    if (this.plugin.settings.queueMode === "due") {
      this.sectionHeader(containerEl, this.t("srsHeader"));
      new import_obsidian2.Setting(containerEl).setName(this.t("srsProfileName")).setDesc(this.t("srsProfileDesc")).addDropdown((d) => d.addOption("standard", "Standard (Balanced)").addOption("light", "Light (Longer gaps)").addOption("aggressive", "Aggressive (Shorter gaps)").addOption("custom", "Custom").setValue(this.plugin.settings.srsProfile).onChange(async (v) => {
        this.plugin.settings.srsProfile = v;
        if (v === "light") {
          this.plugin.settings.defaultIntervalsInDays = [2, 7, 21, 60, 180];
          this.plugin.settings.intervalMultiplier = 2.5;
        } else if (v === "standard") {
          this.plugin.settings.defaultIntervalsInDays = [1, 3, 7, 14, 30];
          this.plugin.settings.intervalMultiplier = 2;
        } else if (v === "aggressive") {
          this.plugin.settings.defaultIntervalsInDays = [1, 2, 4, 8, 15];
          this.plugin.settings.intervalMultiplier = 1.5;
        }
        await this.plugin.saveSettings();
        this.display();
      }));
      if (this.plugin.settings.srsProfile === "custom") {
        new import_obsidian2.Setting(containerEl).setName(this.t("reviewIntervalsName")).setDesc(this.t("reviewIntervalsDesc")).addText((t2) => t2.setPlaceholder("1, 3, 7, 14, 30").setValue(this.plugin.settings.defaultIntervalsInDays.join(", ")).onChange(async (v) => {
          const parsed = v.split(",").map((x) => Number(x.trim())).filter((n) => Number.isFinite(n) && n > 0);
          if (parsed.length > 0) {
            this.plugin.settings.defaultIntervalsInDays = parsed;
            await this.plugin.saveSettings();
          }
        }));
        new import_obsidian2.Setting(containerEl).setName(this.t("intervalMultiplierName")).setDesc(this.t("intervalMultiplierDesc")).addText((t2) => t2.setValue(String(this.plugin.settings.intervalMultiplier)).onChange(async (v) => {
          const n = Number(v);
          if (Number.isFinite(n) && n >= 1) {
            this.plugin.settings.intervalMultiplier = n;
            await this.plugin.saveSettings();
          }
        }));
      }
      new import_obsidian2.Setting(containerEl).setName(this.t("readLaterModeName")).setDesc(this.t("readLaterModeDesc")).addDropdown((d) => d.addOption("tomorrow", "Tomorrow (+1 day)").addOption("days", "After N days").addOption("next-available", "Next available day").setValue(this.plugin.settings.deferMode).onChange(async (v) => {
        this.plugin.settings.deferMode = v;
        await this.plugin.saveSettings();
        this.display();
      }));
      if (this.plugin.settings.deferMode === "days") {
        new import_obsidian2.Setting(containerEl).setName(this.t("readLaterNDaysName")).addText((t2) => t2.setValue(String(this.plugin.settings.deferDays)).onChange(async (v) => {
          const n = Number(v);
          if (Number.isFinite(n) && n > 0) {
            this.plugin.settings.deferDays = Math.floor(n);
            await this.plugin.saveSettings();
          }
        }));
      }
      new import_obsidian2.Setting(containerEl).setName(this.t("maxDeferHorizonName")).setDesc(this.t("maxDeferHorizonDesc")).addDropdown((d) => d.addOption("none", "No cap").addOption("fixed", "Fixed max days").addOption("formula", "Formula: interval \xD7 multiplier + min").setValue(this.plugin.settings.deferCapMode).onChange(async (v) => {
        this.plugin.settings.deferCapMode = v;
        await this.plugin.saveSettings();
        this.display();
      }));
      if (this.plugin.settings.deferCapMode === "fixed") {
        new import_obsidian2.Setting(containerEl).setName(this.t("deferCapMaxDaysName")).addText((t2) => t2.setValue(String(this.plugin.settings.deferCapFixedDays)).onChange(async (v) => {
          const n = Number(v);
          if (Number.isFinite(n) && n > 0) {
            this.plugin.settings.deferCapFixedDays = Math.floor(n);
            await this.plugin.saveSettings();
          }
        }));
      }
      if (this.plugin.settings.deferCapMode === "formula") {
        new import_obsidian2.Setting(containerEl).setName(this.t("deferCapMultiplierName")).addText((t2) => t2.setValue(String(this.plugin.settings.deferCapFormulaMultiplier)).onChange(async (v) => {
          const n = Number(v);
          if (Number.isFinite(n) && n > 0) {
            this.plugin.settings.deferCapFormulaMultiplier = n;
            await this.plugin.saveSettings();
          }
        }));
        new import_obsidian2.Setting(containerEl).setName(this.t("deferCapMinDaysName")).addText((t2) => t2.setValue(String(this.plugin.settings.deferCapFormulaMinDays)).onChange(async (v) => {
          const n = Number(v);
          if (Number.isFinite(n) && n > 0) {
            this.plugin.settings.deferCapFormulaMinDays = Math.floor(n);
            await this.plugin.saveSettings();
          }
        }));
      }
    } else {
      this.sectionHeader(containerEl, this.t("seqHeader"));
      new import_obsidian2.Setting(containerEl).setName(this.t("shuffleRoundName")).setDesc(this.t("shuffleRoundDesc")).addToggle((t2) => t2.setValue(this.plugin.settings.shuffleEveryRound).onChange(async (v) => {
        this.plugin.settings.shuffleEveryRound = v;
        await this.plugin.saveSettings();
      }));
    }
  }
  renderScope(containerEl) {
    this.sectionHeader(containerEl, this.t("scopeHeader"));
    new import_obsidian2.Setting(containerEl).setName(this.t("includeSubfoldersName")).addToggle((t2) => t2.setValue(this.plugin.settings.includeSubfolders).onChange(async (v) => {
      this.plugin.settings.includeSubfolders = v;
      await this.plugin.saveSettings();
      await this.plugin.rebuildTodayQueue({ resync: true, refreshView: true });
    }));
    new import_obsidian2.Setting(containerEl).setName(this.t("includeFolderNotesName")).setDesc(this.t("includeFolderNotesDesc")).addToggle((t2) => t2.setValue(this.plugin.settings.includeFolderNotes).onChange(async (v) => {
      this.plugin.settings.includeFolderNotes = v;
      await this.plugin.saveSettings();
      await this.plugin.rebuildTodayQueue({ resync: true, refreshView: true });
    }));
    const allFolders = this.app.vault.getAllLoadedFiles().filter((f) => f instanceof import_obsidian2.TFolder).map((f) => f.path).filter((p) => p !== "/" && p !== "");
    allFolders.sort((a, b) => a.localeCompare(b));
    const foldersLabel = containerEl.createDiv({ cls: "setting-item-name", text: this.t("selectedFoldersLabel") });
    foldersLabel.style.fontWeight = "600";
    foldersLabel.style.marginTop = "18px";
    foldersLabel.style.marginBottom = "6px";
    const pillsContainer = containerEl.createDiv({ cls: "daily-reads-folders-list" });
    const refreshPills = () => {
      pillsContainer.empty();
      if (this.plugin.settings.folders.length === 0) {
        pillsContainer.createEl("span", { text: this.t("noFoldersMsg"), cls: "badge-text" });
        return;
      }
      for (const folderPath of this.plugin.settings.folders) {
        const pill = pillsContainer.createDiv({ cls: "daily-reads-folder-pill" });
        pill.createEl("span", { text: folderPath });
        const closeBtn = pill.createDiv({ cls: "daily-reads-folder-pill-close", text: "\xD7" });
        closeBtn.onclick = async () => {
          this.plugin.settings.folders = this.plugin.settings.folders.filter((f) => f !== folderPath);
          await this.plugin.saveSettings();
          await this.plugin.rebuildTodayQueue({ resync: true, refreshView: true });
          refreshPills();
          this.display();
        };
      }
    };
    refreshPills();
    const availableFolders = allFolders.filter((p) => !this.plugin.settings.folders.includes(p) && !(this.plugin.settings.excludeFolders || []).includes(p));
    const addSetting = new import_obsidian2.Setting(containerEl).setName(this.t("addFolderScopeName")).setDesc(this.t("addFolderScopeDesc"));
    addSetting.addDropdown((d) => {
      d.addOption("", this.t("selectFolderPlaceholder"));
      for (const folder of availableFolders) {
        d.addOption(folder, folder);
      }
      d.setValue("");
      d.onChange(async (v) => {
        if (v) {
          if (!this.plugin.settings.folders.includes(v)) {
            this.plugin.settings.folders.push(v);
            await this.plugin.saveSettings();
            await this.plugin.rebuildTodayQueue({ resync: true, refreshView: true });
          }
          this.display();
        }
      });
    });
    const excludesLabel = containerEl.createDiv({ cls: "setting-item-name", text: this.t("excludedFoldersLabel") });
    excludesLabel.style.fontWeight = "600";
    excludesLabel.style.marginTop = "24px";
    excludesLabel.style.marginBottom = "6px";
    const excludesPillsContainer = containerEl.createDiv({ cls: "daily-reads-folders-list" });
    const refreshExcludePills = () => {
      excludesPillsContainer.empty();
      const excludes = this.plugin.settings.excludeFolders || [];
      if (excludes.length === 0) {
        excludesPillsContainer.createEl("span", { text: this.t("noExcludedFoldersMsg"), cls: "badge-text" });
        return;
      }
      for (const folderPath of excludes) {
        const pill = excludesPillsContainer.createDiv({ cls: "daily-reads-folder-pill" });
        pill.createEl("span", { text: folderPath });
        const closeBtn = pill.createDiv({ cls: "daily-reads-folder-pill-close", text: "\xD7" });
        closeBtn.onclick = async () => {
          this.plugin.settings.excludeFolders = excludes.filter((f) => f !== folderPath);
          await this.plugin.saveSettings();
          await this.plugin.rebuildTodayQueue({ resync: true, refreshView: true });
          refreshExcludePills();
          this.display();
        };
      }
    };
    refreshExcludePills();
    const addExcludeSetting = new import_obsidian2.Setting(containerEl).setName(this.t("addFolderExcludeName")).setDesc(this.t("addFolderExcludeDesc"));
    addExcludeSetting.addDropdown((d) => {
      d.addOption("", this.t("selectFolderPlaceholder"));
      for (const folder of availableFolders) {
        d.addOption(folder, folder);
      }
      d.setValue("");
      d.onChange(async (v) => {
        if (v) {
          if (!this.plugin.settings.excludeFolders) {
            this.plugin.settings.excludeFolders = [];
          }
          if (!this.plugin.settings.excludeFolders.includes(v)) {
            this.plugin.settings.excludeFolders.push(v);
            await this.plugin.saveSettings();
            await this.plugin.rebuildTodayQueue({ resync: true, refreshView: true });
          }
          this.display();
        }
      });
    });
  }
  renderStorage(containerEl) {
    this.sectionHeader(containerEl, this.t("storageHeader"));
    new import_obsidian2.Setting(containerEl).setName(this.t("stateFolderPathName")).setDesc(this.t("stateFolderPathDesc")).addText((t2) => t2.setValue(this.plugin.settings.stateFolder).onChange(async (v) => {
      this.plugin.settings.stateFolder = v.trim() || DEFAULT_SETTINGS.stateFolder;
      await this.plugin.saveSettings();
    }));
    new import_obsidian2.Setting(containerEl).setName(this.t("stateFileNameName")).setDesc(this.t("stateFileNameDesc")).addText((t2) => t2.setValue(this.plugin.settings.stateFileName).onChange(async (v) => {
      const t22 = v.trim() || DEFAULT_SETTINGS.stateFileName;
      this.plugin.settings.stateFileName = t22.endsWith(".md") ? t22 : t22 + ".md";
      await this.plugin.saveSettings();
    }));
  }
};

// src/read-ahead-modal.ts
var import_obsidian3 = require("obsidian");
var ReadAheadModal = class extends import_obsidian3.Modal {
  constructor(app, plugin, onSubmit) {
    super(app);
    this.count = 3;
    this.plugin = plugin;
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    const isTr = this.plugin.settings.lang === "tr";
    contentEl.createEl("h2", { text: isTr ? "\u0130leriye Y\xF6nelik Oku" : "Read Ahead" });
    new import_obsidian3.Setting(contentEl).setName(isTr ? "Not Say\u0131s\u0131" : "Number of Notes").setDesc(isTr ? "Okuma listesine ka\xE7 adet yeni not eklensin?" : "How many new notes would you like to add to today's list?").addText((text) => text.setValue(String(this.count)).onChange((value) => {
      const num = Number(value);
      if (!isNaN(num) && num > 0) {
        this.count = Math.floor(num);
      }
    }));
    new import_obsidian3.Setting(contentEl).addButton((btn) => btn.setButtonText(isTr ? "Ekle" : "Add to List").setCta().onClick(() => {
      this.close();
      this.onSubmit(this.count);
    }));
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/main.ts
var DailyReadsPlugin = class extends import_obsidian4.Plugin {
  constructor() {
    super(...arguments);
    this.queueView = null;
    this.currentDayKey = null;
    this.rebuilding = false;
    this.ramUndoSnapshot = null;
    this.state = null;
    this.isSavingState = false;
    this.lastSavedContent = null;
    this.saveTimeout = null;
    this.saveResolvers = [];
    this.refreshTimeout = null;
    this.refreshResolvers = [];
  }
  t(key, vars) {
    var _a;
    const lang = ((_a = this.settings) == null ? void 0 : _a.lang) || "en";
    let str = t(lang, key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  }
  async onload() {
    await this.loadSettings();
    const oldPath = ".obsidian/plugins/daily-reads/daily-reads-state.md";
    if (!this.settings.stateFolder || this.settings.stateFolder === ".obsidian/plugins/daily-reads") {
      this.settings.stateFolder = "99_S\u0130STEM/Haf\u0131za";
      await this.saveSettings();
    }
    const newPath = this.getStatePath();
    if (newPath !== oldPath) {
      const oldFile = this.app.vault.getAbstractFileByPath(oldPath);
      const newFile = this.app.vault.getAbstractFileByPath(newPath);
      if (oldFile instanceof import_obsidian4.TFile && !newFile) {
        try {
          await this.ensureFolder(this.settings.stateFolder);
          await this.app.vault.rename(oldFile, newPath);
          console.log(`Daily Reads: Migrated state file from ${oldPath} to ${newPath}`);
        } catch (e) {
          console.error("Daily Reads: Failed to migrate state file:", e);
        }
      }
    }
    // State will be loaded in onLayoutReady when vault is fully available
    this.addSettingTab(new DailyReadsSettingTab(this.app, this));
    this.registerView(VIEW_TYPE, (leaf) => {
      this.queueView = new DailyReadsQueueView(leaf, this);
      return this.queueView;
    });
    this.addCommand({ id: "build-today-queue", name: this.t("cmdRebuild"), callback: async () => {
      const q = await this.rebuildTodayQueue({ resync: true });
      new import_obsidian4.Notice(this.t("noticeRebuilt", { count: q.length }));
    } });
    this.addCommand({ id: "open-queue-panel", name: this.t("cmdOpenPanel"), callback: async () => {
      await this.activateQueueView();
    } });
    this.addCommand({ id: "open-next-note", name: this.t("cmdOpenNext"), callback: async () => {
      const q = await this.getTodayQueue();
      if (q.length === 0) {
        new import_obsidian4.Notice(this.t("noticeNoNoteInQueue"));
        return;
      }
      const file = this.app.vault.getAbstractFileByPath(q[0].path);
      if (file instanceof import_obsidian4.TFile) await this.openNote(file);
    } });
    this.addCommand({ id: "mark-current-note-as-read", name: this.t("cmdMarkRead"), callback: async () => {
      await this.markCurrentNoteAsRead();
    } });
    this.addCommand({ id: "defer-current-note", name: this.t("cmdDefer"), callback: async () => {
      await this.deferCurrentNoteToTomorrow();
    } });
    this.addCommand({ id: "undo-last-read", name: this.t("cmdUndo"), callback: async () => {
      await this.undoLastRead();
    } });
    this.addCommand({ id: "skip-today", name: this.t("cmdSkipToday"), callback: async () => {
      await this.skipToday();
    } });
    this.addCommand({ id: "unskip-today", name: this.t("cmdUnskipToday"), callback: async () => {
      await this.unskipToday();
    } });
    this.addCommand({ id: "show-stats", name: this.t("cmdShowStats"), callback: async () => {
      await this.showStats();
    } });
    this.registerEvent(
      this.app.vault.on("rename", async (file, oldPath2) => {
        if (!(file instanceof import_obsidian4.TFile)) return;
        if (file.path === this.getStatePath()) return;
        const state = await this.getState();
        if (state.noteStates[oldPath2]) {
          state.noteStates[file.path] = {
            ...state.noteStates[oldPath2],
            path: file.path
          };
          delete state.noteStates[oldPath2];
          if (Array.isArray(state.initialPaths)) {
            state.initialPaths = state.initialPaths.map((p) => p === oldPath2 ? file.path : p);
          }
          for (const plan of Object.values(state.dailyPlans)) {
            plan.assigned = plan.assigned.map((p) => p === oldPath2 ? file.path : p);
            plan.completed = plan.completed.map((p) => p === oldPath2 ? file.path : p);
          }
          if (state.sequentialCycle && Array.isArray(state.sequentialCycle.order)) {
            state.sequentialCycle.order = state.sequentialCycle.order.map((p) => p === oldPath2 ? file.path : p);
          }
          await this.saveState();
          await this.refreshView();
        }
      })
    );
    this.registerEvent(
      this.app.vault.on("delete", async (file) => {
        if (!(file instanceof import_obsidian4.TFile)) return;
        if (file.path === this.getStatePath()) return;
        const state = await this.getState();
        if (state.noteStates[file.path]) {
          delete state.noteStates[file.path];
          if (Array.isArray(state.initialPaths)) {
            state.initialPaths = state.initialPaths.filter((p) => p !== file.path);
          }
          for (const plan of Object.values(state.dailyPlans)) {
            plan.assigned = plan.assigned.filter((p) => p !== file.path);
            plan.completed = plan.completed.filter((p) => p !== file.path);
          }
          if (state.sequentialCycle && Array.isArray(state.sequentialCycle.order)) {
            state.sequentialCycle.order = state.sequentialCycle.order.filter((p) => p !== file.path);
          }
          await this.saveState();
          await this.refreshView();
        }
      })
    );
    this.registerEvent(
      this.app.vault.on("modify", async (file) => {
        if (file instanceof import_obsidian4.TFile && file.path === this.getStatePath()) {
          if (this.isSavingState) return;
          const text = await this.app.vault.read(file);
          const normText = text.replace(/\r\n/g, "\n");
          const normSaved = this.lastSavedContent ? this.lastSavedContent.replace(/\r\n/g, "\n") : "";
          if (normText === normSaved) return;
          this.state = await this.loadState();
          await this.refreshView();
        }
      })
    );
    this.app.workspace.onLayoutReady(async () => {
      if (!this.state) {
        this.state = await this.loadState();
        const loadedNotes = Object.keys(this.state.noteStates || {}).length;
        const loadedHistory = Object.values(this.state.noteStates || {}).filter((n) => n.history && n.history.length > 0).length;
        console.log("[DailyReads] onLayoutReady: state loaded, " + loadedNotes + " notes, " + loadedHistory + " with history, sequentialCycle.order.length=" + (this.state.sequentialCycle?.order?.length || 0) + ", cursor=" + (this.state.sequentialCycle?.cursor || 0));
      }
      const q = await this.rebuildTodayQueue({ resync: true });
      this.currentDayKey = toIsoDate(/* @__PURE__ */ new Date());
    });
    this.registerInterval(window.setInterval(async () => {
      const today = toIsoDate(/* @__PURE__ */ new Date());
      if (this.currentDayKey === null) {
        this.currentDayKey = today;
        return;
      }
      if (today === this.currentDayKey) return;
      this.currentDayKey = today;
      await this.rebuildTodayQueue({ resync: true, showNotice: true });
    }, 6e4));
  }
  async onunload() {
    console.log("[DailyReads] onunload: flushing state, saveTimeout=" + (this.saveTimeout ? "pending" : "none"));
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }
    if (this.state) {
      const noteCount3 = Object.keys(this.state.noteStates || {}).length;
      console.log("[DailyReads] onunload: saving " + noteCount3 + " notes to disk");
      try {
        const path = this.getStatePath();
        await this.ensureFolder(this.settings.stateFolder);
        const content = "# Daily Reads State\n\n```json\n" + JSON.stringify(this.state, null, 2) + "\n```\n";
        this.lastSavedContent = content;
        const existing = this.app.vault.getAbstractFileByPath(path);
        if (existing instanceof import_obsidian4.TFile) {
          await this.app.vault.modify(existing, content);
        } else {
          await this.app.vault.create(path, content);
        }
      } catch (e) {
        console.error("[DailyReads] onunload: ERROR flushing state:", e);
      }
      console.log("[DailyReads] onunload: state saved successfully");
    } else {
      console.log("[DailyReads] onunload: this.state is null, nothing to save");
    }
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  // === State (markdown file) ===
  getStatePath() {
    const folder = this.settings.stateFolder.trim().replace(/\/+$/, "");
    const name = this.settings.stateFileName.endsWith(".md") ? this.settings.stateFileName : `${this.settings.stateFileName}.md`;
    return folder ? `${folder}/${name}` : name;
  }
  async getState() {
    if (!this.state) {
      this.state = await this.loadState();
    }
    return this.state;
  }
  async loadState() {
    var _a, _b, _c, _d, _e, _f;
    const path = this.getStatePath();
    console.log("[DailyReads] loadState: path=" + path);
    let file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof import_obsidian4.TFile)) {
      const allMd = this.app.vault.getMarkdownFiles();
      file = allMd.find((f) => f.path === path);
      console.log("[DailyReads] loadState: getAbstractFileByPath failed, getMarkdownFiles fallback: " + (file ? "FOUND" : "NOT FOUND"));
    }
    if (!(file instanceof import_obsidian4.TFile)) {
      console.log("[DailyReads] loadState: file NOT found at " + path + " - returning DEFAULT_STATE (empty)");
      return structuredClone(DEFAULT_STATE);
    }
    const text = await this.app.vault.read(file);
    const block = text.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonText = block ? block[1] : text;
    try {
      const parsed = JSON.parse(jsonText);
      const noteStates = (_a = parsed.noteStates) != null ? _a : {};
      const noteCount = Object.keys(noteStates).length;
      const historyCount = Object.values(noteStates).filter((n) => n.history && n.history.length > 0).length;
      console.log("[DailyReads] loadState: parsed OK, " + noteCount + " notes tracked, " + historyCount + " with history");
      const initialPaths = Array.isArray(parsed.initialPaths) ? parsed.initialPaths : Object.keys(noteStates);
      return {
        noteStates,
        dailyPlans: (_b = parsed.dailyPlans) != null ? _b : {},
        lastPlannedDate: (_c = parsed.lastPlannedDate) != null ? _c : null,
        sequentialCycle: {
          order: Array.isArray((_d = parsed.sequentialCycle) == null ? void 0 : _d.order) ? parsed.sequentialCycle.order : [],
          cursor: typeof ((_e = parsed.sequentialCycle) == null ? void 0 : _e.cursor) === "number" ? parsed.sequentialCycle.cursor : 0,
          round: typeof ((_f = parsed.sequentialCycle) == null ? void 0 : _f.round) === "number" ? parsed.sequentialCycle.round : 1
        },
        initialPaths
      };
    } catch (e) {
      console.warn("[DailyReads] loadState: FAILED to parse state file!", e);
      new import_obsidian4.Notice(
        this.settings.lang === "tr" ? "Durum dosyas\u0131 (daily-reads-state.md) ayr\u0131\u015Ft\u0131r\u0131lamad\u0131! JSON format\u0131 hatal\u0131 olabilir." : "Failed to parse daily-reads-state.md! JSON formatting might be invalid."
      );
      if (this.state) return this.state;
      return structuredClone(DEFAULT_STATE);
    }
  }
  async saveState() {
    if (!this.state) {
      console.log("[DailyReads] saveState: this.state is null/undefined, skipping save");
      return;
    }
    const noteCount2 = Object.keys(this.state.noteStates || {}).length;
    console.log("[DailyReads] saveState: scheduling save, " + noteCount2 + " notes in state");
    return new Promise((resolve) => {
      this.saveResolvers.push(resolve);
      if (this.saveTimeout) {
        clearTimeout(this.saveTimeout);
      }
      this.saveTimeout = setTimeout(async () => {
        this.saveTimeout = null;
        const resolvers = this.saveResolvers;
        this.saveResolvers = [];
        
        const path = this.getStatePath();
        await this.ensureFolder(this.settings.stateFolder);
        const content = "# Daily Reads State\n\n```json\n" + JSON.stringify(this.state, null, 2) + "\n```\n";
        this.lastSavedContent = content;
        this.isSavingState = true;
        try {
          const existing = this.app.vault.getAbstractFileByPath(path);
          if (existing instanceof import_obsidian4.TFile) {
            await this.app.vault.modify(existing, content);
          } else {
            await this.app.vault.create(path, content);
          }
        } catch (err) {
          console.error("Daily Reads: Error saving state:", err);
          new import_obsidian4.Notice(this.settings.lang === "tr" ? "Durum dosyas\u0131 kaydedilirken hata olu\u015Ftu!" : "Error saving state file!");
        } finally {
          setTimeout(() => {
            this.isSavingState = false;
          }, 2e3);
        }
        
        for (const res of resolvers) {
          res();
        }
      }, 150);
    });
  }
  async ensureFolder(p) {
    const norm = p.replace(/\/+$/, "");
    if (!norm) return;
    const existing = this.app.vault.getAbstractFileByPath(norm);
    if (existing instanceof import_obsidian4.TFolder) return;
    const parts = norm.split("/");
    let cur = "";
    for (const part of parts) {
      cur = cur ? `${cur}/${part}` : part;
      const file = this.app.vault.getAbstractFileByPath(cur);
      if (!(file instanceof import_obsidian4.TFolder)) {
        try {
          await this.app.vault.createFolder(cur);
        } catch (err) {
          const checkAgain = this.app.vault.getAbstractFileByPath(cur);
          if (!(checkAgain instanceof import_obsidian4.TFolder)) {
            console.warn("Daily Reads: Failed to create or confirm folder:", cur, err);
          }
        }
      }
    }
  }
  // === Candidate collection ===
  collectCandidates() {
    const all = this.app.vault.getMarkdownFiles();
    const normIncludes = this.settings.folders.map((f) => f.replace(/\/+$/, ""));
    const normExcludes = (this.settings.excludeFolders || []).map((f) => f.replace(/\/+$/, ""));
    return all.filter((f) => {
      if (!this.isEligible(f.path)) return false;
      const isExcluded = normExcludes.some((folder) => {
        if (this.settings.includeSubfolders) return f.path.startsWith(folder + "/");
        return this.dirOf(f.path) === folder;
      });
      if (isExcluded) return false;
      if (normIncludes.length > 0) {
        const isIncluded = normIncludes.some((folder) => {
          if (this.settings.includeSubfolders) return f.path.startsWith(folder + "/");
          return this.dirOf(f.path) === folder;
        });
        if (!isIncluded) return false;
      }
      return true;
    });
  }
  isEligible(filePath) {
    if (filePath === this.getStatePath()) return false;
    if (!this.settings.includeFolderNotes && this.looksLikeFolderNote(filePath)) return false;
    return true;
  }
  dirOf(path) {
    const parts = path.split("/");
    parts.pop();
    return parts.join("/");
  }
  basename(path) {
    var _a;
    return ((_a = path.split("/").pop()) != null ? _a : "").replace(/\.md$/i, "");
  }
  looksLikeFolderNote(path) {
    var _a;
    const parts = path.split("/");
    if (parts.length < 2) return false;
    const fn = (_a = parts[parts.length - 2]) == null ? void 0 : _a.trim().toLowerCase();
    const nn = this.basename(path).trim().toLowerCase();
    return !!fn && fn === nn;
  }
  // === Sync & Plan ===
  syncCandidates(state, today) {
    const candidates = this.collectCandidates();
    const pathSet = new Set(candidates.map((f) => f.path));
    let changed = false;
    
    if (!state.initialPaths || state.initialPaths.length === 0) {
      const isFirstSync = Object.keys(state.noteStates).length === 0;
      if (isFirstSync && candidates.length > 0) {
        state.initialPaths = Array.from(pathSet);
        changed = true;
      }
    }
    
    for (const f of candidates) {
      if (!state.noteStates[f.path]) {
        state.noteStates[f.path] = { path: f.path, intervalIndex: 0, lastReadDate: null, nextDueDate: today, history: [] };
        changed = true;
      }
    }
    
    if (this.syncSequentialCycle(state, pathSet)) changed = true;
    return changed;
  }
  syncSequentialCycle(state, pathSet) {
    const cycle = state.sequentialCycle || (state.sequentialCycle = { order: [], cursor: 0, round: 1 });
    const currentPath = cycle.order[cycle.cursor];
    const filtered = cycle.order.filter((p) => pathSet.has(p));
    const eligible = Array.from(pathSet);
    const missing = eligible.filter((p) => !filtered.includes(p));
    if (missing.length > 0) filtered.push(...this.shuffle(missing));
    
    let normCursor = 0;
    if (filtered.length > 0) {
      if (currentPath && filtered.includes(currentPath)) {
        normCursor = filtered.indexOf(currentPath);
      } else {
        normCursor = Math.min(cycle.cursor, filtered.length - 1);
      }
    }
    
    const changed = filtered.join("|") !== cycle.order.join("|") || normCursor !== cycle.cursor;
    cycle.order = filtered;
    cycle.cursor = normCursor;
    if (cycle.round <= 0 || !Number.isFinite(cycle.round)) {
      cycle.round = 1;
      return true;
    }
    return changed;
  }
  ensurePlansThroughToday(state, today) {
    const start = state.lastPlannedDate ? addDays(state.lastPlannedDate, 1) : today;
    if (start > today) return false;
    let changed = false;
    let date = start;
    let guard = 0;
    while (date <= today) {
      const pc = this.generatePlan(state, date);
      state.lastPlannedDate = date;
      changed = changed || pc || date === start;
      date = addDays(date, 1);
      guard++;
      if (guard > 3660) {
        state.lastPlannedDate = today;
        return true;
      }
    }
    return changed;
  }
  generatePlan(state, date) {
    if (this.settings.queueMode === "sequential-cycle") {
      return this.generateSeqPlan(state, date);
    }
    const target = getDayTarget(this.settings, date);
    const plan = this.getOrCreatePlan(state, date);
    if (plan.skipped) return false;
    if (plan.assigned.length >= target) return false;
    
    const candidates = this.collectCandidates();
    const pathSet = new Set(candidates.map((f) => f.path));

    const prev = state.dailyPlans[addDays(date, -1)];
    const carryOver = prev ? prev.assigned.filter((p) => !prev.completed.includes(p) && pathSet.has(p)) : [];
    const preAssigned = plan.assigned.filter(p => pathSet.has(p));
    
    const due = Object.values(state.noteStates).filter((n) => {
      if (!pathSet.has(n.path)) return false;
      if (carryOver.includes(n.path)) return false;
      if (preAssigned.includes(n.path)) return false;
      return n.nextDueDate <= date;
    });
    const budget = Math.max(0, target - carryOver.length - preAssigned.length);
    const picked = this.pickDueNotes(due, budget);
    plan.assigned = [...preAssigned, ...carryOver, ...picked.map((n) => n.path)].slice(0, target);
    return true;
  }
  generateSeqPlan(state, date) {
    const target = getDayTarget(this.settings, date);
    const plan = this.getOrCreatePlan(state, date);
    if (plan.skipped) return false;
    if (plan.assigned.length >= target) return false;
    
    const candidates = this.collectCandidates();
    const pathSet = new Set(candidates.map((f) => f.path));

    const prev = state.dailyPlans[addDays(date, -1)];
    const carryOver = prev ? prev.assigned.filter((p) => !prev.completed.includes(p) && pathSet.has(p)) : [];
    const preAssigned = plan.assigned.filter(p => pathSet.has(p));
    
    const budget = Math.max(0, target - carryOver.length - preAssigned.length);
    const excluded = /* @__PURE__ */ new Set([...carryOver, ...preAssigned]);
    const picked = this.pickSeqNotes(state, budget, excluded);
    plan.assigned = [...preAssigned, ...carryOver, ...picked].slice(0, target);
    return true;
  }
  rebuildPlan(state, date) {
    if (this.settings.queueMode === "sequential-cycle") {
      return this.rebuildSeqPlan(state, date);
    }
    const target = getDayTarget(this.settings, date);
    const plan = this.getOrCreatePlan(state, date);
    if (plan.skipped) return false;
    
    const candidates = this.collectCandidates();
    const pathSet = new Set(candidates.map((f) => f.path));

    const completed = plan.completed.filter((p) => state.noteStates[p]);
    const prev = state.dailyPlans[addDays(date, -1)];
    const carryOver = prev ? prev.assigned.filter((p) => !prev.completed.includes(p) && pathSet.has(p) && !completed.includes(p)) : [];
    const uncompleted = plan.assigned.filter((p) => !completed.includes(p) && !carryOver.includes(p) && pathSet.has(p));
    
    const due = Object.values(state.noteStates).filter((n) => {
      if (!pathSet.has(n.path)) return false;
      if (completed.includes(n.path)) return false;
      if (carryOver.includes(n.path)) return false;
      if (uncompleted.includes(n.path)) return false;
      return n.nextDueDate <= date;
    });

    const minTarget = Math.max(target, completed.length);
    const cur = completed.length + carryOver.length + uncompleted.length;
    const budget = Math.max(0, minTarget - cur);
    const picked = this.pickDueNotes(due, budget);
    const assigned = [...completed, ...carryOver, ...uncompleted, ...picked.map((n) => n.path)];
    const changed = assigned.join("|") !== plan.assigned.join("|") || completed.join("|") !== plan.completed.join("|");
    plan.assigned = assigned;
    plan.completed = completed;
    return changed;
  }
  rebuildSeqPlan(state, date) {
    const target = getDayTarget(this.settings, date);
    const plan = this.getOrCreatePlan(state, date);
    if (plan.skipped) return false;

    const candidates = this.collectCandidates();
    const pathSet = new Set(candidates.map((f) => f.path));

    const completed = plan.completed.filter((p) => state.noteStates[p]);
    const prev = state.dailyPlans[addDays(date, -1)];
    const carryOver = prev ? prev.assigned.filter((p) => !prev.completed.includes(p) && pathSet.has(p) && !completed.includes(p)) : [];
    const uncompleted = plan.assigned.filter((p) => !completed.includes(p) && !carryOver.includes(p) && pathSet.has(p));
    
    const minTarget = Math.max(target, completed.length);
    const cur = completed.length + carryOver.length + uncompleted.length;
    const budget = Math.max(0, minTarget - cur);
    const excluded = /* @__PURE__ */ new Set([...completed, ...carryOver, ...uncompleted]);
    const picked = this.pickSeqNotes(state, budget, excluded);
    const assigned = [...completed, ...carryOver, ...uncompleted, ...picked];
    const changed = assigned.join("|") !== plan.assigned.join("|") || completed.join("|") !== plan.completed.join("|");
    plan.assigned = assigned;
    plan.completed = completed;
    return changed;
  }
  pickDueNotes(due, slotBudget) {
    if (slotBudget <= 0) return [];
    const reviews = due.filter((n) => n.history.length > 0);
    const news = due.filter((n) => n.history.length === 0);
    const sRev = this.sortNotes(reviews);
    const sNew = this.sortNotes(news);
    const pickedReviews = sRev.slice(0, slotBudget);
    const remainingBudget = slotBudget - pickedReviews.length;
    const pickedNews = sNew.slice(0, remainingBudget);
    return [...pickedReviews, ...pickedNews];
  }
  pickSeqNotes(state, budget, excluded, advance = true) {
    if (budget <= 0) return [];
    const cycle = state.sequentialCycle;
    if (cycle.order.length === 0) return [];
    const picked = [];
    let checked = 0;
    while (picked.length < budget && checked < cycle.order.length * 2) {
      if (cycle.order.length === 0) break;
      const idx = (cycle.cursor + (advance ? 0 : checked)) % cycle.order.length;
      const path = cycle.order[idx];
      checked++;
      if (!this.isEligible(path)) continue;
      if (excluded.has(path)) continue;
      picked.push(path);
      excluded.add(path);
      if (advance) {
        cycle.cursor++;
        if (cycle.cursor >= cycle.order.length) {
          cycle.cursor = 0;
          cycle.round++;
          if (this.settings.shuffleEveryRound) cycle.order = this.shuffle(cycle.order);
        }
      }
    }
    return picked;
  }
  sortNotes(notes) {
    if (this.settings.sortStrategy === "alphabetical") return [...notes].sort((a, b) => a.path.localeCompare(b.path));
    if (this.settings.sortStrategy === "random") {
      const arr = [...notes];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    return [...notes].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate));
  }
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  getQueueForDate(state, date) {
    const plan = state.dailyPlans[date];
    if (!plan) return [];
    return plan.assigned.filter((p) => !plan.completed.includes(p) && this.isEligible(p)).map((p) => state.noteStates[p]).filter(Boolean);
  }
  getOrCreatePlan(state, date) {
    if (!state.dailyPlans[date]) state.dailyPlans[date] = { assigned: [], completed: [] };
    return state.dailyPlans[date];
  }
  // === Actions ===
  async markCurrentNoteAsRead() {
    const file = this.app.workspace.getActiveFile();
    if (!(file instanceof import_obsidian4.TFile)) {
      new import_obsidian4.Notice(this.t("noticeNoActiveNote"));
      return;
    }
    if (!this.isEligible(file.path)) {
      new import_obsidian4.Notice(this.t("noticeOutsideScope"));
      return;
    }
    await this.markAsRead(file.path);
  }
  async markAsRead(path) {
    var _a, _b;
    try {
      const today = toIsoDate(/* @__PURE__ */ new Date());
      const state = await this.getState();
      this.ensurePlansThroughToday(state, today);
      const note = state.noteStates[path];
      if (!note) {
        new import_obsidian4.Notice(this.t("noticeNotTracked"));
        return;
      }
      if (note.lastReadDate === today) {
        return;
      }
      this.ramUndoSnapshot = JSON.stringify({
        noteStates: structuredClone(state.noteStates),
        dailyPlans: structuredClone(state.dailyPlans),
        lastPlannedDate: state.lastPlannedDate,
        sequentialCycle: structuredClone(state.sequentialCycle),
        initialPaths: structuredClone(state.initialPaths)
      });
      const plan = this.getOrCreatePlan(state, today);
      if (!plan.assigned.includes(path)) plan.assigned.push(path);
      if (!plan.completed.includes(path)) plan.completed.push(path);
      note.lastReadDate = today;
      note.history.push(today);
      let days = 0;
      if (this.settings.queueMode !== "sequential-cycle") {
        const intervals = this.settings.defaultIntervalsInDays;
        let nextIdx = note.intervalIndex + 1;
        if (nextIdx < intervals.length) {
          days = (_a = intervals[nextIdx]) != null ? _a : 1;
        } else {
          const last = (_b = intervals[intervals.length - 1]) != null ? _b : 1;
          const extra = nextIdx - (intervals.length - 1);
          days = Math.ceil(last * Math.pow(this.settings.intervalMultiplier, extra));
        }
        note.intervalIndex = nextIdx;
        note.nextDueDate = addDays(today, days);
      } else {
        note.nextDueDate = today;
        note.lastReadRound = ((state.sequentialCycle || {}).round) || 1;
      }
      await this.saveState();
      if (this.settings.queueMode !== "sequential-cycle") {
        new import_obsidian4.Notice(this.t("noticeMarkedRead", { days }));
      } else {
        const lang = this.settings.lang || "en";
        new import_obsidian4.Notice(lang === "tr" ? "Daily Reads: okundu olarak i\u015Faretlendi." : "Daily Reads: marked as read.");
      }
      await this.refreshView();
      if (this.settings.autoOpenNext) {
        const q = this.getQueueForDate(state, today);
        if (q.length > 0) {
          const f = this.app.vault.getAbstractFileByPath(q[0].path);
          if (f instanceof import_obsidian4.TFile) await this.openNote(f);
        }
      }
    } catch (err) {
      console.error("Daily Reads: Error in markAsRead:", err);
      const msg = err instanceof Error ? err.message : String(err);
      new import_obsidian4.Notice(this.settings.lang === "tr" ? "Okundu i\u015Faretlenirken hata olu\u015Ftu: " + msg : "Error marking note as read: " + msg);
    }
  }
  async readAheadRandom() {
    new ReadAheadModal(this.app, this, async (count) => {
      await this.readAheadSequential(count);
    }).open();
  }
  async readAheadSequential(count) {
    try {
      const today = toIsoDate(/* @__PURE__ */ new Date());
      const state = await this.getState();
      const plan = this.getOrCreatePlan(state, today);
      const excluded = /* @__PURE__ */ new Set([...plan.assigned]);
      const picked = this.pickSeqNotes(state, count, excluded, true);
      if (picked.length === 0) {
        new import_obsidian4.Notice(this.settings.lang === "tr" ? "Okuma kapsam\u0131na uyan yeni not bulunamad\u0131!" : "No new notes matched the reading scope!");
        return;
      }
      plan.assigned = [...plan.assigned, ...picked];
      await this.saveState();
      new import_obsidian4.Notice(
        this.settings.lang === "tr" ? `${picked.length} yeni not bug\xFCn\xFCn listesine eklendi.` : `${picked.length} new notes added to today's list.`
      );
      await this.refreshView();
    } catch (err) {
      console.error("Daily Reads: Error in readAheadSequential:", err);
      new import_obsidian4.Notice("Error adding notes: " + err.message);
    }
  }
  async deferCurrentNoteToTomorrow() {
    const file = this.app.workspace.getActiveFile();
    if (!(file instanceof import_obsidian4.TFile)) {
      new import_obsidian4.Notice(this.t("noticeNoActiveNote"));
      return;
    }
    if (!this.isEligible(file.path)) {
      new import_obsidian4.Notice(this.t("noticeOutsideScope"));
      return;
    }
    await this.deferNote(file.path, this.settings.deferMode, this.settings.deferDays);
  }
  async deferNote(path, mode, customDays) {
    try {
      const today = toIsoDate(/* @__PURE__ */ new Date());
      const state = await this.getState();
      this.ensurePlansThroughToday(state, today);
      const note = state.noteStates[path];
      if (!note) {
        new import_obsidian4.Notice(this.t("noticeNotTracked"));
        return;
      }
      this.ramUndoSnapshot = JSON.stringify({
        noteStates: structuredClone(state.noteStates),
        dailyPlans: structuredClone(state.dailyPlans),
        lastPlannedDate: state.lastPlannedDate,
        sequentialCycle: structuredClone(state.sequentialCycle),
        initialPaths: structuredClone(state.initialPaths)
      });
      const d = Math.max(1, customDays != null ? customDays : this.settings.deferDays);
      if (this.settings.queueMode !== "sequential-cycle") {
        let raw;
        if (mode === "days") {
          raw = addDays(today, d);
        } else if (mode === "next-available") {
          raw = this.findNextAvailable(state, today);
        } else {
          raw = addDays(today, 1);
        }
        note.nextDueDate = this.capDefer(today, raw);
      } else {
        const target = getDayTarget(this.settings, today);
        const shift = target * d;
        const cycle = state.sequentialCycle;
        if (cycle && cycle.order.length > 0) {
          const idx = cycle.order.indexOf(path);
          if (idx !== -1) {
            cycle.order.splice(idx, 1);
            if (idx < cycle.cursor) {
              cycle.cursor = Math.max(0, cycle.cursor - 1);
            }
            const newIdx = Math.min(cycle.order.length, cycle.cursor + shift);
            cycle.order.splice(newIdx, 0, path);
          }
        }
        note.nextDueDate = addDays(today, d);
      }
      const plan = state.dailyPlans[today];
      if (plan) {
        plan.assigned = plan.assigned.filter((p) => p !== path);
        plan.completed = plan.completed.filter((p) => p !== path);
      }
      await this.saveState();
      new import_obsidian4.Notice(this.t("noticeMovedTo", { date: note.nextDueDate }));
      await this.refreshView();
    } catch (err) {
      console.error("Daily Reads: Error in deferNote:", err);
      const msg = err instanceof Error ? err.message : String(err);
      new import_obsidian4.Notice(this.settings.lang === "tr" ? "Not ertelenirken hata olu\u015Ftu: " + msg : "Error deferring note: " + msg);
    }
  }
  findNextAvailable(state, today) {
    let date = addDays(today, 1);
    for (let i = 0; i < 30; i++) {
      const plan = state.dailyPlans[date];
      const target = getDayTarget(this.settings, date);
      if (!plan || plan.assigned.length < target) return this.capDefer(today, date);
      date = addDays(date, 1);
    }
    return this.capDefer(today, date);
  }
  capDefer(today, candidate) {
    if (this.settings.deferCapMode === "none") return candidate;
    let maxDays;
    if (this.settings.deferCapMode === "fixed") {
      maxDays = Math.max(1, this.settings.deferCapFixedDays);
    } else {
      const intervals = this.settings.defaultIntervalsInDays;
      const longest = intervals.length > 0 ? Math.max(...intervals) : 1;
      const scaled = Math.ceil(longest * this.settings.deferCapFormulaMultiplier);
      maxDays = Math.max(this.settings.deferCapFormulaMinDays, scaled);
    }
    const limit = addDays(today, maxDays);
    return candidate > limit ? limit : candidate;
  }
  async undoLastRead() {
    if (!this.ramUndoSnapshot) {
      new import_obsidian4.Notice(this.t("noticeNothingToUndo"));
      return;
    }
    try {
      const snap = JSON.parse(this.ramUndoSnapshot);
      this.ramUndoSnapshot = null;
      this.state = snap;
      await this.saveState();
      new import_obsidian4.Notice(this.t("noticeUndone"));
      await this.refreshView();
    } catch (e) {
      new import_obsidian4.Notice(this.t("noticeUndoFailed"));
    }
  }
  async skipToday() {
    const today = toIsoDate(/* @__PURE__ */ new Date());
    const state = await this.getState();
    this.ensurePlansThroughToday(state, today);
    this.ramUndoSnapshot = JSON.stringify({
      noteStates: structuredClone(state.noteStates),
      dailyPlans: structuredClone(state.dailyPlans),
      lastPlannedDate: state.lastPlannedDate,
      sequentialCycle: structuredClone(state.sequentialCycle),
      initialPaths: structuredClone(state.initialPaths)
    });
    const plan = this.getOrCreatePlan(state, today);
    plan.skipped = true;
    await this.saveState();
    await this.refreshView([]);
    new import_obsidian4.Notice(this.t("noticeTodaySkipped"));
  }
  async unskipToday() {
    const today = toIsoDate(/* @__PURE__ */ new Date());
    const state = await this.getState();
    const plan = state.dailyPlans[today];
    if (plan && plan.skipped) {
      delete plan.skipped;
      await this.saveState();
      await this.rebuildTodayQueue({ resync: true, refreshView: true });
      new import_obsidian4.Notice(this.t("noticeTodayUnskipped"));
    }
  }
  async showStats() {
    const state = await this.getState();
    const notes = Object.values(state.noteStates);
    const total = notes.length;
    const readOnce = notes.filter((n) => n.history.length > 0).length;
    const today = toIsoDate(/* @__PURE__ */ new Date());
    const readToday = notes.filter((n) => n.lastReadDate === today).length;
    new import_obsidian4.Notice(this.t("noticeStats", { read: readOnce, total, today: readToday }));
  }
  async openNote(file) {
    const leaf = this.app.workspace.getLeaf(this.settings.openInNewTab);
    if (this.settings.openInReadingMode) {
      await leaf.setViewState({ type: "markdown", state: { file: file.path, mode: "preview" }, active: true });
    } else {
      await leaf.openFile(file);
    }
  }
  // === Queue ===
  async rebuildTodayQueue(opts) {
    var _a, _b;
    if (this.rebuilding) return this.getTodayQueue();
    this.rebuilding = true;
    try {
      const today = toIsoDate(/* @__PURE__ */ new Date());
      const state = await this.getState();
      const resync = (_a = opts == null ? void 0 : opts.resync) != null ? _a : false;
      let changed = false;
      if (resync) changed = this.syncCandidates(state, today);
      changed = this.ensurePlansThroughToday(state, today) || changed;
      changed = this.rebuildPlan(state, today) || changed;
      if (changed) await this.saveState();
      const q = this.getQueueForDate(state, today);
      if ((_b = opts == null ? void 0 : opts.refreshView) != null ? _b : true) await this.refreshView(q);
      if (opts == null ? void 0 : opts.showNotice) new import_obsidian4.Notice(this.t("noticeRebuilt", { count: q.length }));
      return q;
    } finally {
      this.rebuilding = false;
    }
  }
  async getTodayQueue() {
    const today = toIsoDate(/* @__PURE__ */ new Date());
    const state = await this.getState();
    this.syncCandidates(state, today);
    this.ensurePlansThroughToday(state, today);
    return this.getQueueForDate(state, today);
  }
  async activateQueueView(queue) {
    var _a;
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (!leaf) {
      leaf = (_a = this.app.workspace.getRightLeaf(false)) != null ? _a : this.app.workspace.getLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
    }
    this.app.workspace.revealLeaf(leaf);
    const q = queue != null ? queue : await this.getTodayQueue();
    await this.refreshView(q);
  }
  async refreshView(queue) {
    if (!this.queueView) return;
    return new Promise((resolve) => {
      this.refreshResolvers.push(resolve);
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout);
      }
      this.refreshTimeout = setTimeout(async () => {
        this.refreshTimeout = null;
        const resolvers = this.refreshResolvers;
        this.refreshResolvers = [];
        
        const q = queue != null ? queue : await this.getTodayQueue();
        await this.queueView.render(q);
        
        for (const res of resolvers) {
          res();
        }
      }, 100);
    });
  }
  // === Plan sections ===
  async getPlanSections() {
    var _a;
    const state = await this.getState();
    const today = toIsoDate(/* @__PURE__ */ new Date());
    const plan = (_a = state.dailyPlans[today]) != null ? _a : { assigned: [], completed: [] };
    if (plan.skipped) return { unread: [], read: [] };
    const unread = plan.assigned.filter((p) => !plan.completed.includes(p) && this.isEligible(p)).map((p) => state.noteStates[p]).filter(Boolean);
    const read = plan.completed.filter((p) => this.isEligible(p)).map((p) => state.noteStates[p]).filter(Boolean);
    return { unread, read };
  }
};
