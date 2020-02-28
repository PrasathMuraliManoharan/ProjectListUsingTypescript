import { Project, ProjectStatus } from './../models/project-model'
type Listener<T> = (items: T[]) => void;

class State<T>{
    protected listeners: Listener<T>[] = [];
    addListners(listener: Listener<T>) {
        this.listeners.push(listener);
    }

}
export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super()
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, desc: string, numberOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            desc,
            numberOfPeople,
            ProjectStatus.Active)
        this.projects.push(newProject);
        this.updateListners()
    }
    moveProject(projectId: String, newStatus: ProjectStatus) {
        const project = this.projects.find(proj => proj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListners()
        }
    }

    private updateListners() {
        for (const listener of this.listeners) {
            listener(this.projects.slice());
        }
    }
}
export const projectState = ProjectState.getInstance();
