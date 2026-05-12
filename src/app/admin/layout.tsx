export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: '#0a0a0a', color: '#e5e5e5', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
