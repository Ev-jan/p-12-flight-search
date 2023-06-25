import styled from "styled-components"
import Header from "./header"
import { ReactNode } from "react"
import { device } from "../theme"

const LayoutWrapper = styled.div`
display: flex;
flex-direction: column;
max-width: 1049px;
margin: 0 auto;
padding: 0 37px;
@media(${device.mobileL}){
    padding: 0 15px;
}
`

type Layoutprops = {
    children: ReactNode
}

const Layout: React.FC<Layoutprops> = ({ children }) => {
    return (
        <LayoutWrapper>
            <Header />
            {children}
        </LayoutWrapper>
    )
}

export default Layout