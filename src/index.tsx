import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './2.toDoListApp/theme'
import { CoinApp, TodoListApp, TimeConverterApp, KanbanBoardApp, AnimationApp } from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { kanbanTheme } from './4.kanbanBoardApp/theme'
import { darkThemeForAnimation } from './5.animationApp/theme'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <QueryClientProvider client={queryClient}>
        <CoinApp />
      </QueryClientProvider> */}
      {/* <ThemeProvider theme={darkTheme}>
        <TodoListApp />
        <TimeConverterApp />
      </ThemeProvider> */}
      <ThemeProvider theme={kanbanTheme}>
        <KanbanBoardApp />
      </ThemeProvider>
      {/*  <ThemeProvider theme={darkThemeForAnimation}>
        <AnimationApp />
      </ThemeProvider> */}
    </RecoilRoot>
  </React.StrictMode>
)
