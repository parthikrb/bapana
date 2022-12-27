/* eslint-disable @next/next/no-page-custom-font */
'use client';
import { theme } from '@bapana/theme';
import { ThemeProvider, ToastProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../hooks/use-auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: 'Montserrat',
          boxSizing: 'border-box',
        }}
      >
        <ThemeProvider theme={theme}>
          <ToastProvider
            defaultOptions={{
              duration: 3000,
              isClosable: false,
              position: 'bottom-left',
            }}
          >
            <QueryClientProvider client={queryClient}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
