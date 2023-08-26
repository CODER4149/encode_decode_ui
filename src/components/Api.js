
import '../App.css';
import { Alert, Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Select } from 'antd';
import axios from "axios";
import 'antd/dist/antd.css';
import config_path from "../App"
import { BASE_URL } from '..';
import { CopyOutlined } from '@ant-design/icons';
const { Option } = Select;
const Api2 = () => {
    let [epc, SetBar] = useState("")
    const onFinish = (values) => {
        console.log(config_path);
        axios({
            url: BASE_URL + "/encoding/encode_barcode",
            method: "GET",
            params: {
                barcode: values.barcode,
                sn_no: values.serial_no,
                encoding_type: parseInt(values.type)

            },
        }).then((res) => {
            console.log(res.data.barcode)
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

    async function copyToClipboard() {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(epc);
                alert(`Text Copied : ${epc}`);
            } else {
                let textArea = document.createElement("textarea");
                textArea.value = epc;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                alert(`Text Copied : ${epc}`);
                return new Promise((res, rej) => {
                    document.execCommand("copy") ? res() : rej();
                    textArea.remove();
                });
            }
            // await navigator.clipboard.writeText(epc);

        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className='flex flex-col w-full max-w-[500px] mx-auto items-center bg-gray-50 rounded-lg shadow-md mt-20 p-5'>
            <h1 className='font-sans font-medium text-lg underline mb-8'>Barcode To EPC</h1>
            <Form
                className='grid grid-cols-2 gap-5'
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
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
                >
                    <Select>
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
                {/* </Form.Item> */}
                <Form.Item
                    label=" "
                >
                    <Button className='w-full' type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div className='flex justify-between items-center mt-5' onClick={() => copyToClipboard()}>
                <h3><span className='font-medium text-lg'>EPC: </span><mark className='text-black font-bold text-xl bg-yellow-200'>{epc ? epc : "-"}</mark> </h3>
                {epc && <CopyOutlined className='-mt-2' size={24} />}
            </div>
        </div>
    );
};



export default Api2;