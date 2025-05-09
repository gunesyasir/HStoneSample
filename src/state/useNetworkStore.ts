import { create } from 'zustand';

type NetworkState = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  hasRetry: boolean;
  retry?: () => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string, retryFn?: () => void) => void;
  resetError: () => void;
  triggerRetry: () => void;
};

export const useNetworkStore = create<NetworkState>((set, get) => ({
  isLoading: false,
  hasError: false,
  errorMessage: undefined,
  hasRetry: false,
  retry: undefined,
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (message, retryFn) =>
    set({
      hasError: true,
      errorMessage: message,
      hasRetry: !!retryFn,
      retry: retryFn,
    }),
  resetError: () =>
    set({
      hasError: false,
      errorMessage: undefined,
      hasRetry: false,
      retry: undefined,
    }),
  triggerRetry: () => {
    const retry = get().retry;
    if (retry) {
      get().resetError();
      retry();
    }
  },
}));
