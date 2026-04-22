import "./globals.css"
import { ThemeProvider } from "@/components/common/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="antialiased"
    >
      <body className="font-sans bg-[#0E0E10]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
