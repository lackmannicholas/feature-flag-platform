import { Button } from 'antd';
import './App.css';
import { DeleteOutlined } from '@ant-design/icons';

function List({ featureFlags, onDelete }) {
  return (
    <div className="Feature-List">
        {featureFlags.map((ff, i) => <li key={ff.featureKey}>{ff.featureKey} {ff.value.toString()} <Button onClick={() => onDelete(i)} icon={<DeleteOutlined/>} /></li>)}
    </div>
  );
}

export default List;
