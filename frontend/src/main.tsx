// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// ==========================================
// REACT QUERY CONFIG
// ==========================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests 1 time
      refetchOnWindowFocus: false, // Không refetch khi focus window
      staleTime: 5 * 60 * 1000, // Data được coi là fresh trong 5 phút
    },
    mutations: {
      retry: 0, // Không retry mutations
    },
  },
});

// ==========================================
// RENDER APP
// ==========================================
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Default options
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
          },
          // Success toast
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          // Error toast
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
          // Loading toast
          loading: {
            iconTheme: {
              primary: "#3B82F6",
              secondary: "#fff",
            },
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);
