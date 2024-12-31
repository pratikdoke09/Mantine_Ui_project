
import './App.css'
import { FooterLinks } from './components/FooterLinks'
import { HeaderMenu } from './components/HeaderMenu'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';


function App() {
  
return(
 <>
 <MantineProvider>
 <HeaderMenu />
 <FooterLinks/>
 </MantineProvider>
 </>
)
 
}

export default App
