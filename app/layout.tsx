import './globals.css'
import { ToastContainer } from 'react-toastify'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        
      </body>
    </html>
  )
}
