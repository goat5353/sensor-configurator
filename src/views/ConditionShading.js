import {
  Button,
  Card,
  Col,
  InputNumber,
  Row,
  Space,
  Tag,
  Typography,
} from "antd"
import { useEffect, useState } from "react"
import { conditionOptions } from "./ConditionGenerator"

const ConditionShading = ({ onSave, onInitData }) => {
  const defaultData = [
    {
      device: "Light",
      min: 0,
      max: 0,
    },
  ]

  const [data, setData] = useState(defaultData)

  const generateConditionFormat = (data) => {
    const conditionFormat = []
    data.forEach((item) => {
      conditionFormat.push(`${item.min},${item.max},0,0`) //2 last digit is fix.
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
    const devices = ["Light"]
    const newData = data.split(",")

    const convertData = devices.map((device, index) => ({
      device,
      min: newData[index * 2],
      max: newData[index * 2 + 1],
    }))

    return convertData
  }

  useEffect(() => {
    const initData = () => {
      const storageData = localStorage.getItem(conditionOptions[1].value)
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
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        {data.map((item, index) => {
          return (
            <Card
              title={item.device}
              bordered={true}
              key={index}
              style={{ marginBottom: 12 }}
              bodyStyle={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                padding: 12,
              }}
            >
              <Space style={{ paddingLef: 24, paddingRight: 24 }}>
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
                  max={65535}
                  value={item.min}
                  onChange={(val) => handleInputChange(val, index, "min")}
                  style={{ margin: 7 }}
                />
              </Space>
              <Space style={{ paddingLef: 24, paddingRight: 24 }}>
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
                  max={65535}
                  value={item.max}
                  onChange={(val) => handleInputChange(val, index, "max")}
                  style={{ margin: 7 }}
                />
              </Space>
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
  )
}

export default ConditionShading
