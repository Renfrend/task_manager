import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex, Popconfirm } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import { useDeleteTaskMutation } from '../../api/tasks.api';
import { openSaveModal } from './tasks.slice';

import styles from './tasks.module.css';

export default function TaskItem({ index, task }) {
  const dispatch = useDispatch();
  const [deleteTask] = useDeleteTaskMutation();

  const handleUpdateTaskButtonClick = (task) => {
    dispatch(openSaveModal(task));
  };

  const handleDeleteTask = async () => {
    await deleteTask({ id: task.id }).unwrap();
  };

  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.columnItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? '#ffe58f' : null,
          }}
        >
          <h5 className={styles.columnItemTitle}>{task.title}</h5>
          <p className={styles.columnItemText}>{task.text}</p>
          <Flex
            className={styles.columnItemButtonWrapper}
            gap='small'
            justify='flex-end'
          >
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={() => handleUpdateTaskButtonClick(task)}
            />
            <Popconfirm
              title='Delete the task'
              description='Are you sure to delete this task?'
              okText='Yes'
              cancelText='No'
              onConfirm={handleDeleteTask}
            >
              <Button danger type='primary' icon={<DeleteOutlined />} />
            </Popconfirm>
          </Flex>
        </div>
      )}
    </Draggable>
  );
}
