import { CopyOutlined, SaveFilled } from "@ant-design/icons"
import create from "@ant-design/icons/lib/components/IconFont"
import {
  Avatar,
  Button,
  Col,
  Input,
  Layout,
  List,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  TimePicker,
  Typography,
} from "antd"
import copy from "copy-to-clipboard"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import ScheduleGenerator from "./ScheduleGenerator"
import ConditionGenerator from "./ConditionGenerator"

const headerStyle = {
  textAlign: "center",
  color: "#000",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#fff",
}
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#000",
  backgroundColor: "#fff",
  padding: 12,
}
const footerStyle = {
  textAlign: "center",
  color: "#000",
  backgroundColor: "#fff",
}

const scheduleOptions = [
  { value: "schedule1", label: "AC#1" },
  { value: "schedule2", label: "AC#2" },
  { value: "schedule3", label: "EVAP" },
  { value: "schedule4", label: "Shading" },
]

const tabItems = [
  {
    key: "1",
    label: `Schedule`,
    children: <ScheduleGenerator />,
  },
  {
    key: "2",
    label: `Condition`,
    children: <ConditionGenerator />,
  },
]

const LayoutApp = () => {
  const { Header, Content, Footer } = Layout
  const [title, setTitle] = useState("Schedule Config Generate")

  const onChangeTabs = (key) => {
    const title = tabItems.find((item) => item.key === key).label
    setTitle(`${title} Config Generate`)
  }

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%", minHeight: "100vh" }}>
        <Layout style={{ width: "100%", minHeight: "100vh" }}>
          <Header style={headerStyle}>
            <Typography.Title level={3} style={{ marginTop: 30 }}>
              {title}
            </Typography.Title>
          </Header>
          <Content style={contentStyle}>
            <Tabs
              defaultActiveKey="1"
              items={tabItems}
              onChange={onChangeTabs}
            />
          </Content>
          <Footer style={footerStyle}>©2023, by Syntechnology Co.Ltd.</Footer>
        </Layout>
      </Space>
    </div>
  )
}

export default LayoutApp
