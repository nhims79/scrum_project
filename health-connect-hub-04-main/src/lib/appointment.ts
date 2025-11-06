// src/lib/appointments.ts
export type Appointment = {
  id: string;
  appointment_date: string;   // yyyy-mm-dd
  appointment_time: string;   // HH:mm
  status: "pending" | "confirmed" | "cancelled";
  doctors: { name: string; specialization: string };
  departments: { name: string };
  symptoms: { name: string };
};

const KEY = "appointments";

export function getAppointments(): Appointment[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveAppointment(appt: Appointment) {
  const list = getAppointments();
  list.push(appt);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function setAppointments(list: Appointment[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
