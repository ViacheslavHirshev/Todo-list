import { IRenderable } from "../interfaces/iRenderable";
import { Task } from "../Entities/task";

export class TaskComponent implements IRenderable
{
    private _sourceElement: HTMLTemplateElement;
    private _currentElement: HTMLDivElement;
    private _targetElement: HTMLElement;
    private _task: Task;

    constructor(sourceElement: HTMLTemplateElement, targetElement: HTMLElement, task: Task)
    {
        this._sourceElement = sourceElement;
        this._targetElement = targetElement;
        this._currentElement = this._sourceElement?.content.cloneNode(true) as HTMLDivElement;
        this._task = task;
    }

    public renderContent(): void
    {
        const taskTitle = this._currentElement.querySelector(".task-title") as HTMLSpanElement;
        taskTitle.innerText = this._task.title;

        const taskDueDate = this._currentElement.querySelector(".task-due-date") as HTMLSpanElement;
        taskDueDate.innerText = this._task.dueDate.toDateString();

        const taskPriority = this._currentElement.querySelector(".task-priority") as HTMLSpanElement;
        taskPriority.innerText = this._task.priority;

        this._targetElement.append(this._currentElement);
    }

}