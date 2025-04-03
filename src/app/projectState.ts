import { TaskComponent } from './Components/taskComponent';
import { Task } from './Entities/task';

enum RenderType
{
    All,
    Today,
    Completed,
    Missed
}

export class ProjectState
{
    private static _instance: ProjectState;
    private _tasks: Task[] = [];

    private _renderType: RenderType = 0;

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

        this.renderTasksByType(this._renderType);
    }

    public renderTasksByType(renderType: RenderType): void
    {
        this._renderType = renderType;

        switch (renderType)
        {
            case RenderType.All:
                this.renderAll();
                break;
            case RenderType.Completed:
                this.renderCompleted();
                break;
            case RenderType.Today:
                this.renderToday();
                break;
            case RenderType.Missed:
                this.renderMissed();
                break;

            default:
                return;
        }
    }

    private renderTasks(filteredTasks?: Task[])
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

    private renderAll()
    {
        this.renderTasks(this._tasks.filter(task => !task._isCompleted));
    }

    private renderToday()
    {
        const now = new Date();
        const today = this._tasks.filter(task =>
        {
            return (task.dueDate.getFullYear() === now.getFullYear() &&
                task.dueDate.getMonth() === now.getMonth() &&
                task.dueDate.getDay() === now.getDay() &&
                !task._isCompleted);
        });

        this.renderTasks(today);
    }

    private renderCompleted()
    {
        const completed = this._tasks.filter(task => task._isCompleted);
        this.renderTasks(completed);
        this._renderType = 2;
    }

    private renderMissed()
    {
        const today = new Date();
        const missed = this._tasks.filter(task =>
        {
            return (task.dueDate.getFullYear() < today.getFullYear() ||
                task.dueDate.getMonth() < today.getMonth() ||
                task.dueDate.getDay() < today.getDay() &&
                !task._isCompleted);
        });

        this.renderTasks(missed);
    }
}
