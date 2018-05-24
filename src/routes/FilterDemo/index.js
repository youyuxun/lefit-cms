import React from 'react'
import Filter from '../../components/Filter/index'
import { Button, Col } from 'antd'

const Demo = () => {
  const schema = [
    {
      label: 'item1',
      type: 'Input',
      placeholder: '输入框',
      field: 'input',
    },
    {
      label: 'item2',
      type: 'Select',
      placeholder: '选择框',
      field: 'select',
      options: [
        {
          key: 1,
          label: '北京',
        },
        {
          key: 2,
          label: '上海',
        }
      ]
    },
    {
      label: 'item3',
      type: 'DatePicker',
      placeholder: '日期',
      field: 'datepicker',
      extra: {
        format: 'YYYY-MM-DD HH:mm:ss'
      }
    },
    {
      label: 'item4',
      type: 'RangePicker',
      placeholder: '日期范围',
      field: ['start', 'end'],
    },
  ]
  const props = {
    schema,
    onSearch: (values) => {
      console.log(values)
    }
  }
  const jump = () => {
    console.log('aa')
  }
  return (
    <Filter {...props}>
      <Col md={8} sm={24}>
        <Button type="primary" onClick={jump}>
          新增
        </Button>
      </Col>
    </Filter>
  )
}

export default Demo
