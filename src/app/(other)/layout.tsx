import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';
import { Providers } from '../providers';
import { Box, CssBaseline } from "@mui/material";
import NavBar, { NAV_WIDTH } from "@/components/nav-bar";
 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 
export const metadata: Metadata = {
  title: "Dish Directory",
  description: "Explore and share your favorite recipes",
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Providers>
          <CssBaseline />
          <NavBar />
          <Box
            component="main"
            sx={{
              ml: {xs : 0, sm: '100px'},
              width: {xs: '100%', sm: `calc(100% - ${NAV_WIDTH}px)`},
              minHeight: '100vh',
              backgroundColor: 'background.default',
              px: { xs: 3, md: 8 },
              py: { xs: 4, md: 6 },
            }}
          >
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
