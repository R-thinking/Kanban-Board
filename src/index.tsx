import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { KanbanBoardApp } from './App'
import { QueryClient } from 'react-query'
import { RecoilRoot } from 'recoil'
import { kanbanTheme } from './4.kanbanBoardApp/theme'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={kanbanTheme}>
        <KanbanBoardApp />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
)
