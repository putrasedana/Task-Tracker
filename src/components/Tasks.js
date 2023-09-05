import Task from "./Task";

const Tasks = ({ tasks, deleteTask, toggleReminder }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} toggleReminder={toggleReminder} deleteTask={deleteTask} />
      ))}
    </>
  );
};

export default Tasks;
