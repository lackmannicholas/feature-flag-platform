import { Button, Col, Row } from 'antd';
import './../App.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Edit from './Edit';

function List({ featureFlags, onDelete, onUpdate }) {
    const [editFeatureFlag, setEditFeatureFlag] = useState();
    const update = (ff, i) => {
        setEditFeatureFlag();
        onUpdate(ff, i);
    }
  return (
    <div className="Feature-List">
        {featureFlags.map((ff, i) => 
            (editFeatureFlag?.i === i && 
            <Row key={ff.featureKey}  gutter={16} >
                <Col span={12} offset={6}>
                 <Edit editFeatureFlag={editFeatureFlag} setEditFeatureFlag={setEditFeatureFlag} i={i} onUpdate={update}/>
                 </Col>
            </Row>)
            ||
            (editFeatureFlag?.i !== i &&
            <Row key={ff.featureKey} gutter={16}>
                <Col span={2} offset={8}>
                    {ff.featureKey} 
                </Col>
                <Col span={1}>
                    {ff.targeting === false ? "Off" : "On"} 
                </Col>
                <Col span={1}>
                    <Button onClick={() => setEditFeatureFlag({ ff, i })} icon={<EditOutlined/>} />
                </Col>
                <Col span={1}>
                    <Button onClick={() => onDelete(i)} icon={<DeleteOutlined/>} />
                </Col>
            </Row>)
        )}
    </div>
  );
}

export default List;
