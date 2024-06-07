'use client'
import {Provider} from 'react-redux'
import { persistor, store } from '../redux/store'; 
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";


const Layout = ({children, session}) => {
  return (
    <SessionProvider session={session}>
   <Provider store={store}>
     <PersistGate persistor={persistor}>
      {children}
     </PersistGate>
   </Provider>
   </SessionProvider>
  )
}

export default Layout