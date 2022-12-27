export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US">
      <head></head>
      <body>{children}</body>
    </html>
  )
}
