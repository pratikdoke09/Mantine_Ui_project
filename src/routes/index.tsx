import { createFileRoute } from '@tanstack/react-router'
import { FooterLinks } from '../components/FooterLinks'
import { HeaderMenu } from '../components/HeaderMenu'


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  
return(
  <>
  
  <HeaderMenu />
  <FooterLinks/>
  
  </>
 )
  
 
}






