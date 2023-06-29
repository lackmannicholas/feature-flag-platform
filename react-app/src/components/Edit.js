import { Button, Input, Radio, Col, Row } from 'antd';
import './../App.css';
import { SaveOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import ReactJson from 'react-json-view';

function Edit({onUpdate, editFeatureFlag, setEditFeatureFlag }) {
    let updatedFF = cloneDeep(editFeatureFlag?.ff);
    return (
        <div className="Edit-Feature-Flag">
            <Row>
                <Col span={6} offset={8}>
                    <Input 
                        value={updatedFF?.featureKey} 
                        placeholder='Feature Key'  
                        onChange={(e) => setEditFeatureFlag({ ff: {...updatedFF, featureKey: e.target.value}, i: editFeatureFlag?.i})} 
                    />
                </Col>
                <Col span={6}>
                    <Radio.Group 
                        value={updatedFF?.targeting} 
                        onChange={(e) => setEditFeatureFlag({ ff: {...updatedFF, targeting: e.target.value}, i: editFeatureFlag?.i})}
                    >
                        <Radio value={true}>On</Radio>
                        <Radio value={false}>Off</Radio>
                    </Radio.Group>
                </Col>
                <Col>
                    <Button onClick={() => onUpdate(updatedFF, editFeatureFlag?.i)} icon={<SaveOutlined/>} />
                </Col>
            </Row>
            <Row>
                <Col span={6} offset={8}>
                    <ReactJson theme="monokai" src={updatedFF?.value} 
                    onEdit={(e) => setEditFeatureFlag({ ff: {...updatedFF, value: e.updated_src }, i: editFeatureFlag?.i})}
                    onAdd= {(e) => setEditFeatureFlag({ ff: {...updatedFF, value: e.updated_src }, i: editFeatureFlag?.i})}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Edit;


