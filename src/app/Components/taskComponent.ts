import { IRenderable } from "../interfaces/iRenderable";
import { Task } from "../Entities/task";

export class TaskComponent implements IRenderable
{
    private _sourceElement: HTMLTemplateElement;
    private _currentElement: HTMLDivElement;
    private _targetElement: HTMLElement;
    private _task: Task;
    private _status: HTMLInputElement;

    constructor(sourceElement: HTMLTemplateElement, targetElement: HTMLElement, task: Task)
    {
        this._sourceElement = sourceElement;
        this._targetElement = targetElement;
        this._currentElement = this._sourceElement?.content.firstElementChild?.cloneNode(true) as HTMLDivElement;
        this._task = task;
        this._status = this._currentElement?.querySelector(".task-status") as HTMLInputElement;

        this.configure();
    }

    public renderContent(): void
    {
        const taskTitle = this._currentElement.querySelector(".task-title") as HTMLSpanElement;
        taskTitle.innerText = this._task.title;

        const taskDueDate = this._currentElement.querySelector(".task-due-date") as HTMLSpanElement;
        taskDueDate.innerText = this._task.dueDate.toDateString();

        const taskPriority = this._currentElement.querySelector(".task-priority") as HTMLSpanElement;
        taskPriority.innerText = this._task.priority;

        const taskStatusLabel = this._currentElement.querySelector(".task-status-label") as HTMLLabelElement;

        if (this._task._isCompleted)
        {
            this._status.checked = true;
            taskStatusLabel.innerText = "Completed";
        }
        else
        {
            this._status.checked = false;
            taskStatusLabel.innerText = "Not completed";
        }

        this._targetElement.append(this._currentElement);
    }

    private configure()
    {
        this._status.addEventListener("click", this.update.bind(this));
    }

    private update()
    {
        const taskStatusLabel = this._currentElement.querySelector(".task-status-label") as HTMLLabelElement;

        if (this._status.checked)
        {
            this._task._isCompleted = true;
            taskStatusLabel.innerText = "Completed";
        }
        else
        {
            this._task._isCompleted = false;
            taskStatusLabel.innerText = "Not completed";
        }
    }
}