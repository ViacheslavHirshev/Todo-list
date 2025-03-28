export interface IRenderable
{
    _sourceElement: HTMLElement;
    _currentElement: HTMLElement;
    _targetElement: HTMLElement;

    renderContent(): void;
}