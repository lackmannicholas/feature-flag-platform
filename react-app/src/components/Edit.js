import { Button, Input, Radio } from 'antd';
import './../App.css';
import { SaveOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import ReactJson from 'react-json-view'

function Edit({onUpdate, editFeatureFlag, setEditFeatureFlag }) {
    let updatedFF = cloneDeep(editFeatureFlag?.ff);
    return (
        <div className="Edit-Feature-Flag">
            <Input 
                value={updatedFF?.featureKey} 
                placeholder='Feature Key'  
                onChange={(e) => setEditFeatureFlag({ ff: {...updatedFF, featureKey: e.target.value}, i: editFeatureFlag?.i})} 
            />
            <Radio.Group 
                value={updatedFF?.targeting} 
                onChange={(e) => setEditFeatureFlag({ ff: {...updatedFF, targeting: e.target.value}, i: editFeatureFlag?.i})}
            >
                <Radio value={true}>On</Radio>
                <Radio value={false}>Off</Radio>
            </Radio.Group>
            <ReactJson theme="monokai" src={updatedFF?.value} 
            onEdit={(e) => setEditFeatureFlag({ ff: {...updatedFF, value: e.updated_src }, i: editFeatureFlag?.i})}
            onAdd= {(e) => setEditFeatureFlag({ ff: {...updatedFF, value: e.updated_src }, i: editFeatureFlag?.i})}
            />
            <Button onClick={() => onUpdate(updatedFF, editFeatureFlag?.i)} icon={<SaveOutlined/>} />
        </div>
    );
}

export default Edit;


