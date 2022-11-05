
import './App.css';
import JsonData from './config.json'
import React from 'react';
import Api from './components/Api';

import Api2 from './components/API2';
import Locate from './components/upload';

import { Row, Col, Typography, Layout } from 'antd';

import { Card } from 'antd';
const { Header, Content } = Layout;
const { Title } = Typography;

URL = "http://192.168.1.187:5015"

function App() {
  return (
    <Row justify='center'>
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <Header className='header-fixed'>

          <Row >
            <Col>
              <Title id='title-button' level={4}>
                <h3 style={{ whitespace: "nowrap", color: "white" }}>Encode Decode UI</h3>
              </Title>
            </Col>

          </Row>


        </Header>
        <Content style={{ width: "100%" }}>
          <Row justify='center'>
            <Col >
              <Card className="card"


                style={{
                  width: 500,
                  boxShadow: " 0 2px 1px -1px #0003, 0 1px 1px #00000024, 0 1px 3px #0000001f",
                  display: "flex",
                  flexdirection: "column",
                  alignItems: "center",
                  justifycontent: "center",
                  paddingLeft: "4%",
                  height: "100%"

                }}
              >
                <React.StrictMode>
                  <Api />
                </React.StrictMode>
              </Card>
            </Col>
            <Col >
              <Card className="card"


                style={{
                  width: 500,
                  boxShadow: " 0 2px 1px -1px #0003, 0 1px 1px #00000024, 0 1px 3px #0000001f",
                  display: "flex",
                  flexdirection: "column",
                  alignItems: "center",
                  justifycontent: "center",
                  paddingLeft: "4%",
                  height: "100.2%"


                }}
              >
                <React.StrictMode>
                  <Api2 />
                  {/* <Locate /> */}
                </React.StrictMode>
              </Card>
            </Col>
          </Row>

        </Content>
      </Col>
    </Row>

  );
}




export default App;
