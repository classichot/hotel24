"use client";

import { FormEvent, useState } from "react";
import { ROOM_TYPES } from "@/lib/model";
import { useStore } from "@/lib/store";
import { T } from "@/lib/i18n";

export function WalkInDialog() {
  const { walkInOpen, setWalkInOpen, newResOpen, setNewResOpen, addWalkIn } = useStore();
  const open = walkInOpen || newResOpen;
  const [guest, setGuest] = useState("");
  const [type, setType] = useState(ROOM_TYPES[0].en);

  if (!open) return null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    addWalkIn(guest || "Walk-in guest", type);
    setGuest("");
  }

  return (
    <div className="dialog-backdrop" onClick={() => { setWalkInOpen(false); setNewResOpen(false); }}>
      <form className="dialog" onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
        <div className="dialog-title">{newResOpen ? <T en="New reservation" th="การจองใหม่" /> : <T en="Walk-in" th="วอล์กอิน" />}</div>
        <p className="dialog-body"><T en="Creates a direct booking on tonight’s calendar. PromptPay or cash on the folio." th="สร้างการจองตรงบนปฏิทินคืนนี้ เก็บเงิน PromptPay หรือเงินสดที่โฟลิโอ" /></p>
        <div className="field">
          <label><T en="Guest name" th="ชื่อแขก" /></label>
          <input className="input" value={guest} onChange={(e) => setGuest(e.target.value)} placeholder="—" autoFocus />
        </div>
        <div className="field">
          <label><T en="Room type" th="ประเภทห้อง" /></label>
          <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
            {ROOM_TYPES.map((r) => <option key={r.id} value={r.en}>{r.en} · {r.th}</option>)}
          </select>
        </div>
        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={() => { setWalkInOpen(false); setNewResOpen(false); }}><T en="Cancel" th="ยกเลิก" /></button>
          <button type="submit" className="btn btn-primary"><T en="Add to calendar" th="ใส่ปฏิทิน" /></button>
        </div>
      </form>
    </div>
  );
}
