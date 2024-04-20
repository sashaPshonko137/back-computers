import React from "react"
import { Layout } from "antd"

const { Footer } = Layout

const FooterComponent: React.FC = () => {
  return (
    <Footer style={{ textAlign: "center", marginBottom: "0px" }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  )
}

export default FooterComponent
