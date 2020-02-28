//Project List class
import { Component } from './base-component';
import { DragTarget } from './../models/drag-drop';
import { autobind } from './../decorators/autobind';
import { projectState } from './../state/project-state';
import { ProjectListItem } from './project-list-item';
import { ProjectStatus, Project } from './../models/project-model'
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    assignedProject: Project[] = [];
    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`)
        this.configure()
        this.renderContent()
    }
    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @autobind
    dropHandler(event: DragEvent) {
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
    }

    @autobind
    dragLeaveHandler(event: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        projectState.addListners((projectList: Project[]) => {
            this.assignedProject = projectList.filter(item => {
                if (this.type === 'active') {
                    return item.status === ProjectStatus.Active
                }

                return item.status === ProjectStatus.Finished;
            });
            this.renderProjects();
        })
    }
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projItem of this.assignedProject) {
            new ProjectListItem(this.element.querySelector('ul')!.id, projItem)
            // const listItem = document.createElement('li');
            // listItem.textContent = projItem.title;
            // listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} Projects`
    }
}