import { useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { api } from '../../api';
import { useReorderTasksMutation } from '../../api/tasks.api';
import TaskColumn from './task.column';

import styles from './tasks.module.css';

export default function TasksColumns({ columns }) {
  const dispatch = useDispatch();
  const [reorderTasks] = useReorderTasksMutation();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the column
    if (!source || !destination) {
      return;
    }

    const newColumns = columns.map(({ title, tasks }) => ({
      title,
      tasks: [...tasks],
    }));

    let reorderedTasks = [];

    if (source.droppableId === destination.droppableId) {
      const sortedColumnIndex = newColumns.findIndex(
        (column) => column.title === source.droppableId
      );

      if (sortedColumnIndex < 0) {
        return;
      }

      const [removed] = newColumns[sortedColumnIndex].tasks.splice(
        source.index,
        1
      );

      newColumns[sortedColumnIndex].tasks.splice(destination.index, 0, removed);
      newColumns[sortedColumnIndex].tasks = newColumns[
        sortedColumnIndex
      ].tasks.map((task, index) => ({ ...task, order: index }));

      reorderedTasks = newColumns[sortedColumnIndex].tasks.map(
        ({ id, order, status }) => ({
          id,
          order,
          status,
        })
      );
    } else {
      const deletedColumnIndex = newColumns.findIndex(
        (column) => column.title === source.droppableId
      );

      const sortedColumnIndex = newColumns.findIndex(
        (column) => column.title === destination.droppableId
      );

      if (deletedColumnIndex < 0 || destination < 0) {
        return;
      }

      const [removed] = newColumns[deletedColumnIndex].tasks.splice(
        source.index,
        1
      );

      newColumns[sortedColumnIndex].tasks.splice(destination.index, 0, removed);

      newColumns[deletedColumnIndex].tasks = newColumns[
        deletedColumnIndex
      ].tasks.map((task, index) => ({
        ...task,
        order: index,
        status: source.droppableId,
      }));

      newColumns[sortedColumnIndex].tasks = newColumns[
        sortedColumnIndex
      ].tasks.map((task, index) => ({
        ...task,
        order: index,
        status: destination.droppableId,
      }));

      reorderedTasks = [
        ...newColumns[deletedColumnIndex].tasks.map(
          ({ id, order, status }) => ({
            id,
            order,
            status,
          })
        ),
        ...newColumns[sortedColumnIndex].tasks.map(({ id, order, status }) => ({
          id,
          order,
          status,
        })),
      ];
    }

    dispatch(api.util.updateQueryData('getTasks', undefined, () => newColumns));
    reorderTasks(reorderedTasks).unwrap();
  };

  return (
    <div className={styles.columnsContainer}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <TaskColumn
            key={column.title}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </DragDropContext>
    </div>
  );
}
