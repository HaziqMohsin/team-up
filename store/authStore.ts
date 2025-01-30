import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthState {
  session: Session | null;
  _hasHydrated: boolean;
  initializeAuth: () => () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      _hasHydrated: false,

      initializeAuth: () => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }: any) => {
          set({ session });
        });

        // Subscribe to auth changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
          set({ session });
        });

        // Return cleanup function
        return () => subscription?.unsubscribe();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);

export default useAuthStore;
