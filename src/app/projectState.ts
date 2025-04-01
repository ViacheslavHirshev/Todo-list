import { TaskComponent } from './Components/taskComponent';
import { Task } from './Entities/task';

export class ProjectState
{
    private static _instance: ProjectState;
    private _tasks: Task[] = [];

    private constructor() 
    {
    }

    public static getInstance(): ProjectState
    {
        if (ProjectState._instance)
        {
            return ProjectState._instance;
        }

        ProjectState._instance = new ProjectState();
        return ProjectState._instance;
    }

    public addTask(task: Task): void
    {
        this._tasks.push(task);
        this.renderTasks();
    }

    public removeTask(title: string): void
    {
        const taskIndex = this._tasks.findIndex((task) => title === task.title);

        if (taskIndex !== -1)
        {
            this._tasks.splice(taskIndex, 1);
        }
    }

    public renderTasks(filteredTasks?: Task[])
    {
        const sourceElement = document.querySelector("#task-template") as HTMLTemplateElement;
        const targetElement = document.querySelector("#tasks") as HTMLDivElement;

        if (!filteredTasks)
        {
            targetElement.innerText = "";
            for (const value of this._tasks)
            {
                const taskComponent = new TaskComponent(sourceElement, targetElement, value);
                taskComponent.renderContent();
            }
        }
        else
        {
            targetElement.innerText = "";
            for (const value of filteredTasks)
            {
                const taskComponent = new TaskComponent(sourceElement, targetElement, value);
                taskComponent.renderContent();
            }
        }
    }

    public get tasks()
    {
        return this._tasks;
    }
}