import { Box, Flex, Heading } from "@chakra-ui/layout"
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Outlet } from "react-router"

export const App = () => {
  return (
    <Flex direction='column' minH='100vh' bg='gray.700'>
      <Navbar />
      <Flex flexGrow='1' w='100%' h='100%' align='center' justify='center'>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}