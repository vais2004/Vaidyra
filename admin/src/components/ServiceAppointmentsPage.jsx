import React, { useEffect, useState } from "react";
import { serviceAppointmentsStyles } from "../assets/dummyStyles";
import ListServicePage from "../components/ListServicePage";

const ServiceAppointmentsPage = () => {
  const API_BASE = "http://localhost:4000";

  //HELPERS FUNCTION
  function formatTwo(n) {
    return String(n).padStart(2, "0");
  }

  function formatDateNice(dateStr) {
    if (!dateStr) return "";
    const d = new Date(`${dateStr}T00:00:00`);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function parseTimeToParts(timeStr) {
    if (!timeStr) return { hour: 12, minute: 0, ampm: "AM" };
    const m = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (m) {
      let hh = Number(m[1]);
      const mm = Number(m[2]);
      const ampm = m[3] ? m[3].toUpperCase() : null;
      if (!ampm) {
        const hour12 = hh % 12 === 0 ? 12 : hh % 12;
        return { hour: hour12, minute: mm, ampm: hh >= 12 ? "PM" : "AM" };
      }
      return { hour: hh, minute: mm, ampm };
    }
    return { hour: 12, minute: 0, ampm: "AM" };
  } //for time ap/pm

  function timePartsTo12HourString(hh24, mm) {
    let ampm = hh24 >= 12 ? "PM" : "AM";
    let hour = hh24 % 12 === 0 ? 12 : hh24 % 12;
    return `${formatTwo(hour)}:${formatTwo(mm)} ${ampm}`;
  }

  function timePartsToInputValue(a) {
    const hour = Number(a.hour || 0);
    const minute = Number(a.minute || 0);
    let hh24 = hour % 12;
    if ((a.ampm || "AM").toUpperCase() === "PM") hh24 += 12;
    if (a.ampm === "AM" && hour === 12) hh24 = 0;
    if (a.ampm === "PM" && hour === 12) hh24 = 12;
    return `${formatTwo(hh24)}:${formatTwo(minute)}`;
  }

  //how to display
  function formatTimeDisplay(a) {
    return `${formatTwo(a.hour)}:${formatTwo(a.minute)} ${a.ampm}`;
  }

  //small component for statusBadge
  function StatusBadge({ status }) {
    const classes = serviceAppointmentsStyles.statusBadge(status);
    return (
      <span className={classes}>
        {status === "Confirmed" && <CheckCircle className="h-4 w-4" />}
        {status === "Canceled" && <XCircle className="h-4 w-4" />}
        {status}
      </span>
    );
  }

  //for toast
  function Toast({ toasts, removeToast }) {
    return (
      <div className={serviceAppointmentsStyles.toastContainer}>
        {toasts.map((t) => (
          <div key={t.id} className={serviceAppointmentsStyles.toast}>
            <div className={serviceAppointmentsStyles.toastContent}>
              <div className="mt-0.5">
                <Loader2 className={serviceAppointmentsStyles.toastSpinner} />
              </div>
              <div className={serviceAppointmentsStyles.toastText}>
                <div className={serviceAppointmentsStyles.toastTitle}>
                  {t.title}
                </div>
                <div className={serviceAppointmentsStyles.toastMessage}>
                  {t.message}
                </div>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className={serviceAppointmentsStyles.toastCloseButton}
                aria-label="close toast">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  //for status Select small component
  function StatusSelect({ appointment, onChange, disabled }) {
    const terminal =
      appointment.status === "Completed" || appointment.status === "Canceled";

    const options = [
      { value: "Pending", label: "Pending" },
      { value: "Confirmed", label: "Confirmed" },
      { value: "Completed", label: "Completed" },
      { value: "Canceled", label: "Canceled" },
    ];

    return (
      <select
        value={appointment.status}
        onChange={(e) => onChange(e.target.value)}
        disabled={terminal || disabled}
        className={serviceAppointmentsStyles.statusSelect(terminal)}
        title={terminal ? "Status cannot be changed" : "Change status"}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  //to get todays date example[YYYY-MM-DD]
  function getTodayISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  //to prevent previous date comes first that is upcoming date comes first
  function isDateBefore(aDateStr, bDateStr) {
    try {
      const a = new Date(`${aDateStr}T00:00:00`);
      const b = new Date(`${bDateStr}T00:00:00`);
      return a.getTime() < b.getTime();
    } catch {
      return false;
    }
  }

  //for reschedule
  function RescheduleButton({ appointment, onReschedule, disabled }) {
    const terminal =
      appointment.status === "Completed" || appointment.status === "Canceled";
    const [editing, setEditing] = useState(false);
    const todayISO = getTodayISO();
    const [date, setDate] = useState(appointment.date || todayISO);
    const [time, setTime] = useState(timePartsToInputValue(appointment));

    useEffect(() => {
      const baseDate = appointment.date || "";
      const initialDate =
        baseDate && !isDateBefore(baseDate, todayISO) ? baseDate : todayISO;
      setDate(initialDate);
      setTime(timePartsToInputValue(appointment));
    }, [
      appointment.date,
      appointment.hour,
      appointment.minute,
      appointment.ampm,
    ]);

    //to save after editing
    function save() {
      if (!date || !time) return;
      if (isDateBefore(date, getTodayISO())) {
        alert("Please choose today or a future date for rescheduling.");
        return;
      }
      onReschedule(date, time);
      setEditing(false);
    }

    //to cancel a booking
    function cancel() {
      const baseDate = appointment.date || "";
      const restoreDate =
        baseDate && !isDateBefore(baseDate, getTodayISO())
          ? baseDate
          : getTodayISO();
      setDate(restoreDate);
      setTime(timePartsToInputValue(appointment));
      setEditing(false);
    }

    return (
      <div className="w-full">
        {!editing ? (
          <div className="flex justify-end">
            <button
              onClick={() => setEditing(true)}
              disabled={terminal || disabled}
              title={
                terminal ? "Cannot reschedule completed/canceled" : "Reschedule"
              }
              className={serviceAppointmentsStyles.rescheduleButton(terminal)}>
              Reschedule
            </button>
          </div>
        ) : (
          <div className={serviceAppointmentsStyles.rescheduleEditContainer}>
            <input
              type="date"
              value={date}
              min={getTodayISO()}
              onChange={(e) => setDate(e.target.value)}
              className={serviceAppointmentsStyles.rescheduleDateInput}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={serviceAppointmentsStyles.rescheduleTimeInput}
            />
            <div className={serviceAppointmentsStyles.rescheduleActions}>
              <button
                onClick={save}
                className={serviceAppointmentsStyles.rescheduleSaveButton}>
                Save
              </button>
              <button
                onClick={cancel}
                className={serviceAppointmentsStyles.rescheduleCancelButton}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div></div>
    </div>
  );
};

export default ServiceAppointmentsPage;
