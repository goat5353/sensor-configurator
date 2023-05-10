import { SaveFilled } from "@ant-design/icons"
import { Button, Card, Col, InputNumber, Row, Space, Tag } from "antd"
import { useEffect, useState } from "react"
import { conditionOptions } from "./ConditionGenerator"

const ConditionXFan = ({ onSave, onInitData }) => {
  const defaultData = [
    {
      device: "Fan 1",
      minTemp: 0,
      maxTemp: 0,
      minHumid: 0,
      maxHumid: 0,
    },
    {
      device: "Fan 2",
      minTemp: 0,
      maxTemp: 0,
      minHumid: 0,
      maxHumid: 0,
    },
    {
      device: "Fan 3",
      minTemp: 0,
      maxTemp: 0,
      minHumid: 0,
      maxHumid: 0,
    },
  ]

  const [data, setData] = useState(defaultData)

  const generateConditionFormat = (data) => {
    const conditionFormat = []
    data.forEach((item) => {
      conditionFormat.push(
        `${item.minTemp},${item.maxTemp},${item.minHumid},${item.maxHumid}`
      )
    })

    return conditionFormat.join(",")
  }

  const handleSave = () => {
    const conditionFormat = generateConditionFormat(data)
    onSave(conditionFormat)
  }

  const handleInputChange = (value, index, key) => {
    const newData = [...data]
    newData[index][key] = value
    setData(newData)
  }

  const convertDataFromString = (data) => {
    const devices = ["Fan 1", "Fan 2", "Fan 3"]
    const newData = data.split(",")

    const convertData = devices.map((device, index) => ({
      device,
      minTemp: newData[index * 4],
      maxTemp: newData[index * 4 + 1],
      minHumid: newData[index * 4 + 2],
      maxHumid: newData[index * 4 + 3],
    }))

    return convertData
  }

  useEffect(() => {
    const initData = () => {
      const storageData = localStorage.getItem(conditionOptions[2].value)
      let conditionData = defaultData
      if (storageData) {
        onInitData(storageData)
        conditionData = convertDataFromString(storageData)
      } else {
        onInitData("")
      }

      setData(conditionData)
    }

    initData()
  }, [])

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          {data.map((item, index) => {
            return (
              <Card
                title={item.device}
                bordered={true}
                key={index}
                style={{ marginBottom: 12 }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Card title={`Temperature`} type="inner">
                      <Space>
                        <Tag
                          color="green"
                          style={{
                            width: "60px",
                            textAlign: "center",
                            margin: 0,
                          }}
                        >
                          min
                        </Tag>
                        <InputNumber
                          min={0}
                          max={100}
                          value={item.minTemp}
                          onChange={(val) =>
                            handleInputChange(val, index, "minTemp")
                          }
                          style={{ margin: 7 }}
                        />
                      </Space>
                      <Space>
                        <Tag
                          color="red"
                          style={{
                            width: "60px",
                            textAlign: "center",
                            margin: 0,
                          }}
                        >
                          max
                        </Tag>
                        <InputNumber
                          min={0}
                          max={100}
                          value={item.maxTemp}
                          onChange={(val) =>
                            handleInputChange(val, index, "maxTemp")
                          }
                          style={{ margin: 7 }}
                        />
                      </Space>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Card title={`Humidity`} type="inner">
                      <Space>
                        <Tag
                          color="green"
                          style={{
                            width: "60px",
                            textAlign: "center",
                            margin: 0,
                          }}
                        >
                          min
                        </Tag>
                        <InputNumber
                          min={0}
                          max={100}
                          value={item.minHumid}
                          onChange={(val) =>
                            handleInputChange(val, index, "minHumid")
                          }
                          style={{ margin: 7 }}
                        />
                      </Space>
                      <Space>
                        <Tag
                          color="red"
                          style={{
                            width: "60px",
                            textAlign: "center",
                            margin: 0,
                          }}
                        >
                          max
                        </Tag>
                        <InputNumber
                          min={0}
                          max={100}
                          value={item.maxHumid}
                          onChange={(val) =>
                            handleInputChange(val, index, "maxHumid")
                          }
                          style={{ margin: 7 }}
                        />
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </Card>
            )
          })}
        </Col>
        <Col xs={24}>
          <Button
            type="primary"
            size="large"
            block
            style={{ marginBottom: 12 }}
            onClick={() => handleSave()}
          >
            Generate
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default ConditionXFan
