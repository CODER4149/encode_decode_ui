import React, { useState } from "react";
import "antd/dist/antd.css";
import "../App.css";
import { Upload, message, Card, Button, Input, Row, Col, Form } from "antd";
import { FileExcelOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
// const props = {
//   headers: {
//     authorization: "authorization-text",
//   },
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   name: "file",
//   accept: ".xlsx"
// };



export default function Locate() {
    const [size, setSize] = useState("large");
    const [filename, setFilename] = useState("");
    const [fileList, setFileList] = useState();
    const [file, setfile] = useState();
    function uploadFile() {
        console.log(typeof file);
        console.log(typeof filename);
        axios({
            url: API_Path,
            method: "POST",
            params: {
                file: file,
                filename: filename,
            },
        });
    }

    const API_IP_Port = "192.168.1.187:5023";
    const API_Path = API_IP_Port + "/dispatch/dispatch_file_item_excel";

    axios({
        url: API_Path,
        method: "POST",
        // params: {
        //     file: ,
        //     filename: ,
        // }
    });


    function uploadFilesToServer(values) {
        console.log("fileName", fileList[0].originFileObj);
        console.log("friendly_name", values.name);

        let formData = new FormData();


        formData.append("file_name", values.name);

        formData.append("file", fileList[0].originFileObj);

        axios
            .post("localhost:5023/dispatch/dispatch_file_item_excel", formData)
            .then(res => {
                console.log("res", res);
                res.status === 200 ? message.success("File Uploaded Successfully") : message.error("File Upload Failed");
                if (res.status === 200) {
                    setFileList([]);
                }
            })
            .catch(err => {
                message.error("File Upload Failed");
                console.log("err", err);
            });
    }


    return (
        <div className="locate_container">
            <Card
                title="Dump Your File"
                style={{
                    width: "60%",
                }}
            >
                {/* <Divider>Select the Upload Files </Divider>
 <br/> */}

                <Row>
                    <Col span={12}>
                        <Form
                            name="nest-messages"
                            onFinish={(values) => {
                                uploadFilesToServer(values);
                            }}
                        >
                            <Form.Item
                                name={["name"]}
                                label="Name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name={["image"]}
                                label="Image/Video"
                                rules={[{ required: true }]}
                            >
                                <Upload
                                    name="avatar"
                                    accept=".xlsx"
                                    maxCount={1}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={(file) => {
                                        console.log("fileUrl", file.url);
                                        // setImageUrl(file.url);
                                    }}
                                    onChange={({ fileList }) => {
                                        setFileList(fileList);
                                        console.log("fileList", fileList);
                                    }}
                                    beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                                >
                                    {
                                        <div>
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                    }
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    className="btn-btn-size"
                                    type="primary"
                                    shape="round"
                                    size={size}
                                    onClick={uploadFile}
                                >
                                    Call API
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

