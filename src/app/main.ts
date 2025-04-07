import "../styles/style.css";
import { TaskNavBar } from "./taskNavBar";
import { TaskInputForm } from "./Forms/taskInputForm";
import { ProjectState } from "./projectState";

const taskInput = new TaskInputForm();
const taskNavBar = new TaskNavBar();

const prjState = ProjectState.getInstance();
prjState.renderTasksByType(0);

//TODO Provide local storage