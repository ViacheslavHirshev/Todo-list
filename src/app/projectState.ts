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
        this.getFromLocalStorage();
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

    public saveToLocalStorage(): void
    {
        localStorage.setItem('tasks', JSON.stringify(this._tasks));
    }

    private getFromLocalStorage(): void
    {
        const tasks = localStorage.getItem('tasks');

        if (tasks)
        {
            try
            {
                const parsedTasks = JSON.parse(tasks);
                this._tasks = parsedTasks.map((task: any) => new Task(task._title, new Date(task._dueDate), task._priority, task._description, task._id, task._isCompleted));
            }
            catch (error)
            {
                console.error("Failed to load tasks from local storage");
                this._tasks = [];
            }
        }
    }

    public addTask(task: Task): void
    {
        this._tasks.push(task);
        this.renderTasksByType(this._renderType);

        this.saveToLocalStorage();
    }

    public findTaskByName(title: string): Task | undefined
    {
        return this._tasks.find((task) => task.title === title);
    }

    public findTaskById(id: number): Task | undefined
    {
        return this._tasks.find((task) => task.id === id);
    }

    public removeTask(title: string): void
    {
        const taskIndex = this._tasks.findIndex((task) => title === task.title);

        if (taskIndex !== -1)
        {
            this._tasks.splice(taskIndex, 1);
        }

        localStorage.setItem('tasks', JSON.stringify(this._tasks));
        this.renderTasksByType(this._renderType);
        this.saveToLocalStorage();
    }

    public renderTasksByType(renderType?: RenderType): void
    {
        if (renderType || renderType === 0)
        {
            this._renderType = renderType;
        }

        switch (this._renderType)
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

    private renderTasks(filteredTasks?: Task[]): void
    {
        this.renderTasksTitle();

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

    private renderAll(): void
    {
        this.renderTasks(this._tasks.filter(task => !task._isCompleted && !this.isTaskOutdated(task)));
        this._renderType = 0;
    }

    private renderToday(): void
    {
        const now = new Date();
        const today = this._tasks.filter(task =>
        {
            return (task.dueDate.getFullYear() === now.getFullYear() &&
                task.dueDate.getMonth() === now.getMonth() &&
                task.dueDate.getDay() === now.getDay() &&
                !task._isCompleted) && !this.isTaskOutdated(task);
        });

        this.renderTasks(today);
        this._renderType = 1;
    }

    private renderCompleted(): void
    {
        const completed = this._tasks.filter(task => task._isCompleted && !this.isTaskOutdated(task));
        this.renderTasks(completed);
        this._renderType = 2;
    }

    private renderMissed(): void
    {
        const missed = this._tasks.filter(task => this.isTaskOutdated(task));

        this.renderTasks(missed);
        this._renderType = 3;
    }

    private isTaskOutdated(task: Task): boolean
    {
        const today = new Date();

        return (
            task.dueDate.getFullYear() < today.getFullYear() ||
            (task.dueDate.getFullYear() === today.getFullYear() &&
                task.dueDate.getMonth() < today.getMonth()) ||
            (task.dueDate.getFullYear() === today.getFullYear() &&
                task.dueDate.getMonth() === today.getMonth() &&
                task.dueDate.getDate() < today.getDate())
        ) && !task._isCompleted;
    }

    private renderTasksTitle(): void
    {
        const titleElement = document.querySelector("#tasks-container-title") as HTMLHeadingElement;

        switch (this._renderType)
        {
            case 0:
                titleElement.innerText = "All tasks";
                break;
            case 1:
                titleElement.innerText = "Today tasks";
                break;
            case 2:
                titleElement.innerText = "Completed tasks";
                break;
            case 3:
                titleElement.innerText = "Missed tasks";
                break;

            default:
                titleElement.innerText = "All tasks";
        }
    }
}
