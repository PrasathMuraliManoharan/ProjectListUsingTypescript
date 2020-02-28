//ProjectInput Class
import { Component } from './base-component';
import { validate } from '../utils/validate';
import { autobind } from './../decorators/autobind';
import { projectState } from './../state/project-state';
export class Projectinput extends Component<HTMLDivElement, HTMLFormElement>{

    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement
    constructor() {
        super('project-input', 'app', true, 'user-input')
        this.titleElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();
    }

    configure() {
        console.log('tst')


        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    @autobind
    submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherInput()
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people)
            this.clearInputs();
        }
    }

    gatherInput(): [string, string, number] | void {
        const titleVal = this.titleElement.value;
        const descriptorVal = this.descriptionElement.value;
        const peopleVal = this.peopleElement.value;

        if (!(validate({ value: titleVal, required: true }) &&
            validate({ value: descriptorVal, required: true, minLength: 5 }) &&
            validate({ value: peopleVal, required: true, min: 1 }))) {
            alert('Invalid Input!')
            return;
        } else {
            // return [titleVal, descriptorVal, +peopleVal]
            projectState.addProject(titleVal, descriptorVal, +peopleVal)
        }

    }

    private clearInputs() {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }
}