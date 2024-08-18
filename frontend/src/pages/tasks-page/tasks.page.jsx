import { Skeleton, Spin, Typography } from 'antd';

import { useGetTasksQuery } from '../../api/tasks.api';
import TaskSaveModal from './task-save.modal';
import TasksColumns from './tasks.columns';

export default function TasksPage() {
  const { data, isLoading, isFetching } = useGetTasksQuery();

  return (
    <>
      <Typography.Title className='text-center'>Tasks</Typography.Title>

      {isLoading ? (
        <Skeleton active />
      ) : (
        <Spin spinning={isFetching}>
          <TasksColumns columns={data} />
        </Spin>
      )}

      <TaskSaveModal />
    </>
  );
}
