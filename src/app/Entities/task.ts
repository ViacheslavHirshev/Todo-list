type PriorityType = "high" | "medium" | "low";

export class Task
{
    private _title: string;
    private _description?: string;
    private _dueDate: Date;
    private _priority: PriorityType;
    public _isCompleted: boolean;

    constructor(title: string, dueDate: Date, priority: PriorityType, description?: string)
    {
        this._title = title;
        this._dueDate = dueDate;
        this._description = description;
        this._priority = priority;
        this._isCompleted = false;
    }

    public get title()
    {
        return this._title;
    }

    public get description()
    {
        return this._description;
    }

    public get dueDate()
    {
        return this._dueDate;
    }

    public get priority()
    {
        return this._priority;
    }
}