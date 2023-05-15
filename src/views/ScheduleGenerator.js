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
  Tag,
  TimePicker,
  Typography,
  message,
} from "antd"
import copy from "copy-to-clipboard"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"

const scheduleOptions = [
  { value: "schedule1", label: "AC#1" },
  { value: "schedule2", label: "AC#2" },
  { value: "schedule3", label: "EVAP" },
  { value: "schedule4", label: "Shading" },
]

const ScheduleGenerator = () => {
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
    message.success("Copy to clipboard success!")
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
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
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
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const newData = data.split(",")

    const convertData = days.map((day, index) => ({
      day,
      start: dayjs("2023-01-01 " + newData[index * 5 + 1]).format("H:mm"),
      end: dayjs("2023-01-01 " + newData[index * 5 + 2]).format("H:mm"),
      start2: dayjs("2023-01-01 " + newData[index * 5 + 3]).format("H:mm"),
      end2: dayjs("2023-01-01 " + newData[index * 5 + 4]).format("H:mm"),
      checked: newData[index * 5] === "1",
    }))

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
                  <Typography.Text>Day</Typography.Text>
                </div>
                <div style={{ width: "40%" }}>
                  <Typography.Text>Timer#1</Typography.Text>
                </div>
                <div style={{ width: "40%" }}>
                  <Typography.Text>Timer#2</Typography.Text>
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
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <Tag
                        color="green"
                        style={{ width: "40px", textAlign: "center" }}
                      >
                        start
                      </Tag>
                      <TimePicker
                        value={dayjs(item.start, format)}
                        format={format}
                        onChange={(data) =>
                          handleTimeChange(data, "start", index)
                        }
                        style={{ margin: 10 }}
                      />
                    </div>
                    <div>
                      <Tag
                        color="red"
                        style={{ width: "40px", textAlign: "center" }}
                      >
                        stop
                      </Tag>
                      <TimePicker
                        value={dayjs(item.end, format)}
                        format={format}
                        onChange={(data) =>
                          handleTimeChange(data, "end", index)
                        }
                        style={{ margin: 10 }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <Tag
                        color="green"
                        style={{ width: "40px", textAlign: "center" }}
                      >
                        start
                      </Tag>
                      <TimePicker
                        value={dayjs(item.start2, format)}
                        format={format}
                        onChange={(data) =>
                          handleTimeChange(data, "start2", index)
                        }
                        style={{ margin: 10 }}
                      />
                    </div>
                    <div>
                      <Tag
                        color="red"
                        style={{ width: "40px", textAlign: "center" }}
                      >
                        stop
                      </Tag>
                      <TimePicker
                        value={dayjs(item.end2, format)}
                        format={format}
                        onChange={(data) =>
                          handleTimeChange(data, "end2", index)
                        }
                        style={{ margin: 10 }}
                      />
                    </div>
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
          <Button
            icon={<CopyOutlined />}
            onClick={() => copyToClipboard()}
            style={{ marginTop: 14 }}
          >
            Copy to Clipboard
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default ScheduleGenerator
