/* eslint-disable @next/next/no-page-custom-font */
'use client';
import { theme } from '@bapana/theme';
import { ThemeProvider, ToastProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '../hooks/use-auth';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            * {
              box-sizing: border-box;
            }

            .ag-theme-alpine {
              --ag-border-color: #e2e8f0;
              --ag-header-foreground-color: #553C9A;
              --ag-header-background-color: #E9D8FD;
              --ag-row-hover-color: #FAF5FF;
              --ag-foreground-color: #718096;
            }
          `}
        </style>
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
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
