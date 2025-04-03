import "../styles/style.css";
import { TaskNavBar } from "./taskNavBar";
import { TaskInputForm } from "./Forms/taskInputForm";
import { ProjectState } from "./projectState";
import { Task } from "./Entities/task"

const taskInput = new TaskInputForm();
const taskNavBar = new TaskNavBar();

//TODO Task editing
//TODO Task deleting
//TODO Style all this shit

const task1 = new Task("qwe", new Date(), "high");
const task2 = new Task("ewq", new Date(), "low");
const task3 = new Task("abc", new Date(), "medium");
const task4 = new Task("cba", new Date(), "high");

ProjectState.getInstance().addTask(task1);
ProjectState.getInstance().addTask(task2);
ProjectState.getInstance().addTask(task3);
ProjectState.getInstance().addTask(task4);