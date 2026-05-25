"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#222220",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <title>Something went wrong — Jiva Space</title>
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>Something went wrong</h2>
        <p style={{ color: "#c1c1c1", marginTop: 8 }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => unstable_retry()}
          style={{
            marginTop: 24,
            background: "#e87461",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
