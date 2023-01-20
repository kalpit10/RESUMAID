import React from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

function Certificates(){

    return(
        <div>
            <h5><b>Certificates</b></h5>
            <hr/>
            <Form.List name="certificates">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
            {fields.map(({ key, name, ...restField }) => (
              <>
                <div className="col-md-3">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing name',
                    },
                  ]}
                >
                  <Input placeholder="Certificate title" />
                </Form.Item>
                </div>
                <div className="col-md-4">
                <Form.Item
                  {...restField}
                  name={[name, 'credential']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing credential',
                    },
                  ]}
                >
                  <Input placeholder="Certificate Credential" />
                </Form.Item>
                </div>
                <div className="col-md-2">
                    <MinusCircleOutlined style={{fontSize:23, color:"tomato"}} onClick={() => remove(name)} />
                </div>
              </>
            ))}
            </div>
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Certificates 
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

            <h5><b>Courses</b></h5>
            <hr/>
      <Form.List name="courses">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
            {fields.map(({ key, name, ...restField }) => (
              <>
                <div className="col-md-3">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing name',
                    },
                  ]}
                >
                  <Input placeholder="Course Name" />
                </Form.Item>
                </div>

                <div className="col-md-3">
                <Form.Item
                  {...restField}
                  name={[name, 'organization']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing organization',
                    },
                  ]}
                >
                  <Input placeholder="Organization" />
                </Form.Item>
                </div>

                <div className="col-md-2">
                    <MinusCircleOutlined style={{fontSize:23, color:"tomato"}} onClick={() => remove(name)} />
                </div>
              </>
            ))}
            </div>
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Courses
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
        </div>
    )

}

export default Certificates