"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { THEMES, normalizeTheme, type ThemeKey } from "./format";
import {
  ARRIVALS_SEED,
  AUDIT_SEED,
  MAPPINGS_SEED,
  RECS_SEED,
  ROOMS_SEED,
  type AiMode,
  type HkStatus,
  type Lang,
  type RecStatus,
  type Role,
} from "./model";
import { PMS_SOURCES, SWITCH_STEPS, type PmsSource, type SwitchStatus } from "./migrate";
import { AI_ACTIONS, ALLOTMENT_SEED, type AiEngine } from "./ai";
import {
  REV_DECISIONS,
  guardDecision,
  pendingRev,
  type RevLevel,
  type RevStatus,
} from "./revenueos";
import {
  AGI_MISSIONS,
  AGI_RECORD_SEED,
  AGI_RULES,
  type AgiBot,
  type AgiConn,
  type AgiLevel,
  type AgiMissionStatus,
  type AgiRecord,
} from "./agi";
import { clearInviteSession, readInviteSession, type InviteSession } from "./invite";
import {
  activeConnector,
  cloneAri,
  cloneChannels,
  cloneInbound,
  cloneQueue,
  cloneRateMaps,
  cloneRoomMaps,
  WEBHOOK_NEW,
  type AriRow,
  type InboundRes,
  type OtaChannel,
  type OtaId,
  type SyncJob,
} from "./ota";

export const NAV_W_MIN = 176;
export const NAV_W_MAX = 420;
export const NAV_W_DEFAULT = 236;

export function clampNavWidth(n: number) {
  return Math.min(NAV_W_MAX, Math.max(NAV_W_MIN, Math.round(n)));
}

export type AuditEvent = { t: string; who: string; what: string; kind: string };
export type Mapping = (typeof MAPPINGS_SEED)[number];
export type Room = (typeof ROOMS_SEED)[number];

type Store = {
  ready: boolean;
  authed: boolean;
  login: (role: Role, opts?: { invite?: boolean }) => void;
  logout: () => void;
  invite: InviteSession | null;
  role: Role;
  theme: ThemeKey;
  setTheme: (k: ThemeKey) => void;
  themeVars: Record<string, string>;
  lang: Lang;
  setLang: (l: Lang) => void;
  propertyId: string;
  setPropertyId: (id: string) => void;
  toast: string | null;
  flash: (m: string) => void;
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  navWidth: number;
  setNavWidth: (n: number) => void;
  search: string;
  setSearch: (v: string) => void;
  aiMode: AiMode;
  setAiMode: (m: AiMode) => void;
  recState: Record<string, RecStatus>;
  applyRec: (id: string) => void;
  dismissRec: (id: string) => void;
  rooms: Room[];
  advanceRoom: (no: string) => void;
  checked: Record<string, boolean>;
  checkIn: (id: string) => void;
  collectDue: (id: string) => void;
  tm30Filed: boolean;
  fileTm30: () => void;
  scanned: Record<string, boolean>;
  scanPassport: (id: string) => void;
  thread: number;
  setThread: (i: number) => void;
  sent: Record<number, string[]>;
  sendDraft: () => void;
  mappings: Mapping[];
  fixLoftMapping: () => void;
  agodaRetry: boolean;
  forceAgoda: () => void;
  shieldClosed: Record<string, boolean>;
  closeShield: (id: string) => void;
  audit: AuditEvent[];
  walkInOpen: boolean;
  setWalkInOpen: (v: boolean) => void;
  newResOpen: boolean;
  setNewResOpen: (v: boolean) => void;
  addWalkIn: (guest: string, type: string) => void;
  benefits: Record<string, boolean>;
  toggleBenefit: (id: string) => void;
  assigned: Record<string, boolean>;
  autoAssign: () => void;
  calRange: "14" | "30" | "month";
  setCalRange: (r: "14" | "30" | "month") => void;
  switchSource: PmsSource;
  setSwitchSource: (s: PmsSource) => void;
  switchStatus: SwitchStatus;
  switchStep: number;
  startSwitch: () => void;
  resetSwitch: () => void;
  selectedOta: OtaId;
  setSelectedOta: (id: OtaId) => void;
  otaChannels: OtaChannel[];
  roomMaps: ReturnType<typeof cloneRoomMaps>;
  rateMaps: ReturnType<typeof cloneRateMaps>;
  jobs: SyncJob[];
  inbound: InboundRes[];
  ari: Record<string, AriRow[]>;
  invType: string;
  setInvType: (id: string) => void;
  reconcile: "open" | "running" | "resolved";
  tripActual: number;
  connectChannel: (id: OtaId) => void;
  syncNow: (id: OtaId) => void;
  pauseAgoda: () => void;
  pushAri: () => void;
  retryJob: (id: string) => void;
  receiveWebhook: () => void;
  applyModification: () => void;
  applyCancellation: () => void;
  runReconcile: () => void;
  aiState: Record<string, RecStatus>;
  applyAi: (id: string) => void;
  dismissAi: (id: string) => void;
  applyEngine: (engine: AiEngine) => void;
  applyHigh: () => void;
  allotment: Record<string, number>;
  collected: Record<string, boolean>;
  agentReady: boolean;
  setAgentReady: (v: boolean) => void;
  agentBooks: Record<string, unknown>[];
  receiveAgentBooking: (booking: Record<string, unknown>) => void;
  revLevel: RevLevel;
  setRevLevel: (n: RevLevel) => void;
  revState: Record<string, RevStatus>;
  applyRev: (id: string) => void;
  dismissRev: (id: string) => void;
  applyRevOpen: () => void;
  revMeetingAt: string | null;
  runRevMeeting: () => void;
  revSellLimit: Record<string, number>;
  revOffers: Record<string, boolean>;
  agiOn: boolean;
  setAgiOn: (v: boolean) => void;
  agiPaused: boolean;
  setAgiPaused: (v: boolean) => void;
  agiLevel: AgiLevel;
  setAgiLevel: (n: AgiLevel) => void;
  agiConns: Record<AgiBot, AgiConn>;
  testAgiBot: (id: AgiBot) => void;
  setAgiConn: (id: AgiBot, s: AgiConn) => void;
  agiMissions: Record<string, AgiMissionStatus>;
  runAgiMission: (id: string) => void;
  approveAgiMission: (id: string) => void;
  pauseAgiMission: (id: string) => void;
  agiRecords: AgiRecord[];
  agiDemo: number;
  runAgiDemo: () => void;
  resetAgiDemo: () => void;
  agiHoldId: string | null;
  agiBooking: Record<string, unknown> | null;
  agiGuestOffer: string;
  setAgiGuestOffer: (id: string) => void;
  holdAgiOffer: () => void;
  confirmAgiGuest: (guest: string) => void;
};

