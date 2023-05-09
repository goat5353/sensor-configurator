import { CopyOutlined, SaveFilled } from "@ant-design/icons"
import {
  Button,
  Col,
  Input,
  Layout,
  List,
  Row,
  Select,
  Space,
  Switch,
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
    children: `Content of Tab Pane 1`,
  },
  {
    key: "2",
    label: `Condition`,
    children: `Content of Tab Pane 2`,
  },
]

const ScheduleGenerator = () => {
  const { Header, Content, Footer } = Layout

  const format = "H:mm"
  const textareaRef = useRef()

  const [textareaValue, setTextareaValue] = useState("")
  const [listData, setListData] = useState([])
  const [scheduleSelect, setScheduleSelect] = useState(scheduleOptions[0].value)

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

  const generateTimerFormat = (data) => {
    const timerFormat = []
    data.forEach((item) => {
      timerFormat.push(
        `${item.checked ? 1 : 0},${dayjs("2023-01-01 " + item.start).format(
          "Hmm"
        )},${dayjs("2023-01-01 " + item.end).format("Hmm")},${dayjs(
          "2023-01-01 " + item.start2
        ).format("Hmm")},${dayjs("2023-01-01 " + item.end2).format("Hmm")}`
      )
    })

    return timerFormat.join(",")
  }

  const saveDataToLocalStorage = (key, data) => {
    localStorage.setItem(key, data)
  }

  const handleChange = (value) => {
    setScheduleSelect(value)
  }

  const handleSave = () => {
    const timerFormat = generateTimerFormat(listData)
    setTextareaValue(timerFormat)
    saveDataToLocalStorage(scheduleSelect, timerFormat)
  }

  const createDefaultData = () => {
    const days = [
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
      "อาทิตย์",
    ]
    const defaultData = []

    days.forEach((day) => {
      defaultData.push({
        day,
        start: "8:00",
        end: "8:00",
        start2: "8:00",
        end2: "8:00",
        checked: false,
      })
    })

    return defaultData
  }

  const convertDataFromString = (data) => {
    const newData = data.split(",")
    const convertData = [
      {
        day: "จันทร์",
        start: dayjs("2023-01-01 " + newData[1]).format("H:mm"),
        end: dayjs("2023-01-01 " + newData[2]).format("H:mm"),
        start2: dayjs("2023-01-01 " + newData[3]).format("H:mm"),
        end2: dayjs("2023-01-01 " + newData[4]).format("H:mm"),
        checked: newData[0] === "1" ? true : false,
      },
      {
        day: "อังคาร",
        start: dayjs("2023-01-01 " + newData[6]).format("H:mm"),
        end: dayjs("2023-01-01 " + newData[7]).format("H:mm"),
        start2: dayjs("2023-01-01 " + newData[8]).format("H:mm"),
        end2: dayjs("2023-01-01 " + newData[9]).format("H:mm"),
        checked: newData[5] === "1" ? true : false,
      },
      {
        day: "พุธ",
        start: dayjs("2023-01-01 " + newData[11]).format("H:mm"),
        end: dayjs("2023-01-01 " + newData[12]).format("H:mm"),
        start2: dayjs("2023-01-01 " + newData[13]).format("H:mm"),
        end2: dayjs("2023-01-01 " + newData[14]).format("H:mm"),
        checked: newData[10] === "1" ? true : false,
      },
      {
        day: "พฤหัสบดี",
        start: dayjs("2023-01-01 " + newData[16]).format("H:mm"),
        end: dayjs("2023-01-01 " + newData[17]).format("H:mm"),
        start2: dayjs("2023-01-01 " + newData[18]).format("H:mm"),
        end2: dayjs("2023-01-01 " + newData[19]).format("H:mm"),
        checked: newData[15] === "1" ? true : false,
      },
      {
        day: "ศุกร์",
        start: dayjs("2023-01-01 " + newData[21]).format("H:mm"),
        end: dayjs("2023-01-01 " + newData[22]).format("H:mm"),
        start2: dayjs("2023-01-01 " + newData[23]).format("H:mm"),
        end2: dayjs("2023-01-01 " + newData[24]).format("H:mm"),
        checked: newData[20] === "1" ? true : false,
      },
      {
        day: "เสาร์",
        start: dayjs("2023-01-01 " + newData[26]).format("H:mm"),
        end: dayjs("2023-01-01 " + newData[27]).format("H:mm"),
        start2: dayjs("2023-01-01 " + newData[28]).format("H:mm"),
        end2: dayjs("2023-01-01 " + newData[29]).format("H:mm"),
        checked: newData[25] === "1" ? true : false,
      },
      {
        day: "อาทิตย์",
        start: dayjs("2023-01-01 " + newData[31]).format("H:mm"),
        end: dayjs("2023-01-01 " + newData[32]).format("H:mm"),
        start2: dayjs("2023-01-01 " + newData[33]).format("H:mm"),
        end2: dayjs("2023-01-01 " + newData[34]).format("H:mm"),
        checked: newData[30] === "1" ? true : false,
      },
    ]

    return convertData
  }

  const initData = (value) => {
    const data = localStorage.getItem(value)
    let listData = []
    if (data) {
      listData = convertDataFromString(data)
      setTextareaValue(data)
    } else {
      listData = createDefaultData()
      setTextareaValue("")
    }
    setListData(listData)
  }

  useEffect(() => {
    initData(scheduleSelect)
  }, [scheduleSelect])

  return (
    <>
      <Row>
        <Col sx={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              paddingBottom: 14,
            }}
          >
            <Select
              defaultValue={scheduleSelect}
              style={{ width: 120 }}
              onChange={handleChange}
              options={scheduleOptions}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} wrap={true} justify={"center"}>
        <Col sm={24} md={16}>
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
                <Button icon={<SaveFilled />} onClick={() => handleSave()}>
                  Save
                </Button>
              </div>
            }
            bordered
            dataSource={listData}
            renderItem={(item, index) => {
              return (
                <List.Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: "flex", width: "20%" }}
                  >
                    <Typography.Text>{item.day}</Typography.Text>
                    <Switch
                      checked={item.checked}
                      onChange={(data) => onToggleDaySwitch(data, index)}
                    />
                  </Space>
                  <div style={{ width: "20%" }}>
                    <TimePicker
                      value={dayjs(item.start, format)}
                      format={format}
                      onChange={(data) =>
                        handleTimeChange(data, "start", index)
                      }
                    />
                  </div>
                  <div style={{ width: "20%" }}>
                    <TimePicker
                      value={dayjs(item.end, format)}
                      format={format}
                      onChange={(data) => handleTimeChange(data, "end", index)}
                    />
                  </div>
                  <div style={{ width: "20%" }}>
                    <TimePicker
                      value={dayjs(item.start2, format)}
                      format={format}
                      onChange={(data) =>
                        handleTimeChange(data, "start2", index)
                      }
                    />
                  </div>
                  <div style={{ width: "20%" }}>
                    <TimePicker
                      value={dayjs(item.end2, format)}
                      format={format}
                      onChange={(data) => handleTimeChange(data, "end2", index)}
                    />
                  </div>
                </List.Item>
              )
            }}
          />
        </Col>
        <Col sm={24} md={8}>
          <Input.TextArea
            ref={textareaRef}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            style={{ height: "40vh" }}
          />
          <Button icon={<CopyOutlined />} onClick={() => copyToClipboard()} style={{ marginTop: 14}}>
            Copy to Clipboard
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default ScheduleGenerator