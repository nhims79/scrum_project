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
