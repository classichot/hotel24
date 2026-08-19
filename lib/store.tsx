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

export type AuditEvent = { t: string; who: string; what: string; kind: string };
export type Mapping = (typeof MAPPINGS_SEED)[number];
export type Room = (typeof ROOMS_SEED)[number];

type Store = {
  ready: boolean;
  authed: boolean;
  login: (role: Role) => void;
  logout: () => void;
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
};

const Ctx = createContext<Store | null>(null);
const KEY = "hotel24.session";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState<Role>("owner");
  const [theme, setThemeState] = useState<ThemeKey>("light");
  const [lang, setLangState] = useState<Lang>("en");
  const [propertyId, setPropertyId] = useState("baantalay");
  const [toast, setToast] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as {
          authed?: boolean; role?: Role; theme?: string; lang?: Lang; propertyId?: string; aiMode?: AiMode;
          switchSource?: PmsSource; switchStatus?: SwitchStatus;
        };
        if (s.authed) setAuthed(true);
        if (s.role) setRole(s.role);
        if (s.theme) setThemeState(normalizeTheme(s.theme));
        if (s.lang === "th" || s.lang === "en") setLangState(s.lang);
        if (s.propertyId) setPropertyId(s.propertyId);
        if (s.aiMode) setAiModeState(s.aiMode);
        if (s.switchSource === "cloudbeds" || s.switchSource === "hotelier") setSwitchSourceState(s.switchSource);
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
      authed, role, theme, lang, propertyId, aiMode, switchSource, switchStatus: switchStatus === "running" ? "idle" : switchStatus,
    }));
  }, [ready, authed, role, theme, lang, propertyId, aiMode, switchSource, switchStatus]);

  const flash = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const stamp = useCallback((who: string, what: string, kind: string) => {
    setAudit((a) => [{ t: "19 Aug 09:14", who, what, kind }, ...a]);
  }, []);

  const login = useCallback((r: Role) => {
    setRole(r);
    setAuthed(true);
  }, []);

  const logout = useCallback(() => {
    setAuthed(false);
  }, []);

  const setTheme = useCallback((k: ThemeKey) => setThemeState(k), []);
  const setLang = useCallback((l: Lang) => setLangState(l), []);

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
    flash("Applied · pushed to 6 channels via Channex");
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

  const fixLoftMapping = useCallback(() => {
    setMappings((list) =>
      list.map((m) =>
        m.id === "m5"
          ? { ...m, plan: "Family Loft — Standard / Breakfast", inv: "6", state: "Mapped" as const }
          : m
      )
    );
    setShieldClosed((s) => ({ ...s, s1: true }));
    stamp("som@baantalay", "Mapped Family Loft → Expedia Standard / Breakfast · Shield closed tonight", "manual");
    flash("Family Loft mapped · Overbooking Shield closed tonight");
  }, [flash, stamp]);

  const forceAgoda = useCallback(() => {
    setAgodaRetry(true);
    setShieldClosed((s) => ({ ...s, s2: true }));
    stamp("HOTEL24 · Channel Manager", "Forced Agoda ARI re-push · ack 1.4s", "system");
    flash("Agoda ARI re-pushed · ack 1.4s");
  }, [flash, stamp]);

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
          flash(`${src.name} cut over. HOTEL24 is the system of record.`);
        }
      }, 780 * (i + 1));
      switchTimers.current.push(id);
    });
  }, [flash, stamp, switchSource, switchStatus]);

  const themeVars = THEMES[theme].vars as unknown as Record<string, string>;

  const value = useMemo<Store>(
    () => ({
      ready, authed, login, logout, role,
      theme, setTheme, themeVars, lang, setLang,
      propertyId, setPropertyId, toast, flash, navOpen, setNavOpen,
      search, setSearch, aiMode, setAiMode, recState, applyRec, dismissRec,
      rooms, advanceRoom, checked, checkIn, collectDue, tm30Filed, fileTm30,
      scanned, scanPassport, thread, setThread, sent, sendDraft,
      mappings, fixLoftMapping, agodaRetry, forceAgoda, shieldClosed, closeShield,
      audit, walkInOpen, setWalkInOpen, newResOpen, setNewResOpen, addWalkIn,
      benefits, toggleBenefit, assigned, autoAssign, calRange, setCalRange,
      switchSource, setSwitchSource, switchStatus, switchStep, startSwitch, resetSwitch,
    }),
    [
      ready, authed, login, logout, role, theme, setTheme, themeVars, lang, setLang,
      propertyId, toast, flash, navOpen, search, aiMode, setAiMode, recState, applyRec, dismissRec,
      rooms, advanceRoom, checked, checkIn, collectDue, tm30Filed, fileTm30, scanned, scanPassport,
      thread, sent, sendDraft, mappings, fixLoftMapping, agodaRetry, forceAgoda, shieldClosed, closeShield,
      audit, walkInOpen, newResOpen, addWalkIn, benefits, toggleBenefit, assigned, autoAssign, calRange,
      switchSource, setSwitchSource, switchStatus, switchStep, startSwitch, resetSwitch,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}
