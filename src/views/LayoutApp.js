import { CopyOutlined, SaveFilled } from "@ant-design/icons"
import {
  Avatar,
  Button,
  Col,
  Input,
  Layout,
  List,
  Row,
  Space,
  Switch,
  Table,
  TimePicker,
  Typography,
} from "antd"
import copy from "copy-to-clipboard"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"

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
  padding: 12
}
const footerStyle = {
  textAlign: "center",
  color: "#000",
  backgroundColor: "#fff",
}

const defaultData = [
  {
    day: "จันทร์",
    start: "08:00",
    end: "08:00",
    start2: "08:00",
    end2: "08:00",
    checked: false,
  },
  {
    day: "อังคาร",
    start: "08:00",
    end: "08:00",
    start2: "08:00",
    end2: "08:00",
    checked: false,
  },

  {
    day: "พุธ",
    start: "08:00",
    end: "08:00",
    start2: "08:00",
    end2: "08:00",
    checked: false,
  },

  {
    day: "พฤหัสบดี",
    start: "08:00",
    end: "08:00",
    start2: "08:00",
    end2: "08:00",
    checked: false,
  },

  {
    day: "ศุกร์",
    start: "08:00",
    end: "08:00",
    start2: "08:00",
    end2: "08:00",
    checked: false,
  },

  {
    day: "เสาร์",
    start: "08:00",
    end: "08:00",
    start2: "08:00",
    end2: "08:00",
    checked: false,
  },

  {
    day: "อาทิตย์",
    start: "08:00",
    end: "08:00",
    start2: "08:00",
    end2: "08:00",
    checked: false,
  },
]

