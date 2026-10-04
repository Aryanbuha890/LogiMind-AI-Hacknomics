import { getCurrentUser, directLogin, directLogout, onAuthStateChange, MockUser } from "./auth";

/**
 * Mock Supabase Client
 * Completely removes external database dependency for authentication.
 * All user sessions, logins, and profiles are managed locally and instantly.
 */
export const supabase = {
  auth: {
    signInWithPassword: async ({
      email,
      password,
    }: {
      email: string;
      password?: string;
    }) => {
      // Direct mock login without database
      const res = directLogin({ email });
      return { data: res.data, error: null };
    },

    signUp: async ({
      email,
      password,
      options,
    }: {
      email: string;
      password?: string;
      options?: { data?: { full_name?: string } };
    }) => {
      // Direct mock registration without database
      const res = directLogin({
        email,
        name: options?.data?.full_name,
      });
      return { data: res.data, error: null };
    },

    getUser: async () => {
      const user: MockUser = getCurrentUser();
      return { data: { user }, error: null };
    },

    getSession: async () => {
      const user: MockUser = getCurrentUser();
      return {
        data: {
          session: {
            access_token: "mock_jwt_session_token",
            token_type: "bearer",
            user,
            expires_at: Math.floor(Date.now() / 1000) + 86400 * 30,
          },
        },
        error: null,
      };
    },

    signOut: async () => {
      directLogout();
      return { error: null };
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      const unsubscribe = onAuthStateChange((user) => {
        if (user) {
          callback("SIGNED_IN", { user, access_token: "mock_jwt_session_token" });
        } else {
          callback("SIGNED_OUT", null);
        }
      });
      return { data: { subscription: { unsubscribe } } };
    },
  },

  // Safe fallback mock for any unexpected queries
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
  }),
} as any;
