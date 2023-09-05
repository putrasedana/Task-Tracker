import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };
    getTasks();
  }, []);

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(task) });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id);
    const updateTask = { ...taskToggle, reminder: !taskToggle.reminder };

    const res = await fetch("http://localhost:5000/tasks/" + id, { method: "PUT", headers: { "Content-type": "application/json" }, body: JSON.stringify(updateTask) });
    const data = await res.json();

    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)));
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAdd(!showAdd)} showAdd={showAdd} />

        <Routes>
          <Route
            path="/"
            exact
            Component={(props) => (
              <>
                {showAdd && <AddTask addTask={addTask} />}
                {tasks.length > 0 ? <Tasks tasks={tasks} toggleReminder={toggleReminder} deleteTask={deleteTask} /> : "There are no tasks"}
              </>
            )}
          />
          <Route path="/about" Component={About} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
