import { Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '../../api/tasks.api';
import TaskSaveForm from './task-save.form';
import { closeSaveModal, selectTasksState } from './tasks.slice';

export default function TaskSaveModal() {
  const dispatch = useDispatch();
  const { isOpenSaveModal, selectedTask } = useSelector(selectTasksState);

  const [formInstance, setFormInstance] = useState();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleSubmit = (values) => {
    const saveTask = { ...selectedTask, ...values };

    if (selectedTask?.id) {
      updateTask(saveTask).unwrap();
    } else {
      createTask(saveTask).unwrap();
    }

    dispatch(closeSaveModal());
  };

  return (
    <Modal
      destroyOnClose
      title='Task'
      open={isOpenSaveModal}
      onOk={formInstance?.submit}
      onCancel={() => dispatch(closeSaveModal())}
    >
      <TaskSaveForm
        selectedTask={selectedTask}
        onSubmit={handleSubmit}
        onFormInstanceReady={setFormInstance}
      />
    </Modal>
  );
}