const LayoutApp = () => {
  const { Header, Content, Footer } = Layout
  const format = "HH:mm"
  const [textareaValue, setTextareaValue] = useState("")
  const textareaRef = useRef()
  const [listData, setListData] = useState([])

  const onToggleDaySwitch = (checked, index) => {
    const newData = [...listData]
    newData[index].checked = checked
    setListData(newData)
  }

  const handleTimeChange = (data, key, index) => {
    const newData = [...listData]
    newData[index][key] = data.format(format)
    setListData(newData)
  }

  const copyToClipboard = () => {
    const textarea = textareaRef.current.resizableTextArea.textArea
    copy(textarea.value)
  }

  const generateTimerFormat = () => {
    const timerFormat = []
    listData.forEach((item) => {
      timerFormat.push(
        `${item.checked ? 1 : 0},${dayjs("2023-01-01 " + item.start).format(
          "HHmm"
        )},${dayjs("2023-01-01 " + item.end).format("HHmm")},${dayjs(
          "2023-01-01 " + item.start2
        ).format("HHmm")},${dayjs("2023-01-01 " + item.end2).format("HHmm")}`
      )
    })
    setTextareaValue(timerFormat.join(","))
    saveDataToLocalStorage(timerFormat.join(","))
  }

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("timerData", data)
  }

  const checkDataFromLocalStorage = () => {
    const data = localStorage.getItem("timerData")
    if (data) {
      setTextareaValue(data)
      initDefaultData()
    } else {
      generateTimerFormat()
    }
  }

  const initDefaultData = () => {
    const data = localStorage.getItem("timerData")
    if (data) {
      const newData = data.split(",")
      const listData = [
        {
          day: "จันทร์",
          start: dayjs("2023-01-01 " + newData[1]).format("HH:mm"),
          end: dayjs("2023-01-01 " + newData[2]).format("HH:mm"),
          start2: dayjs("2023-01-01 " + newData[3]).format("HH:mm"),
          end2: dayjs("2023-01-01 " + newData[4]).format("HH:mm"),
          checked: newData[0] === "1" ? true : false,
        },
        {
          day: "อังคาร",
          start: dayjs("2023-01-01 " + newData[6]).format("HH:mm"),
          end: dayjs("2023-01-01 " + newData[7]).format("HH:mm"),
          start2: dayjs("2023-01-01 " + newData[8]).format("HH:mm"),
          end2: dayjs("2023-01-01 " + newData[9]).format("HH:mm"),
          checked: newData[5] === "1" ? true : false,
        },
        {
          day: "พุธ",
          start: dayjs("2023-01-01 " + newData[11]).format("HH:mm"),
          end: dayjs("2023-01-01 " + newData[12]).format("HH:mm"),
          start2: dayjs("2023-01-01 " + newData[13]).format("HH:mm"),
          end2: dayjs("2023-01-01 " + newData[14]).format("HH:mm"),
          checked: newData[10] === "1" ? true : false,
        },
        {
          day: "พฤหัสบดี",
          start: dayjs("2023-01-01 " + newData[16]).format("HH:mm"),
          end: dayjs("2023-01-01 " + newData[17]).format("HH:mm"),
          start2: dayjs("2023-01-01 " + newData[18]).format("HH:mm"),
          end2: dayjs("2023-01-01 " + newData[19]).format("HH:mm"),
          checked: newData[15] === "1" ? true : false,
        },
        {
          day: "ศุกร์",
          start: dayjs("2023-01-01 " + newData[21]).format("HH:mm"),
          end: dayjs("2023-01-01 " + newData[22]).format("HH:mm"),
          start2: dayjs("2023-01-01 " + newData[23]).format("HH:mm"),
          end2: dayjs("2023-01-01 " + newData[24]).format("HH:mm"),
          checked: newData[20] === "1" ? true : false,
        },
        {
          day: "เสาร์",
          start: dayjs("2023-01-01 " + newData[26]).format("HH:mm"),
          end: dayjs("2023-01-01 " + newData[27]).format("HH:mm"),
          start2: dayjs("2023-01-01 " + newData[28]).format("HH:mm"),
          end2: dayjs("2023-01-01 " + newData[29]).format("HH:mm"),
          checked: newData[25] === "1" ? true : false,
        },
        {
          day: "อาทิตย์",
          start: dayjs("2023-01-01 " + newData[31]).format("HH:mm"),
          end: dayjs("2023-01-01 " + newData[32]).format("HH:mm"),
          start2: dayjs("2023-01-01 " + newData[33]).format("HH:mm"),
          end2: dayjs("2023-01-01 " + newData[34]).format("HH:mm"),
          checked: newData[30] === "1" ? true : false,
        },
      ]
      setListData(listData)
    }
  }

  useEffect(() => {
    // checkDataFromLocalStorage()
    const data = localStorage.getItem("timerData")
    if (data) {
      setTextareaValue(data)
      initDefaultData()
    } else {
      setListData(defaultData)
    }
  }, [])

  return (
    <Space direction="vertical" style={{ width: "100%", height: "100vh" }}>
      <Layout>
        <Header style={headerStyle}>Timer Setting</Header>
        <Content style={contentStyle}>
          <Row gutter={[16, 16]} wrap={true} justify={"center"}>
            <Col sm={24} md={14}>
              <List
                header={
                  <List.Item
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 0,
                    }}
                  >
                    <div style={{ width: "20%" }}>
                      <Typography.Text>วัน</Typography.Text>
                    </div>
                    <div style={{ width: "20%" }}>
                      <Typography.Text>เวลาเริ่ม</Typography.Text>
                    </div>
                    <div style={{ width: "20%" }}>
                      <Typography.Text>เวลาสิ้นสุด</Typography.Text>
                    </div>
                    <div style={{ width: "20%" }}>
                      <Typography.Text>เวลาเริ่ม</Typography.Text>
                    </div>
                    <div style={{ width: "20%" }}>
                      <Typography.Text>เวลาสิ้นสุด</Typography.Text>
                    </div>
                  </List.Item>
                }
                footer={
                  <div>
                    <Button
                      icon={<SaveFilled />}
                      onClick={() => generateTimerFormat()}
                    >
                      Save
                    </Button>
                  </div>
                }
                bordered
                dataSource={listData}
                renderItem={(item, index) => (
                  <List.Item
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ display: "flex", width: "20%" }}
                    >
                      <Typography.Text>{item.day}</Typography.Text>
                      <Switch
                        defaultChecked={item.checked}
                        onChange={(data) => onToggleDaySwitch(data, index)}
                      />
                    </Space>
                    <div style={{ width: "20%" }}>
                      <TimePicker
                        defaultValue={dayjs(item.start, format)}
                        format={format}
                        onChange={(data) =>
                          handleTimeChange(data, "start", index)
                        }
                      />
                    </div>
                    <div style={{ width: "20%" }}>
                      <TimePicker
                        defaultValue={dayjs(item.end, format)}
                        format={format}
                        onChange={(data) =>
                          handleTimeChange(data, "end", index)
                        }
                      />
                    </div>
                    <div style={{ width: "20%" }}>
                      <TimePicker
                        defaultValue={dayjs(item.start2, format)}
                        format={format}
                        onChange={(data) =>
                          handleTimeChange(data, "start2", index)
                        }
                      />
                    </div>
                    <div style={{ width: "20%" }}>
                      <TimePicker
                        defaultValue={dayjs(item.end2, format)}
                        format={format}
                        onChange={(data) =>
                          handleTimeChange(data, "end2", index)
                        }
                      />
                    </div>
                  </List.Item>
                )}
              />
            </Col>
            <Col sm={24} md={8}>
              <Input.TextArea
                ref={textareaRef}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                style={{ height: "40vh" }}
              />
              <Button icon={<CopyOutlined />} onClick={() => copyToClipboard()}>
                Copy to Clipboard
              </Button>
            </Col>
          </Row>
        </Content>
        <Footer style={footerStyle}>©2023, by Syntechnology Co.Ltd.</Footer>
      </Layout>
    </Space>
  )
}

export default LayoutApp
