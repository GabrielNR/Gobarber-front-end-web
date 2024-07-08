//imports
// import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';
import { SignIn } from './pages/SignIn';
import GlobalStyle from './styles/global';
// import AppProvider from './hooks';
// import { Routes } from './routes';
//app
export default function App() {
  return (
   <>
    {/* <AppProvider> */}
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    {/* </AppProvider> */}

     <GlobalStyle />
   </>
  );
}
