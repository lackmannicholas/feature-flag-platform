import { Button, Input, Radio, Col, Row } from 'antd';
import './../App.css';

function List({ newFeatureFlag, setNewFeatureFlag, addFeatureFlag }) {
  return (
    <div className='AddFeatureFlag'>
        <Row>
            <Col span={6}>
                <Input value={newFeatureFlag.featureKey} placeholder='Feature Key'  onChange={(e) => setNewFeatureFlag({...newFeatureFlag, featureKey: e.target.value})} />
            </Col>
            <Col span={6}>
                <Radio.Group value={newFeatureFlag.targeting} onChange={(e) => setNewFeatureFlag({...newFeatureFlag, targeting: e.target.value})}>
                    <Radio value={true}>On</Radio>
                    <Radio value={false}>Off</Radio>
                </Radio.Group>
            </Col>
        </Row>
        
        <Button type="primary" onClick={() => { addFeatureFlag(newFeatureFlag); setNewFeatureFlag(undefined); }}>Save</Button>
    </div>
  );
}

export default List;
