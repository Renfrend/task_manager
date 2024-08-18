export default function groupTasks(tasks) {
  const groupedTasks = {
    Stop: [],
    Active: [],
    Plan: [],
    Present: [],
  };

  for (const task of tasks) {
    if (groupedTasks.hasOwnProperty(task.status)) {
      groupedTasks[task.status].push(task);
    }
  }

  const columns = [];

  for (const status in groupedTasks) {
    columns.push({ title: status, tasks: groupedTasks[status] });
  }

  return columns;
}
