import { TaskComponent } from './Components/taskComponent';
import { Task } from './Entities/task';

export class ProjectState
{
    private static _instance: ProjectState;
    private _tasks: Task[] = [];
    // private _taskComponents: TaskComponent[] = [];

    private constructor() { }

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
    }

    public removeTask(task: Task): void
    {
        const taskIndex = this._tasks.indexOf(task);
        if (taskIndex !== -1)
        {
            this._tasks.splice(taskIndex, 1);
        }


    }
}