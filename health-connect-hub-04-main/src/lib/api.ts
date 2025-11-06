export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export async function loginApi(email: string, password: string) {
    const res = await fetch(`${API_BASE}/api/simple/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Login failed");
    return data.data;
}

export async function registerApi(payload: {
    email: string;
    password: string;
    fullName: string;
    cccd: string;
    phone: string;
    role?: string;
}) {
    const res = await fetch(`${API_BASE}/api/simple/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Register failed");
    return data.data;
}

export async function fetchSymptoms() {
    const res = await fetch(`${API_BASE}/api/symptoms`);
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Load symptoms failed");
    return data.data as Array<{ id: number; name: string }>;
}

export async function matchDepartmentsBySymptoms(symptomIds: number[]) {
    const res = await fetch(`${API_BASE}/api/match/departments-by-symptoms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptomIds }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Match departments failed");
    return data.data as Array<{ deptId: number; deptName: string; matchedDiseases: number }>;
}

export async function getDoctorsByDepartment(deptId: number) {
    const res = await fetch(`${API_BASE}/api/departments/${deptId}/doctors`);
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Load doctors failed");
    return data.data as Array<{
        doctorId: number;
        fullName: string;
        degree: string | null;
        experienceYears: number | null;
        departmentName: string;
        available: boolean | null;
    }>;
}

/** Lấy slot còn trống của 1 bác sĩ theo ngày (from=to=date) */
export async function getOpenSlotsByDate(doctorId: number, dateISO: string) {
    const url = `${API_BASE}/api/doctors/${doctorId}/open-slots?from=${dateISO}&to=${dateISO}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Load open slots failed");
    // data.data: [{ scheduleId, workDate, slotId, slotName, startTime, endTime }]
    return data.data as Array<{
        scheduleId: number;
        workDate: string;   // "2025-11-06"
        slotId: number;
        slotName: string;   // "8h00 - 9h00" (từ DB) – có thể không khớp label 12h
        startTime: string;  // "08:00:00"
        endTime: string;    // "09:00:00"
    }>;
}

/** Đặt lịch */
export async function createAppointment(req: {
    patientId: number;
    doctorId: number;
    scheduleId: number;
    initialSymptoms?: string;
}) {
    const res = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Create appointment failed");
    return data.data as number; // appointment_id
}
export async function getOpenSlotsForDay(doctorId: number, isoDate: string) {
    const res = await fetch(
        `${API_BASE}/api/doctors/${doctorId}/open-slots?from=${isoDate}&to=${isoDate}`
    );
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Load open slots failed");
    // data.data: [{ scheduleId, workDate, slotId, slotName, startTime, endTime }]
    return data.data as Array<{
        scheduleId: number;
        workDate: string;  // "2025-11-06"
        slotId: number;
        slotName: string;
        startTime: string; // "08:00:00"
        endTime: string;   // "09:00:00"
    }>;
}

export async function getOpenSlotsByDateGrouped(
    doctorId: number,
    fromISO: string,
    toISO: string
) {
    const url = `${API_BASE}/api/doctors/${doctorId}/open-slots-by-date?from=${fromISO}&to=${toISO}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Load open slots failed");
    return data.data as Array<{
        workDate: string; // "2025-11-06"
        slots: Array<{
            scheduleId: number;
            slotId: number;
            slotName: string;
            startTime: string; // "08:00:00"
            endTime: string;   // "09:00:00"
        }>;
    }>;
}

export async function getBookedSlotsByDateGrouped(doctorId: number, fromISO: string, toISO: string) {
    const res = await fetch(`${API_BASE}/api/doctors/${doctorId}/open-slots-by-date?from=${fromISO}&to=${toISO}`);
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Load booked slots failed");
    return data.data as Array<{
        workDate: string; // "2025-11-06"
        slots: Array<{
            scheduleId: number;
            slotId: number;
            slotName: string;
            startTime: string; // "08:00:00"
            endTime: string;   // "09:00:00"
        }>;
    }>;
}


export async function getDoctorProfile(doctorId: number) {
    const res = await fetch(`${API_BASE}/api/departments/${doctorId}`);
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.message || "Load doctor failed");
    return data.data as {
        doctorId: number;
        fullName: string;
        degree?: string | null;
        experienceYears?: number | null;
        departmentName?: string | null;
        location?: string | null;
    };
}