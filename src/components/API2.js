
import '../App.css';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Select } from 'antd';
import axios from "axios";
import 'antd/dist/antd.css';
import { CopyOutlined } from '@ant-design/icons';
// const { useState } = React;
var varbase_url = "http://10.129.2.209:5066"
const { Option } = Select;
const Api = () => {

    let [barcode_, SetBar] = useState("")
    const onFinish = (values) => {
        console.log('Success:', values);
        axios({
            url: varbase_url + "/encoding/verify_tag_type",
            method: "GET",
            params: {
                epc: values.epc,
                encoding_type: parseInt(values.type)

            },
            // Attaching the form data

        }).then((res) => {
            console.log(res.data.barcode)
            // barcode_ = res.data.barcode
            if (res.status === 200) {
                message.success(res);
                values.barcode = "e"
                SetBar(res.data.barcode['product_code'])

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

    async function copyToClipboard() {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(barcode_);
                alert(`Text Copied : ${barcode_}`);
            } else {
                let textArea = document.createElement("textarea");
                textArea.value = barcode_;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                alert(`Text Copied : ${barcode_}`);
                return new Promise((res, rej) => {
                    document.execCommand("copy") ? res() : rej();
                    textArea.remove();
                });
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className='flex flex-col w-full max-w-[500px] mx-auto items-center bg-gray-50 rounded-lg shadow-md mt-20 p-5'>
            <h1 className='font-sans font-medium text-lg underline mb-8'>EPC To Product Code</h1>
            <Form
                className='grid grid-cols-2 gap-5'
                layout='vertical'
                name="epc_to_barcode"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="EPC"
                    name="epc"
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
                >
                    <Select>
                        <Option value="1">SGTIN 96</Option>
                        <Option value="2">Custom Chunmun</Option>
                        <Option value="3">
                            Calvin Klein
                        </Option>
                        <Option value="4">
                            KD
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

                <div></div>

                <Form.Item label=" ">
                    <Button className='w-full' type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div className='flex justify-between items-center mt-5' onClick={() => copyToClipboard()}>
                <h3><span className='font-medium text-lg'>Barcode: </span><mark className='text-black font-bold text-xl bg-yellow-200'>{barcode_ ? barcode_ : "-"}</mark> </h3>
                {barcode_ && <CopyOutlined className='-mt-2' size={24} />}
            </div>
        </div>

    );
};



export default Api;