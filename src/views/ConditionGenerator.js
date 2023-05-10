import { CopyOutlined, SaveFilled } from "@ant-design/icons"
import {
  Button,
  Col,
  Input,
  InputNumber,
  List,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from "antd"
import { useEffect, useRef, useState } from "react"
import ConditionEvap from "./ConditionEvap"
import ConditionShading from "./ConditionShading"
import ConditionXFan from "./ConditionXFan"
import copy from "copy-to-clipboard"

export const conditionOptions = [
  { value: "evapCon", label: "Evap" },
  { value: "shadingCon", label: "Shading" },
  { value: "xfanCon", label: "xFan" },
]

const ConditionGenerator = () => {
  const textareaRef = useRef()

  const [conditionSelect, setConditionSelect] = useState(
    conditionOptions[0].value
  )
  const [textareaValue, setTextareaValue] = useState("")

  const copyToClipboard = () => {
    const textarea = textareaRef.current.resizableTextArea.textArea
    copy(textarea.value)
    message.success("Copy to clipboard success!")
  }

  const handleSelectChange = (value) => {
    setConditionSelect(value)
  }

  const handleSave = (data) => {
    setTextareaValue(data)
    localStorage.setItem(conditionSelect, data)
  }

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
              defaultValue={conditionSelect}
              style={{ width: 120 }}
              onChange={handleSelectChange}
              options={conditionOptions}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} wrap={true} justify={"center"}>
        <Col xs={24} sm={24} md={16}>
          {conditionSelect === conditionOptions[0].value && (
            <ConditionEvap
              onSave={(data) => handleSave(data)}
              onInitData={(data) => setTextareaValue(data)}
            />
          )}
          {conditionSelect === conditionOptions[1].value && (
            <ConditionShading
              onSave={(data) => handleSave(data)}
              onInitData={(data) => setTextareaValue(data)}
            />
          )}
          {conditionSelect === conditionOptions[2].value && (
            <ConditionXFan
              onSave={(data) => handleSave(data)}
              onInitData={(data) => setTextareaValue(data)}
            />
          )}
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Input.TextArea
            ref={textareaRef}
            value={textareaValue}
            onChange={(e) => {
              setTextareaValue(e.target.value)
            }}
            style={{ minHeight: "130px" }}
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

export default ConditionGenerator
