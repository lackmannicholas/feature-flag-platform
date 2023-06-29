import { Button, Input, Radio, Col, Row } from 'antd';
import './../App.css';
import ReactJson from 'react-json-view';

function List({ newFeatureFlag, setNewFeatureFlag, addFeatureFlag }) {
  return (
    <div className='AddFeatureFlag'>
        <Row>
            <Col span={6} offset={8}>
                <Input value={newFeatureFlag.featureKey} placeholder='Feature Key'  onChange={(e) => setNewFeatureFlag({...newFeatureFlag, featureKey: e.target.value})} />
            </Col>
            <Col span={6}>
                <Radio.Group value={newFeatureFlag.targeting} onChange={(e) => setNewFeatureFlag({...newFeatureFlag, targeting: e.target.value})}>
                    <Radio value={true}>On</Radio>
                    <Radio value={false}>Off</Radio>
                </Radio.Group>
            </Col>
        </Row>
        <Row>
            <Col span={6} offset={8}>
                <ReactJson theme="monokai" src={newFeatureFlag?.value} 
                onEdit={(e) => setNewFeatureFlag({ ff: {...newFeatureFlag, value: e.updated_src }})}
                onAdd= {(e) => setNewFeatureFlag({ ff: {...newFeatureFlag, value: e.updated_src }})}
                />
            </Col>
        </Row>
        <Button type="primary" onClick={() => { addFeatureFlag(newFeatureFlag); setNewFeatureFlag(undefined); }}>Save</Button>
    </div>
  );
}

export default List;
