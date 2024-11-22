import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      // So by default it refetches once you are out of the window browser which can be inconvient so we're going to disable it turn it to false
      refetchOnWindowFocus: false,
    }
  }
})
//Query Client allows you to use hooks within the entire app, which allows us to create our own frontend api

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Router>
        <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <AppRoutes/>
          {/* Toaster will always be the smallest since it's just a component in your app */}
          <Toaster visibleToasts={1} position="bottom-left" richColors/> 
        </Auth0ProviderWithNavigate>
        </QueryClientProvider>
      </Router>
  </StrictMode>,
)
