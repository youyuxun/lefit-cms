import React, { Component } from 'react'
import { Form, Input, Select, DatePicker, Row, Col, Card, Button } from 'antd'
import _ from 'lodash'
import styles from './index.less'

const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker

@Form.create()
class Filter extends Component {
  handleSearch = (e) => {
    e.preventDefault()
    const { onSearch, form: { getFieldsValue } } = this.props
    const values = getFieldsValue()
    Object.keys(values).forEach(item => {
      if (_.isObject(values[item])) {
        if (_.isArray(values[item] && values[item])) {
          const temp = item.split('-')
          values[temp[0]] = values[item][0].unix()
          values[temp[1]] = values[item][1].unix()
          delete values[item]
        } else {
          values[item] = values[item].unix()
        }
      }
    })
    !!onSearch && onSearch(values)
  }
  handleFormReset = () => {
    this.props.form.resetFields()
  }
  renderItem = (item, index) => {
    const { getFieldDecorator } = this.props.form
    const { label, type, placeholder, field, options = [], extra = {} } = item
    switch (type) {
      case 'Input':
        return (
          <Col sm={24} md={8} key={index}>
            <FormItem label={label}>
              {
                getFieldDecorator(`${field}`)(
                  <Input placeholder={placeholder} />
                )
              }
            </FormItem>
          </Col>
        )
      case 'Select':
        return (
          <Col sm={24} md={8} key={index}>
            <FormItem label={label}>
              {
                getFieldDecorator(`${field}`)(
                  <Select {...extra} placeholder={placeholder}>
                    {
                      options.map(option => <Option key={option.key} value={option.key}>{option.label}</Option>)
                    }
                  </Select>
                )
              }
            </FormItem>
          </Col>
        )
      case 'DatePicker':
        return (
          <Col sm={24} md={8} key={index}>
            <FormItem label={label}>
              {
                getFieldDecorator(`${field}`)(
                  <DatePicker {...extra} placeholder={placeholder} style={{ width: '100%' }} />
                )
              }
            </FormItem>
          </Col>
        )
      case 'RangePicker':
        return (
          <Col sm={24} md={8} key={index}>
            <FormItem label={label}>
              {
                getFieldDecorator(`${field[0]}-${field[1]}`)(
                  <RangePicker {...extra} placeholder={placeholder} />
                )
              }
            </FormItem>
          </Col>
        )
      default: return null
    }
  }
  render () {
    const { schema = [] } = this.props

    return (
      <Card bordered={false} className={styles.tableListForm}>
        <Form layout="inline" onSubmit={this.handleSearch}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            {
              schema.map((item, index) => (
                this.renderItem(item, index)
              ))
            }
            <Col md={8} sm={24}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

export default Filter
