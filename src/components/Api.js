
import '../App.css';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Select } from 'antd';
import axios from "axios";
import 'antd/dist/antd.css';
import config_path from "../App"
import URL from "../App"
// const { useState } = React;
var varbase_url = "http://10.129.2.209:5066"
const { Option } = Select;
const Api2 = () => {

  let [epc, SetBar] = useState("")
  const onFinish = (values) => {
    console.log(config_path);
    console.log('Success:', values);
    axios({
      url: varbase_url + "/encoding/encode_barcode",
      method: "GET",
      params: {
        barcode: values.barcode,
        sn_no: values.serial_no,
        encoding_type: parseInt(values.type)

      },
      // Attaching the form data

    }).then((res) => {
      console.log(res.data.barcode)
      // barcode_ = res.data.barcode
      if (res.status === 200) {
        message.success(res);
        values.barcode = "e"
        SetBar(res.data.EPC)

      } else {
        SetBar("Please choose valid logic")
      }

    }).catch((err) => {
      SetBar("Please choose valid logic")
      console.log(err.message)
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);

  };

  return (

    <Form
      title="Barcode to EPC"
      name="barcode_to_epc"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Barcode"
        name="barcode"
        rules={[
          {
            required: true,
            message: 'Please insert your EPC!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Serial No"
        name="serial_no"
        rules={[
          {
            required: true,
            message: 'Please insert your EPC!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Logic"
        name="type"

        wrapperCol={{

          span: 16,
        }}
      >
        <Select
          style={{
            width: 150
          }}



        >
          <Option value="1">SGTIN 96</Option>
          <Option value="2">Custom Chunmun</Option>
          <Option value="3" >
            Calvin Klein
          </Option>
          <Option value="4">
            Kohinoor
          </Option>
          <Option value="5">
            SILA
          </Option>
          <Option value="6">
            BERGENER
          </Option>
          <Option value="7">
            BOX
          </Option>

        </Select>
      </Form.Item>
      {/* <Form.Item
        label="barcode"
        name="barcode"

        rules={[
          {
            required: false,
            message: 'Please input your Barcode!',
          },
        ]}
      > */}
      <h3>Barcode: <mark>{epc}</mark> </h3>
      {/* </Form.Item> */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

  );
};



export default Api2;