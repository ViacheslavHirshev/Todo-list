import "../styles/style.css";
import { Task } from "./Entities/task";
import { TaskComponent } from "./Components/taskComponent";

const task1 = new Task("Test task1", new Date(), "medium");

const taskTemplate = document.querySelector("#task-template") as HTMLTemplateElement;
const targetElement = document.querySelector("main") as HTMLElement;

const taskComponent = new TaskComponent(taskTemplate, targetElement, task1);
