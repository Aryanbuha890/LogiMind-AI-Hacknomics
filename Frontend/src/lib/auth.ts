export interface MockUserMetadata {
  full_name: string;
  role?: string;
  avatar_url?: string;
}

export interface MockUser {
  id: string;
  email: string;
  user_metadata: MockUserMetadata;
  created_at?: string;
}

export interface MockSession {
  access_token: string;
  token_type: string;
  user: MockUser;
  expires_at: number;
}

export const DEMO_PROFILES: {
  id: string;
  name: string;
  email: string;
  role: string;
  badge: string;
}[] = [
  {
    id: "demo-ops",
    name: "Arjun R.",
    email: "arjun.ops@logimind.ai",
    role: "Port Operations Lead",
    badge: "Operations",
  },
  {
    id: "demo-marine",
    name: "Capt. Elena Rostova",
    email: "elena.marine@logimind.ai",
    role: "Marine Terminal Director",
    badge: "Vessel Control",
  },
  {
    id: "demo-rail",
    name: "Marcus Vance",
    email: "marcus.rail@logimind.ai",
    role: "Railway Logistics Officer",
    badge: "Rail & OCR",
  },
];

const STORAGE_KEY = "logimind_mock_user";
const listeners = new Set<(user: MockUser | null) => void>();

function notifyListeners(user: MockUser | null) {
  listeners.forEach((listener) => {
    try {
      listener(user);
    } catch (e) {
      console.error("Auth listener error:", e);
    }
  });
}

export function getStoredUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to read user session from storage:", e);
  }
  return null;
}

export function saveUser(user: MockUser) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    notifyListeners(user);
  } catch (e) {
    console.warn("Failed to save user session:", e);
  }
}

export function clearUser() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    notifyListeners(null);
  } catch (e) {
    console.warn("Failed to clear user session:", e);
  }
}

export function getCurrentUser(): MockUser {
  const existing = getStoredUser();
  if (existing) return existing;

  // Default fallback user so app can start immediately even without explicit login
  const defaultUser: MockUser = {
    id: "default-operator",
    email: DEMO_PROFILES[0].email,
    user_metadata: {
      full_name: DEMO_PROFILES[0].name,
      role: DEMO_PROFILES[0].role,
    },
    created_at: new Date().toISOString(),
  };
  saveUser(defaultUser);
  return defaultUser;
}

export function directLogin(profileOrCustom?: {
  name?: string;
  email?: string;
  role?: string;
}): { data: { user: MockUser; session: MockSession }; error: null } {
  const email = profileOrCustom?.email || DEMO_PROFILES[0].email;
  const name =
    profileOrCustom?.name ||
    email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    DEMO_PROFILES[0].name;
  const role = profileOrCustom?.role || DEMO_PROFILES[0].role;

  const user: MockUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email,
    user_metadata: {
      full_name: name,
      role,
    },
    created_at: new Date().toISOString(),
  };

  saveUser(user);

  const session: MockSession = {
    access_token: `mock_jwt_${Date.now()}`,
    token_type: "bearer",
    user,
    expires_at: Math.floor(Date.now() / 1000) + 86400 * 30, // 30 days
  };

  return {
    data: { user, session },
    error: null,
  };
}

export function directLogout(): { error: null } {
  clearUser();
  return { error: null };
}

export function onAuthStateChange(callback: (user: MockUser | null) => void) {
  listeners.add(callback);
  callback(getStoredUser());
  return () => {
    listeners.delete(callback);
  };
}