const Ctx = createContext<Store | null>(null);
const KEY = "hotel24.session";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [invite, setInvite] = useState<InviteSession | null>(null);
  const [role, setRole] = useState<Role>("owner");
  const [theme, setThemeState] = useState<ThemeKey>("light");
  const [lang, setLangState] = useState<Lang>("en");
  const [propertyId, setPropertyId] = useState("baantalay");
  const [toast, setToast] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [navWidth, setNavWidthState] = useState(NAV_W_DEFAULT);
  const [search, setSearch] = useState("");
  const [aiMode, setAiModeState] = useState<AiMode>("recommend");
  const [recState, setRecState] = useState<Record<string, RecStatus>>({});
  const [rooms, setRooms] = useState<Room[]>(ROOMS_SEED);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [tm30Filed, setTm30] = useState(false);
  const [scanned, setScanned] = useState<Record<string, boolean>>({});
  const [thread, setThread] = useState(0);
  const [sent, setSent] = useState<Record<number, string[]>>({});
  const [mappings, setMappings] = useState<Mapping[]>(MAPPINGS_SEED);
  const [agodaRetry, setAgodaRetry] = useState(false);
  const [shieldClosed, setShieldClosed] = useState<Record<string, boolean>>({});
  const [audit, setAudit] = useState<AuditEvent[]>(AUDIT_SEED);
  const [walkInOpen, setWalkInOpen] = useState(false);
  const [newResOpen, setNewResOpen] = useState(false);
  const [benefits, setBenefits] = useState<Record<string, boolean>>({ b1: true, b2: true, b3: true, b4: false });
  const [assigned, setAssigned] = useState<Record<string, boolean>>({});
  const [calRange, setCalRange] = useState<"14" | "30" | "month">("14");
  const [switchSource, setSwitchSourceState] = useState<PmsSource>("cloudbeds");
  const [switchStatus, setSwitchStatus] = useState<SwitchStatus>("idle");
  const [switchStep, setSwitchStep] = useState(-1);
  const switchTimers = useRef<number[]>([]);
  const [selectedOta, setSelectedOta] = useState<OtaId>("booking");
  const [otaChannels, setOtaChannels] = useState<OtaChannel[]>(cloneChannels);
  const [roomMaps, setRoomMaps] = useState(cloneRoomMaps);
  const [rateMaps] = useState(cloneRateMaps);
  const [jobs, setJobs] = useState<SyncJob[]>(cloneQueue);
  const [inbound, setInbound] = useState<InboundRes[]>(cloneInbound);
  const [ari, setAri] = useState<Record<string, AriRow[]>>(cloneAri);
  const [invType, setInvType] = useState("garden");
  const [reconcile, setReconcile] = useState<"open" | "running" | "resolved">("open");
  const [tripActual, setTripActual] = useState(2);
  const [aiState, setAiState] = useState<Record<string, RecStatus>>({});
  const [allotment, setAllotment] = useState<Record<string, number>>(() =>
    Object.fromEntries(ALLOTMENT_SEED.map((a) => [a.id, a.rooms]))
  );
  const [collected, setCollected] = useState<Record<string, boolean>>({});
  const [agentReady, setAgentReadyState] = useState(true);
  const [agentBooks, setAgentBooks] = useState<Record<string, unknown>[]>([]);
  const [revLevel, setRevLevelState] = useState<RevLevel>(2);
  const [revState, setRevState] = useState<Record<string, RevStatus>>(() =>
    Object.fromEntries(REV_DECISIONS.filter((d) => d.risk === "blocked").map((d) => [d.id, "blocked" as RevStatus]))
  );
  const [revMeetingAt, setRevMeetingAt] = useState<string | null>(null);
  const [revSellLimit, setRevSellLimit] = useState<Record<string, number>>({});
  const [revOffers, setRevOffers] = useState<Record<string, boolean>>({});
  const [agiOn, setAgiOnState] = useState(false);
  const [agiPaused, setAgiPausedState] = useState(false);
  const [agiLevel, setAgiLevelState] = useState<AgiLevel>(1);
  const [agiConns, setAgiConns] = useState<Record<AgiBot, AgiConn>>({ grok: "off", claude: "off", chatgpt: "off" });
  const [agiMissions, setAgiMissions] = useState<Record<string, AgiMissionStatus>>({});
  const [agiRecords, setAgiRecords] = useState<AgiRecord[]>(AGI_RECORD_SEED);
  const [agiDemo, setAgiDemo] = useState(0);
  const [agiHoldId, setAgiHoldId] = useState<string | null>(null);
  const [agiBooking, setAgiBooking] = useState<Record<string, unknown> | null>(null);
  const [agiGuestOffer, setAgiGuestOffer] = useState("o-loft");
  const revStateRef = useRef<Record<string, RevStatus>>({});
  revStateRef.current = revState;
  const aiStateRef = useRef<Record<string, RecStatus>>({});
  aiStateRef.current = aiState;

  useEffect(() => {
    try {
      const sess = readInviteSession();
      if (sess) {
        setInvite(sess);
        setAuthed(true);
        setRole("owner");
      }
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as {
          authed?: boolean; role?: Role; theme?: string; lang?: Lang; propertyId?: string; aiMode?: AiMode;
          switchSource?: PmsSource; switchStatus?: SwitchStatus; agentReady?: boolean;
          agentBooks?: Record<string, unknown>[];
          revLevel?: RevLevel; revState?: Record<string, RevStatus>; revMeetingAt?: string | null;
          agiOn?: boolean; agiPaused?: boolean; agiLevel?: AgiLevel; agiConns?: Record<AgiBot, AgiConn>;
          navWidth?: number;
          viaInvite?: boolean;
        };
        if (!sess) {
          if (s.viaInvite) setAuthed(false);
          else if (s.authed) setAuthed(true);
          if (s.role) setRole(s.role);
        }
        if (s.theme) setThemeState(normalizeTheme(s.theme));
        if (s.lang === "th" || s.lang === "en") setLangState(s.lang);
        if (s.propertyId) setPropertyId(s.propertyId);
        if (s.aiMode) setAiModeState(s.aiMode);
        if (s.switchSource === "cloudbeds" || s.switchSource === "hotelier") setSwitchSourceState(s.switchSource);
        if (typeof s.agentReady === "boolean") setAgentReadyState(s.agentReady);
        if (Array.isArray(s.agentBooks)) setAgentBooks(s.agentBooks);
        if (s.revLevel === 0 || s.revLevel === 1 || s.revLevel === 2 || s.revLevel === 3) setRevLevelState(s.revLevel);
        if (s.revState && typeof s.revState === "object") setRevState(s.revState);
        if (typeof s.revMeetingAt === "string" || s.revMeetingAt === null) setRevMeetingAt(s.revMeetingAt ?? null);
        if (typeof s.agiOn === "boolean") setAgiOnState(s.agiOn);
        if (typeof s.agiPaused === "boolean") setAgiPausedState(s.agiPaused);
        if (s.agiLevel === 0 || s.agiLevel === 1 || s.agiLevel === 2) setAgiLevelState(s.agiLevel);
        if (s.agiConns && typeof s.agiConns === "object") setAgiConns((c) => ({ ...c, ...s.agiConns }));
        if (typeof s.navWidth === "number" && Number.isFinite(s.navWidth)) setNavWidthState(clampNavWidth(s.navWidth));
        if (s.switchStatus === "done") {
          setSwitchStatus("done");
          setSwitchStep(SWITCH_STEPS.length - 1);
        }
      }
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({
      authed, role, theme, lang, propertyId, aiMode, switchSource, switchStatus: switchStatus === "running" ? "idle" : switchStatus, agentReady, agentBooks,
      revLevel, revState, revMeetingAt, agiOn, agiPaused, agiLevel, agiConns, navWidth, viaInvite: !!invite,
    }));
  }, [ready, authed, role, theme, lang, propertyId, aiMode, switchSource, switchStatus, agentReady, agentBooks, revLevel, revState, revMeetingAt, agiOn, agiPaused, agiLevel, agiConns, navWidth, invite]);

  const flash = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const stamp = useCallback((who: string, what: string, kind: string) => {
    setAudit((a) => [{ t: "19 Aug 09:14", who, what, kind }, ...a]);
  }, []);

  const login = useCallback((r: Role, opts?: { invite?: boolean }) => {
    if (!opts?.invite) {
      clearInviteSession();
      setInvite(null);
    } else {
      setInvite(readInviteSession());
    }
    setRole(r);
    setAuthed(true);
  }, []);

  const logout = useCallback(() => {
    setAuthed(false);
    clearInviteSession();
    setInvite(null);
  }, []);

  const setTheme = useCallback((k: ThemeKey) => setThemeState(k), []);
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const setNavWidth = useCallback((n: number) => setNavWidthState(clampNavWidth(n)), []);

  const setAiMode = useCallback((m: AiMode) => {
    setAiModeState(m);
    if (m === "auto") {
      const next: Record<string, RecStatus> = {};
      RECS_SEED.forEach((r) => { next[r.id] = "applied"; });
      setRecState(next);
      stamp("AI Revenue Manager", "Auto-apply on — 3 rate changes pushed to 6 channels", "ai");
    }
  }, [stamp]);

  const applyRec = useCallback((id: string) => {
    setRecState((s) => ({ ...s, [id]: "applied" }));
    const rec = RECS_SEED.find((r) => r.id === id);
    stamp("som@baantalay", `Applied AI rec ${rec?.head ?? id} · pushed to 6 channels`, "manual");
    flash("Applied · queued ARI to connected OTAs via sync worker");
  }, [flash, stamp]);

  const dismissRec = useCallback((id: string) => {
    setRecState((s) => ({ ...s, [id]: "dismissed" }));
    flash("Dismissed · AI will not re-suggest today");
  }, [flash]);

  const advanceRoom = useCallback((no: string) => {
    setRooms((list) => list.map((r) => (r.no === no ? { ...r, s: (((r.s + 1) % 4) as HkStatus) } : r)));
    stamp("Housekeeping", `Room ${no} status advanced`, "manual");
  }, [stamp]);

  const checkIn = useCallback((id: string) => {
    setChecked((s) => ({ ...s, [id]: true }));
    const a = ARRIVALS_SEED.find((x) => x.id === id);
    stamp("front@baantalay", `Checked in ${a?.name ?? id} · ${a?.room ?? ""}`, "manual");
    flash("Checked in · TM30 queued");
  }, [flash, stamp]);

  const collectDue = useCallback((id: string) => {
    const a = ARRIVALS_SEED.find((x) => x.id === id);
    setCollected((s) => ({ ...s, [id]: true }));
    stamp("front@baantalay", `Collected ${a?.bal ?? "balance"} · PromptPay`, "manual");
    flash("Balance collected · PromptPay");
  }, [flash, stamp]);

  const fileTm30 = useCallback(() => {
    setTm30(true);
    stamp("HOTEL24 · Compliance", "Filed TM30 batch · ref TM30-2026-0819-014", "system");
    flash("TM30 batch filed · ref TM30-2026-0819-014");
  }, [flash, stamp]);

  const scanPassport = useCallback((id: string) => {
    setScanned((s) => ({ ...s, [id]: true }));
    flash("Passport captured · OCR queued for TM30");
  }, [flash]);

  const sendDraft = useCallback(() => {
    setSent((s) => {
      const draft = (["t1", "t2", "t3", "t4", "t5"] as const);
      void draft;
      return { ...s, [thread]: [...(s[thread] ?? []), "sent"] };
    });
    stamp("AI Guest Concierge", "Draft sent by staff", "ai");
    flash("Sent · logged in guest language");
  }, [flash, stamp, thread]);

  const patchOta = useCallback((id: OtaId, patch: Partial<OtaChannel>) => {
    setOtaChannels((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }, []);

  const fixLoftMapping = useCallback(() => {
    setMappings((list) =>
      list.map((m) =>
        m.id === "m5"
          ? { ...m, plan: "Family Loft — Standard / Breakfast", inv: "6", state: "Mapped" as const }
          : m
      )
    );
    setRoomMaps((list) => list.map((r) => (r.roomId === "loft" ? { ...r, expedia: "Family Loft" } : r)));
    setJobs((list) => list.map((j) => (j.id === "q5" ? { ...j, status: "complete" as const, age: "now", payload: "Family Loft → Expedia Family Loft", payloadTh: "แฟมิลี่ลอฟท์ → Expedia Family Loft" } : j)));
    patchOta("expedia", {
      roomsMapped: 5,
      inventory: true,
      health: 100,
      lastSync: "just now",
      note: "Family Loft mapped. Inventory controlled on all five types.",
      noteTh: "map แฟมิลี่ลอฟท์แล้ว ควบคุมห้องครบห้าประเภท",
    });
    setShieldClosed((s) => ({ ...s, s1: true }));
    stamp("HOTEL24 Mapping", activeConnector.mapRoom("loft", "expedia", "Family Loft"), "system");
    stamp("som@baantalay", "Mapped Family Loft → Expedia · Shield closed tonight", "manual");
    flash("Family Loft mapped · Overbooking Shield closed tonight");
  }, [flash, patchOta, stamp]);

  const forceAgoda = useCallback(() => {
    setAgodaRetry(true);
    setShieldClosed((s) => ({ ...s, s2: true }));
    setJobs((list) => list.map((j) => (j.id === "q1" ? { ...j, status: "complete" as const, attempts: j.attempts + 1, age: "1.4s" } : j)));
    patchOta("agoda", {
      status: "connected",
      health: 100,
      lastSync: "just now",
      pendingUpdates: 0,
      note: "ARI ack received. Rate pushes resumed.",
      noteTh: "ได้รับ ack แล้ว ดันราคาต่อได้",
    });
    stamp("HOTEL24 Sync", activeConnector.pushAvailability("garden", "20-25 Aug", 3), "system");
    stamp("HOTEL24 · Channel Manager", "Forced Agoda ARI re-push · ack 1.4s", "system");
    flash("Agoda ARI re-pushed · ack 1.4s");
  }, [flash, patchOta, stamp]);

  const closeShield = useCallback((id: string) => {
    setShieldClosed((s) => ({ ...s, [id]: true }));
  }, []);

  const addWalkIn = useCallback((guest: string, type: string) => {
    stamp("front@baantalay", `Walk-in ${guest} · ${type} · PromptPay`, "manual");
    setWalkInOpen(false);
    setNewResOpen(false);
    flash("Walk-in added to calendar");
  }, [flash, stamp]);

  const toggleBenefit = useCallback((id: string) => {
    setBenefits((s) => ({ ...s, [id]: !s[id] }));
  }, []);

  const autoAssign = useCallback(() => {
    setAssigned({ "Petrov, D.": true, "Novak, J.": true, "TAT fam trip": true });
    stamp("HOTEL24 PMS", "Auto-assigned 3 unmapped arrivals", "system");
    flash("3 reservations assigned");
  }, [flash, stamp]);

  const setSwitchSource = useCallback((s: PmsSource) => {
    if (switchStatus === "running") return;
    setSwitchSourceState(s);
  }, [switchStatus]);

  const resetSwitch = useCallback(() => {
    switchTimers.current.forEach((id) => window.clearTimeout(id));
    switchTimers.current = [];
    setSwitchStatus("idle");
    setSwitchStep(-1);
    stamp("HOTEL24 Switch", "Reset switch — source PMS still archived", "system");
  }, [stamp]);

  const startSwitch = useCallback(() => {
    if (switchStatus === "running") return;
    switchTimers.current.forEach((id) => window.clearTimeout(id));
    switchTimers.current = [];
    setSwitchStatus("running");
    setSwitchStep(-1);
    const src = PMS_SOURCES[switchSource];
    stamp("HOTEL24 Switch", `Started one-button move from ${src.name} · ${src.propertyId}`, "system");
    flash(`Connecting to ${src.name}…`);
    SWITCH_STEPS.forEach((step, i) => {
      const id = window.setTimeout(() => {
        setSwitchStep(i);
        stamp("HOTEL24 Switch", step.audit, "system");
        if (i === SWITCH_STEPS.length - 1) {
          setSwitchStatus("done");
          stamp("HOTEL24 Sync", activeConnector.createProperty("baantalay"), "system");
          stamp("HOTEL24 Sync", "Cut over: Booking.com · Agoda · Expedia write from HOTEL24", "system");
          flash(`${src.name} cut over. HOTEL24 is the system of record.`);
        }
      }, 780 * (i + 1));
      switchTimers.current.push(id);
    });
  }, [flash, stamp, switchSource, switchStatus]);

  const connectChannel = useCallback((id: OtaId) => {
    stamp("HOTEL24 Sync", activeConnector.connectChannel(id), "system");
    if (id === "trip") {
      patchOta("trip", {
        status: "connected",
        health: 94,
        lastSync: "just now",
        roomsMapped: 4,
        ratesMapped: 3,
        inventory: true,
        rates: true,
        restrictions: true,
        reservations: true,
        lastBooking: "—",
        lastBookingAt: "awaiting first booking",
        pendingUpdates: 3,
        note: "Connected. Reconciliation still shows availability 2 vs HOTEL24 3.",
        noteTh: "เชื่อมแล้ว Reconciliation ยังเห็นว่าง 2 ขณะที่ HOTEL24 เป็น 3",
      });
      flash("Trip.com connected. Run reconciliation — availability still off by 1.");
      return;
    }
    patchOta(id, {
      status: "connected",
      health: 100,
      lastSync: "just now",
      roomsMapped: 5,
      ratesMapped: 4,
      inventory: true,
      rates: true,
      restrictions: true,
      reservations: true,
      note: "Connected through HOTEL24. The hotel does not log into the provider.",
      noteTh: "เชื่อมผ่าน HOTEL24 โรงแรมไม่ต้องเข้าไปที่ผู้ให้บริการ",
    });
    flash(`${id} connected. Mapping drafted from the HOTEL24 master.`);
  }, [flash, patchOta, stamp]);

  const syncNow = useCallback((id: OtaId) => {
    const ch = otaChannels.find((c) => c.id === id);
    stamp("HOTEL24 Sync", activeConnector.getSyncStatus(id), "system");
    if (id === "agoda" && (ch?.pendingUpdates ?? 0) > 0) {
      forceAgoda();
      return;
    }
    patchOta(id, { lastSync: "just now", health: ch?.status === "connected" ? 100 : ch?.health });
    flash(`Sync sent for ${ch?.name ?? id}.`);
  }, [forceAgoda, otaChannels, patchOta, stamp]);

  const pauseAgoda = useCallback(() => {
    patchOta("agoda", {
      status: "paused",
      note: "HOTEL24 paused extra rate changes and is retrying the stale ARI push.",
      noteTh: "HOTEL24 หยุดดันราคาเพิ่ม และกำลัง retry ARI ที่ค้าง",
    });
    stamp("HOTEL24 Sync", "Agoda inventory stale 12 min — paused additional rate pushes, retrying", "system");
    flash("Agoda paused. Retrying the queued ARI push.");
  }, [patchOta, stamp, flash]);

  const pushAri = useCallback(() => {
    const rows = ari[invType] ?? [];
    const first = rows[0];
    if (first) {
      stamp("HOTEL24 Sync", activeConnector.pushAvailability(invType, first.date, first.avail), "system");
      stamp("HOTEL24 Sync", activeConnector.pushRates(invType, first.date, first.rate), "system");
      stamp("HOTEL24 Sync", activeConnector.pushRestrictions(invType, first.date, first.minStay, first.cta, first.ctd, first.stop), "system");
    }
    setJobs((list) => [
      {
        id: `q-ari-${Date.now()}`,
        kind: "ARI",
        channel: "All connected OTAs",
        payload: `${invType} ARI batched to connected channels`,
        payloadTh: `ARI ${invType} ส่งชุดไปช่องทางที่เชื่อมแล้ว`,
        status: "complete",
        attempts: 1,
        age: "now",
      },
      ...list,
    ]);
    setOtaChannels((list) =>
      list.map((c) =>
        c.status === "connected"
          ? { ...c, lastSync: "just now", pendingUpdates: c.id === "agoda" && !agodaRetry ? c.pendingUpdates : 0 }
          : c
      )
    );
    flash("ARI queued through the sync worker — not sent from the browser.");
  }, [agodaRetry, ari, flash, invType, stamp]);

  const retryJob = useCallback((id: string) => {
    if (id === "q1") {
      forceAgoda();
      return;
    }
    if (id === "q5") {
      fixLoftMapping();
      return;
    }
    setJobs((list) => list.map((j) => (j.id === id ? { ...j, status: "complete" as const, attempts: j.attempts + 1, age: "now" } : j)));
    flash("Job retried.");
  }, [fixLoftMapping, flash, forceAgoda]);

  const receiveWebhook = useCallback(() => {
    if (inbound.some((r) => r.id === WEBHOOK_NEW.id)) {
      flash("Agoda webhook already applied.");
      return;
    }
    stamp("HOTEL24 Sync", activeConnector.getReservation(WEBHOOK_NEW.otaId), "system");
    stamp("HOTEL24 Sync", activeConnector.acknowledgeReservation(WEBHOOK_NEW.otaId), "system");
    setInbound((list) => [WEBHOOK_NEW, ...list]);
    setAri((grid) => ({
      ...grid,
      garden: (grid.garden ?? []).map((r) =>
        r.date === "24 Aug" || r.date === "25 Aug"
          ? { ...r, occupied: r.occupied + 1, avail: Math.max(0, r.avail - 1) }
          : r
      ),
    }));
    setJobs((list) => [
      {
        id: `q-res-${WEBHOOK_NEW.id}`,
        kind: "RES",
        channel: "Agoda",
        payload: `NEW ${WEBHOOK_NEW.otaId} ${WEBHOOK_NEW.guest}`,
        payloadTh: `จองใหม่ ${WEBHOOK_NEW.otaId} ${WEBHOOK_NEW.guest}`,
        status: "complete",
        attempts: 1,
        age: "now",
      },
      {
        id: `q-ari-${WEBHOOK_NEW.id}`,
        kind: "ARI",
        channel: "All connected OTAs",
        payload: "Garden Deluxe 24–25 Aug availability −1",
        payloadTh: "ดีลักซ์สวน 24–25 ส.ค. ว่าง −1",
        status: "complete",
        attempts: 1,
        age: "now",
      },
      ...list,
    ]);
    patchOta("agoda", { lastBooking: WEBHOOK_NEW.otaId, lastBookingAt: "just now", lastSync: "just now" });
    flash("Agoda booking received. Inventory reduced. New availability pushed to every OTA.");
  }, [flash, inbound, patchOta, stamp]);

  const applyModification = useCallback(() => {
    setInbound((list) =>
      list.map((r) =>
        r.id === "H24-8833"
          ? {
              ...r,
              event: "MODIFIED" as const,
              checkOut: "23 Aug",
              price: 17000,
              status: "Stay extended 20–23 Aug · inventory recalculated",
              statusTh: "ยืดเข้าพัก 20–23 ส.ค. · คำนวณห้องใหม่",
            }
          : r
      )
    );
    setAri((grid) => ({
      ...grid,
      loft: (grid.loft ?? []).map((r) =>
        r.date === "22 Aug" ? { ...r, occupied: Math.min(r.total, r.occupied + 1), avail: Math.max(0, r.avail - 1) } : r
      ),
    }));
    stamp("HOTEL24 Sync", "MODIFIED BK-8833104 Weber 20–22 Aug → 20–23 Aug", "system");
    flash("Modification applied. Calendar and ARI updated. Availability re-pushed.");
  }, [flash, stamp]);

  const applyCancellation = useCallback(() => {
    setInbound((list) =>
      list.map((r) =>
        r.id === "H24-8860"
          ? {
              ...r,
              event: "CANCELLED" as const,
              status: "Cancelled · inventory restored · ARI pushed",
              statusTh: "ยกเลิก · คืนห้อง · ดัน ARI แล้ว",
            }
          : r
      )
    );
    setAri((grid) => ({
      ...grid,
      pool: (grid.pool ?? []).map((r) =>
        r.date === "19 Aug" || r.date === "20 Aug"
          ? { ...r, occupied: Math.max(0, r.occupied - 1), avail: r.avail + 1 }
          : r
      ),
    }));
    stamp("HOTEL24 Sync", "CANCELLED AG-441902 Lim · inventory restored", "system");
    flash("Cancellation applied. Rooms returned. All OTAs received new availability.");
  }, [flash, stamp]);

  const runReconcile = useCallback(() => {
    setReconcile("running");
    stamp("HOTEL24 Sync", "Reconciliation pass: Deluxe 20 Aug expected=3 Trip.com actual=2", "system");
    window.setTimeout(() => {
      setTripActual(3);
      setReconcile("resolved");
      setJobs((list) => list.map((j) => (j.id === "q4" ? { ...j, status: "complete" as const, age: "now", payload: "Trip.com availability forced to 3", payloadTh: "บังคับ Trip.com ว่าง = 3" } : j)));
      patchOta("trip", {
        health: 100,
        lastSync: "just now",
        pendingUpdates: 0,
        note: "Mismatch resolved. Trip.com availability matches HOTEL24.",
        noteTh: "แก้ความไม่ตรงแล้ว Trip.com ว่างตรงกับ HOTEL24",
      });
      stamp("HOTEL24 Sync", activeConnector.pushAvailability("garden", "20 Aug", 3), "system");
      flash("Mismatch on Trip.com auto-resynced. Recheck passed.");
    }, 900);
  }, [patchOta, stamp, flash]);

  const markAi = useCallback((id: string) => {
    const action = AI_ACTIONS.find((a) => a.id === id);
    if (!action) return [] as string[];
    if (aiStateRef.current[id] === "applied") return [];
    const ids = AI_ACTIONS.filter((a) => a.effect === action.effect).map((a) => a.id);
    setAiState((s) => {
      const next = { ...s };
      ids.forEach((i) => { next[i] = "applied"; });
      return next;
    });
    return ids;
  }, []);

  const applyAi = useCallback((id: string) => {
    const action = AI_ACTIONS.find((a) => a.id === id);
    if (!action) return;
    if (aiStateRef.current[id] === "applied" || aiStateRef.current[id] === "dismissed") return;
    const marked = markAi(id);
    if (!marked.length) return;

    switch (action.effect) {
      case "fix-loft":
        fixLoftMapping();
        break;
      case "force-agoda":
        forceAgoda();
        break;
      case "collect-unpaid":
        collectDue("a2");
        collectDue("a4");
        break;
      case "hk-priority":
        setRooms((list) => list.map((r) =>
          r.no === "104" || r.no === "207" || r.no === "311" || r.no === "V2"
            ? { ...r, s: r.s === 0 ? 1 : r.s, staff: r.staff || "มาลี", note: "GM: priority arrival · cleaning" }
            : r
        ));
        stamp("AI General Manager", "Pushed 104, 207, 311, V2 to Cleaning before 14:00 arrivals", "ai");
        flash("Four rooms pushed to Cleaning");
        break;
      case "file-tm30":
        scanPassport("tm2");
        scanPassport("tm3");
        fileTm30();
        break;
      case "move-209":
        setRooms((list) => list.map((r) => {
          if (r.no === "209") return { ...r, s: 0 as HkStatus, note: "OOO aircon · guest moved to 301", staff: "ช่าง" };
          if (r.no === "301") return { ...r, note: "Assigned · move from 209", s: 3 as HkStatus };
          return r;
        }));
        stamp("AI General Manager", "Moved in-house guest 209 → 301 · aircon OOO · no refund", "ai");
        flash("Guest moved to 301. 209 closed for maintenance.");
        break;
      case "ack-cash":
        stamp("AI General Manager", "Cash short ฿1,200 on 18 Aug kept open on Finance — not written off", "ai");
        flash("Cash exception stays open on Finance");
        break;
      case "apply-r1":
        applyRec("r1");
        setAri((grid) => ({
          ...grid,
          garden: (grid.garden ?? []).map((r) =>
            r.date === "22 Aug" || r.date === "23 Aug" ? { ...r, rate: 2550 } : r
          ),
        }));
        setJobs((list) => [
          { id: `q-ap-r1-${Date.now()}`, kind: "ARI", channel: "All connected OTAs", payload: "Garden Deluxe Sat–Sun BAR ฿2,550", payloadTh: "ดีลักซ์สวน สุดสัปดาห์ BAR ฿2,550", status: "complete", attempts: 1, age: "now" },
          ...list,
        ]);
        break;
      case "apply-r2":
        applyRec("r2");
        setAri((grid) => ({
          ...grid,
          pool: (grid.pool ?? []).map((r) =>
            r.date === "24 Aug" || r.date === "25 Aug" ? { ...r, minStay: 2 } : r
          ),
        }));
        break;
      case "apply-r3":
        applyRec("r3");
        setAri((grid) => ({
          ...grid,
          suite: (grid.suite ?? []).map((r) => (r.date === "19 Aug" ? { ...r, rate: 3784 } : r)),
        }));
        break;
      case "alloc-direct":
        setAllotment((s) => ({
          ...s,
          agoda: Math.max(0, (s.agoda ?? 12) - 4),
          direct: (s.direct ?? 14) + 4,
        }));
        stamp("Revenue Autopilot", "Allotment: Agoda 12→8, Direct 14→18 on Garden · net/night Agoda ฿751 worse", "ai");
        setJobs((list) => [
          { id: `q-alloc-${Date.now()}`, kind: "ARI", channel: "Agoda + Direct", payload: "Garden stop-sell 4 rooms on Agoda · held for Direct", payloadTh: "สวน ปิดขาย 4 ห้องบน Agoda · กันให้จองตรง", status: "complete", attempts: 1, age: "now" },
          ...list,
        ]);
        flash("Four Garden rooms held for Direct. Agoda allotment cut.");
        break;
      case "send-transfer":
        setSent((s) => ({ ...s, 0: [...(s[0] ?? []), "sent"] }));
        stamp("AI Guest Agent", "Confirmed Krabi airport transfer 14:00 · ฿800 on folio H24-8841", "ai");
        flash("Transfer confirmed · LINE sent in Thai");
        break;
      case "early-checkin":
        stamp("AI Guest Agent", "Held room 101 from 11:00 for Müller · free early check-in", "ai");
        flash("Room 101 held from 11:00");
        break;
      case "apply-mod":
        applyModification();
        break;
      case "webhook-new":
        receiveWebhook();
        break;
      case "run-reconcile":
        runReconcile();
        break;
      case "merge-dup":
        stamp("AI OTA Reconciliation", "Merged Cloudbeds 7F92A1 into H24-8802 Müller · one room-night", "ai");
        flash("Duplicate Müller merged. H24-8802 is the record.");
        break;
      case "staff-brief":
        stamp("Reputation → Ops", "F&B briefing: +2 staff 08:00–09:30 while occupancy > 75%", "ai");
        flash("Breakfast staffing brief sent to F&B lead");
        break;
      case "hk-102":
        setRooms((list) => list.map((r) =>
          r.no === "102" ? { ...r, note: "No vacuum after 21:00 when 101 occupied" } : r
        ));
        stamp("Reputation → Ops", "HK rule: 102 no late vacuum adjacent to 101", "ai");
        flash("Housekeeping rule added on 102");
        break;
      case "send-reply":
        stamp("Reputation → Ops", "Queued public replies EN/TH for Google 2★, Agoda 3★, Booking.com 3★ — no refund in public", "ai");
        flash("Three public replies queued for owner edit");
        break;
      case "tag-finance":
        stamp("AI Migration Agent", "Tagged 2 hotel-collect rates with missing tax split for Finance", "ai");
        flash("Finance tagged. Cut-over is not blocked.");
        break;
      case "start-switch":
        startSwitch();
        break;
    }
  }, [
    applyModification, applyRec, collectDue, fileTm30, fixLoftMapping, flash,
    forceAgoda, markAi, receiveWebhook, runReconcile, scanPassport, stamp, startSwitch,
  ]);

  const dismissAi = useCallback((id: string) => {
    setAiState((s) => ({ ...s, [id]: "dismissed" }));
    flash("Dismissed · AI will not re-suggest today");
  }, [flash]);

  const applyEngine = useCallback((engine: AiEngine) => {
    AI_ACTIONS.filter((a) => (engine === "brief" ? a.brief : a.engine === engine)).forEach((a) => applyAi(a.id));
  }, [applyAi]);

  const applyHigh = useCallback(() => {
    AI_ACTIONS.filter((a) => a.sev === "High").forEach((a) => applyAi(a.id));
  }, [applyAi]);

  useEffect(() => {
    if (aiMode !== "auto") return;
    AI_ACTIONS.filter((a) => a.engine === "autopilot").forEach((a) => applyAi(a.id));
  }, [aiMode, applyAi]);

  const setAgentReady = useCallback((v: boolean) => {
    setAgentReadyState(v);
    stamp("HOTEL24 Agent Direct", v ? "Published hotel24.json — AI Agent Ready" : "Unpublished from the Agent Gateway", "system");
    flash(v ? "AI Agent Ready · identity is live" : "Unpublished from the Agent Gateway");
  }, [flash, stamp]);

  const setRevLevel = useCallback((n: RevLevel) => {
    setRevLevelState(n);
    stamp("RevenueOS", `Autonomy set to L${n} — ${n < 2 ? "human approves writes" : "Guardian-bound auto-execute"}`, "system");
    flash(n < 2 ? `RevenueOS L${n} · insight / assisted` : `RevenueOS L${n} · Guardian is the brake`);
  }, [flash, stamp]);

  const applyRev = useCallback((id: string) => {
    const d = REV_DECISIONS.find((x) => x.id === id);
    if (!d) return;
    const cur = revStateRef.current[id] ?? (d.risk === "blocked" ? "blocked" : "pending");
    if (cur === "applied" || cur === "dismissed" || cur === "blocked") return;
    const gate = guardDecision(d);
    if (!gate.ok) {
      setRevState((s) => ({ ...s, [id]: "blocked" }));
      stamp("Revenue Guardian", `Blocked ${d.no} · ${gate.reason}`, "ai");
      flash("Guardian blocked a write. Nothing reached ARI.");
      return;
    }
    if (revLevel === 0) {
      flash("L0 Insight — Director recorded the recommendation. Nothing written.");
      stamp("Revenue Director AI", `${d.no} noted at L0 · no ARI write`, "ai");
      return;
    }
    setRevState((s) => ({ ...s, [id]: "applied" }));
    const w = d.write;
    if (w.kind === "rate") {
      setAri((grid) => ({
        ...grid,
        [w.room]: (grid[w.room] ?? []).map((r) => (w.dates.includes(r.date) ? { ...r, rate: w.rate } : r)),
      }));
      setJobs((list) => [
        { id: `q-ros-${id}-${Date.now()}`, kind: "ARI", channel: "All connected OTAs", payload: `${d.does}`, payloadTh: d.doesTh, status: "complete", attempts: 1, age: "now" },
        ...list,
      ]);
    } else if (w.kind === "minStay") {
      setAri((grid) => ({
        ...grid,
        [w.room]: (grid[w.room] ?? []).map((r) => (w.dates.includes(r.date) ? { ...r, minStay: w.minStay } : r)),
      }));
      setJobs((list) => [
        { id: `q-ros-${id}-${Date.now()}`, kind: "ARI", channel: "All connected OTAs", payload: d.does, payloadTh: d.doesTh, status: "complete", attempts: 1, age: "now" },
        ...list,
      ]);
    } else if (w.kind === "allot") {
      setAllotment((s) => ({
        ...s,
        [w.from]: Math.max(0, (s[w.from] ?? 0) - w.rooms),
        [w.to]: (s[w.to] ?? 0) + w.rooms,
      }));
      setJobs((list) => [
        { id: `q-ros-${id}-${Date.now()}`, kind: "ARI", channel: "Expedia + Direct", payload: d.does, payloadTh: d.doesTh, status: "complete", attempts: 1, age: "now" },
        ...list,
      ]);
    } else if (w.kind === "benefit") {
      setBenefits((s) => ({ ...s, [w.id]: true }));
    } else if (w.kind === "overbook") {
      setRevSellLimit((s) => ({ ...s, [w.date]: w.sellLimit }));
      setJobs((list) => [
        { id: `q-ros-${id}-${Date.now()}`, kind: "ARI", channel: "All connected OTAs", payload: d.does, payloadTh: d.doesTh, status: "complete", attempts: 1, age: "now" },
        ...list,
      ]);
    } else if (w.kind === "offer") {
      setRevOffers((s) => ({ ...s, [w.id]: true }));
      setJobs((list) => [
        { id: `q-ros-${id}-${Date.now()}`, kind: "RES", channel: "Agent Direct", payload: d.does, payloadTh: d.doesTh, status: "complete", attempts: 1, age: "now" },
        ...list,
      ]);
    }
    stamp("Revenue Director AI", `${d.no} executed · expected +฿${d.expected.toLocaleString()} · ${d.engines.join(" → ")}`, "ai");
    flash(`${d.no} written · Guardian passed · expected +฿${d.expected.toLocaleString()}`);
  }, [flash, revLevel, stamp]);

  const dismissRev = useCallback((id: string) => {
    setRevState((s) => ({ ...s, [id]: "dismissed" }));
    flash("Dismissed · Director will not re-open this write today");
  }, [flash]);

  const applyRevOpen = useCallback(() => {
    pendingRev(revStateRef.current).forEach((d) => applyRev(d.id));
  }, [applyRev]);

  const runRevMeeting = useCallback(() => {
    setRevMeetingAt("20 Aug 07:12");
    stamp("Revenue Director AI", "Morning revenue meeting closed. Phase 1 + Phase 2 writes in scope. Suite ฿500 and sell limit 52 blocked.", "ai");
    if (revLevel >= 2) {
      pendingRev(revStateRef.current).forEach((d) => applyRev(d.id));
      flash("Morning meeting done. Guardrailed writes went to ARI. ฿500 and sell 52 never left the room.");
    } else {
      flash("Morning meeting recorded. L0/L1 — approve each write yourself.");
    }
  }, [applyRev, flash, revLevel, stamp]);

  const noteAgi = useCallback((rec: Omit<AgiRecord, "id" | "t">) => {
    setAgiRecords((list) => [
      { ...rec, id: `ar-${Date.now().toString(36)}`, t: "19 Aug 09:14" },
      ...list,
    ]);
  }, []);

  const setAgiOn = useCallback((v: boolean) => {
    setAgiOnState(v);
    if (!v) {
      setAgiPausedState(false);
      setAgiMissions((s) => Object.fromEntries(Object.entries(s).map(([k, st]) => [k, st === "done" ? st : "paused"])));
      stamp("AGI Mode", "Off. External agents cannot act. Normal AI still proposes inside HOTEL24.", "system");
      flash("AGI Mode off · normal AI unchanged");
    } else {
      stamp("AGI Mode", "On. Authorised agents may receive an objective. HOTEL24 still commits.", "system");
      flash("AGI Mode on · a separate layer from recommend / auto");
    }
  }, [flash, stamp]);

  const setAgiPaused = useCallback((v: boolean) => {
    setAgiPausedState(v);
    stamp("AGI Mode", v ? "Paused — revoke in force. No agent may write." : "Resume — limits still apply.", "system");
    flash(v ? "AGI Mode paused" : "AGI Mode resumed");
  }, [flash, stamp]);

  const setAgiLevel = useCallback((n: AgiLevel) => {
    setAgiLevelState(n);
    stamp("AGI Mode", `Autonomy A${n} — ${n === 0 ? "analyse only" : n === 1 ? "prepare for approval" : "execute within limits"}`, "system");
    flash(n < 2 ? `AGI A${n} · HOTEL24 will not auto-commit` : "AGI A2 · floor ฿2,200 and promo ฿10,000 still bind");
  }, [flash, stamp]);

  const setAgiConn = useCallback((id: AgiBot, s: AgiConn) => {
    setAgiConns((c) => ({ ...c, [id]: s }));
    stamp("AGI Mode", `${id} set to ${s}`, "system");
    flash(`${id} · ${s}`);
  }, [flash, stamp]);

  const testAgiBot = useCallback((id: AgiBot) => {
    if (!agiOn) {
      flash("Turn AGI Mode on before testing a bot");
      return;
    }
    setAgiConns((c) => ({ ...c, [id]: "testing" }));
    window.setTimeout(() => {
      setAgiConns((c) => ({ ...c, [id]: "live" }));
      noteAgi({
        bot: id,
        kind: "action",
        en: `${id} connector test passed. MCP handshake mapped — not a certified store listing.`,
        th: `ทดสอบคอนเนกเตอร์ ${id} ผ่านแล้ว จับมือ MCP ถูกแมป — ยังไม่ใช่ลิสต์ร้านค้าที่รับรอง`,
        observed: true,
      });
      flash(`${id} live · HOTEL24 enforces permissions`);
    }, 700);
  }, [agiOn, flash, noteAgi]);

  const runAgiMission = useCallback((id: string) => {
    if (!agiOn || agiPaused) {
      flash("AGI Mode must be on and not paused");
      return;
    }
    const m = AGI_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    if (agiConns[m.bot] !== "live") {
      flash(`Connect ${m.bot} first`);
      return;
    }
    const next: AgiMissionStatus = agiLevel >= 2 ? "running" : "awaiting";
    setAgiMissions((s) => ({ ...s, [id]: next }));
    noteAgi({
      bot: m.bot,
      missionId: id,
      kind: "plan",
      en: `${m.en}: ${m.objective}`,
      th: `${m.th}: ${m.objectiveTh}`,
      observed: true,
    });
    stamp("AGI Mode", `${m.bot} received mission ${id} · ${next}`, "ai");
    flash(next === "running" ? `${m.bot} is running the mission` : `${m.bot} prepared the mission · approve to write`);
  }, [agiConns, agiLevel, agiOn, agiPaused, flash, noteAgi, stamp]);

  const approveAgiMission = useCallback((id: string) => {
    const m = AGI_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    setAgiMissions((s) => ({ ...s, [id]: "done" }));
    noteAgi({
      bot: "hotel24",
      missionId: id,
      kind: "approval",
      en: `Owner approved ${m.en}. HOTEL24 committed within floor ฿${AGI_RULES.floorThb.toLocaleString()} and promo ฿${AGI_RULES.promoCapThb.toLocaleString()}. Cancellation policy was not changed.`,
      th: `เจ้าของอนุมัติ ${m.th} HOTEL24 ลงในราคาพื้น ฿${AGI_RULES.floorThb.toLocaleString()} และงบโปร ฿${AGI_RULES.promoCapThb.toLocaleString()} ไม่ได้เปลี่ยนนโยบายยกเลิก`,
      observed: true,
    });
    if (id === "m-rev") {
      setAri((grid) => ({
        ...grid,
        garden: (grid.garden ?? []).map((r) =>
          r.date === "24 Aug" || r.date === "25 Aug" || r.date === "26 Aug" || r.date === "27 Aug"
            ? { ...r, rate: Math.max(AGI_RULES.floorThb, r.rate) }
            : r
        ),
      }));
    }
    stamp("AGI Mode", `Mission ${id} approved · HOTEL24 wrote`, "manual");
    flash("Mission committed · HOTEL24 is the writer");
  }, [flash, noteAgi, stamp]);

  const pauseAgiMission = useCallback((id: string) => {
    setAgiMissions((s) => ({ ...s, [id]: "paused" }));
    flash("Mission paused");
  }, [flash]);

  const runAgiDemo = useCallback(() => {
    if (!agiOn) {
      setAgiOnState(true);
    }
    setAgiPausedState(false);
    setAgiConns((c) => ({ ...c, grok: "live", chatgpt: "live" }));
    setAgiMissions((s) => ({ ...s, "m-rev": agiLevel >= 2 ? "running" : "awaiting" }));
    noteAgi({
      bot: "grok",
      missionId: "m-rev",
      kind: "plan",
      en: "Grok: weekday recovery. BAR stays ≥ ฿2,200. Promo ฿8,000 of ฿10,000. Cancellation policy not touched — owner must ask.",
      th: "Grok: กู้กลางสัปดาห์ BAR ไม่ต่ำกว่า ฿2,200 โปร ฿8,000 จาก ฿10,000 ไม่แตะนโยบายยกเลิก — ต้องถามเจ้าของ",
      observed: true,
    });
    setAgiDemo(3);
    stamp("AGI Mode", "Sales demo: Grok revenue mission armed. Waiting for traveller ChatGPT.", "ai");
    flash("Grok is on the revenue mission");
  }, [agiLevel, agiOn, flash, noteAgi, stamp]);

  const resetAgiDemo = useCallback(() => {
    setAgiDemo(0);
    setAgiHoldId(null);
    setAgiBooking(null);
    flash("Demo reset");
  }, [flash]);

  const receiveAgentBooking = useCallback((booking: Record<string, unknown>) => {
    setAgentBooks((list) => [booking, ...list]);
    const id = String(booking.bookingId || `H24-AG-${Date.now()}`);
    setInbound((list) => [
      {
        id,
        otaId: String(booking.holdId || id),
        channel: "HOTEL24 Agent Direct",
        event: "NEW",
        guest: String(booking.guest || "AI traveler"),
        room: String(booking.room || "Garden Deluxe"),
        rate: "Direct",
        checkIn: String(booking.checkIn || "22 Aug"),
        checkOut: String(booking.checkOut || "23 Aug"),
        price: Number(booking.total) || 0,
        tax: Number(booking.tax) || 0,
        commission: 0,
        pay: "Pay at Hotel",
        status: "Agent Direct · hotel owns the guest · PromptPay",
        statusTh: "Agent Direct · โรงแรมเป็นเจ้าของแขก · PromptPay",
      },
      ...list,
    ]);
    stamp("HOTEL24 Agent Gateway", `Direct booking ${id} · ${String(booking.guest)} · commission ฿0 · OTA not involved`, "system");
  }, [stamp]);

  const holdAgiOffer = useCallback(() => {
    if (!agiOn) {
      flash("Turn AGI Mode on");
      return;
    }
    const holdId = `HOLD-AGI-${Date.now().toString(36).toUpperCase()}`;
    setAgiHoldId(holdId);
    noteAgi({
      bot: "chatgpt",
      kind: "action",
      en: `Guest ChatGPT held ${agiGuestOffer} for 10 minutes. Duplicate-booking lock on.`,
      th: `ChatGPT ของแขกกัน ${agiGuestOffer} 10 นาที ล็อกกันจองซ้ำ`,
      observed: true,
    });
    flash("Hold 10 minutes · no charge");
  }, [agiGuestOffer, agiOn, flash, noteAgi]);

  const confirmAgiGuest = useCallback((guest: string) => {
    if (!agiHoldId) {
      flash("Hold first");
      return;
    }
    const booking = {
      bookingId: `H24-AGI-${Date.now().toString(36).toUpperCase()}`,
      holdId: agiHoldId,
      guest: guest || "ChatGPT traveller",
      hotel: "Baan Talay Boutique Resort",
      room: agiGuestOffer === "o-two" ? "Garden Deluxe × 2" : "Family Loft",
      total: agiGuestOffer === "o-two" ? 11040 : 9120,
      tax: 0,
      checkIn: "24 Aug",
      checkOut: "26 Aug",
      commission: 0,
    };
    setAgiBooking(booking);
    receiveAgentBooking(booking);
    noteAgi({
      bot: "hotel24",
      kind: "result",
      en: `Reservation ${booking.bookingId} confirmed. Merchant of record: the hotel. ChatGPT shopped. HOTEL24 validated inventory and price.`,
      th: `ยืนยันจอง ${booking.bookingId} ผู้ค้าตามกฎหมายคือโรงแรม ChatGPT เลือกของ HOTEL24 ตรวจห้องและราคา`,
      observed: true,
    });
    setAgiDemo(7);
    flash("Guest booking confirmed · hotel owns the guest");
  }, [agiGuestOffer, agiHoldId, flash, noteAgi, receiveAgentBooking]);

  const themeVars = THEMES[theme].vars as unknown as Record<string, string>;

  const value = useMemo<Store>(
    () => ({
      ready, authed, login, logout, invite, role,
      theme, setTheme, themeVars, lang, setLang,
      propertyId, setPropertyId, toast, flash, navOpen, setNavOpen, navWidth, setNavWidth,
      search, setSearch, aiMode, setAiMode, recState, applyRec, dismissRec,
      rooms, advanceRoom, checked, checkIn, collectDue, tm30Filed, fileTm30,
      scanned, scanPassport, thread, setThread, sent, sendDraft,
      mappings, fixLoftMapping, agodaRetry, forceAgoda, shieldClosed, closeShield,
      audit, walkInOpen, setWalkInOpen, newResOpen, setNewResOpen, addWalkIn,
      benefits, toggleBenefit, assigned, autoAssign, calRange, setCalRange,
      switchSource, setSwitchSource, switchStatus, switchStep, startSwitch, resetSwitch,
      selectedOta, setSelectedOta, otaChannels, roomMaps, rateMaps, jobs, inbound, ari,
      invType, setInvType, reconcile, tripActual, connectChannel, syncNow, pauseAgoda,
      pushAri, retryJob, receiveWebhook, applyModification, applyCancellation, runReconcile,
      aiState, applyAi, dismissAi, applyEngine, applyHigh, allotment, collected,
      agentReady, setAgentReady, agentBooks, receiveAgentBooking,
      revLevel, setRevLevel, revState, applyRev, dismissRev, applyRevOpen, revMeetingAt, runRevMeeting,
      revSellLimit, revOffers,
      agiOn, setAgiOn, agiPaused, setAgiPaused, agiLevel, setAgiLevel, agiConns, testAgiBot, setAgiConn,
      agiMissions, runAgiMission, approveAgiMission, pauseAgiMission, agiRecords, agiDemo, runAgiDemo, resetAgiDemo,
      agiHoldId, agiBooking, agiGuestOffer, setAgiGuestOffer, holdAgiOffer, confirmAgiGuest,
    }),
    [
      ready, authed, login, logout, invite, role, theme, setTheme, themeVars, lang, setLang,
      propertyId, toast, flash, navOpen, navWidth, setNavWidth, search, aiMode, setAiMode, recState, applyRec, dismissRec,
      rooms, advanceRoom, checked, checkIn, collectDue, tm30Filed, fileTm30, scanned, scanPassport,
      thread, sent, sendDraft, mappings, fixLoftMapping, agodaRetry, forceAgoda, shieldClosed, closeShield,
      audit, walkInOpen, newResOpen, addWalkIn, benefits, toggleBenefit, assigned, autoAssign, calRange,
      switchSource, setSwitchSource, switchStatus, switchStep, startSwitch, resetSwitch,
      selectedOta, otaChannels, roomMaps, rateMaps, jobs, inbound, ari, invType, reconcile, tripActual,
      connectChannel, syncNow, pauseAgoda, pushAri, retryJob, receiveWebhook, applyModification,
      applyCancellation, runReconcile, aiState, applyAi, dismissAi, applyEngine, applyHigh, allotment, collected,
      agentReady, setAgentReady, agentBooks, receiveAgentBooking,
      revLevel, setRevLevel, revState, applyRev, dismissRev, applyRevOpen, revMeetingAt, runRevMeeting,
      revSellLimit, revOffers,
      agiOn, setAgiOn, agiPaused, setAgiPaused, agiLevel, setAgiLevel, agiConns, testAgiBot, setAgiConn,
      agiMissions, runAgiMission, approveAgiMission, pauseAgiMission, agiRecords, agiDemo, runAgiDemo, resetAgiDemo,
      agiHoldId, agiBooking, agiGuestOffer, holdAgiOffer, confirmAgiGuest,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}
