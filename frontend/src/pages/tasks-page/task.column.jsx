import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import TaskItem from './task.item';
import { openSaveModal } from './tasks.slice';

import styles from './tasks.module.css';

export default function TaskColumn({ title, tasks }) {
  const dispatch = useDispatch();

  const handleCreateTaskButtonClick = (task) => {
    dispatch(openSaveModal(task));
  };

  return (
    <Droppable droppableId={title} >
      {(provided, _) => (
        <div
          className={styles.column}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3 className={styles.columnTitle}>{title}</h3>
          {tasks.map((task, index) => (
            <TaskItem key={`${task.id}`} index={index} task={task} />
          ))}
          {provided.placeholder}
          <Button
            block
            icon={<PlusCircleOutlined />}
            onClick={() =>
              handleCreateTaskButtonClick({
                status: title,
                order: tasks.length,
              })
            }
          />
        </div>
      )}
    </Droppable>
  );
}
