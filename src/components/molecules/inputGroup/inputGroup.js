import { Component } from "../../../core";
import { todoList } from "../../../services/todolist/TodoList";
import '../../atoms/input/input';
import '../../atoms/Button/Button';


export class InputGroup extends Component {

    constructor() {
        super();
        this.state = {
            inputValue: '',
            isLoading: false,
            error: '',
        }
    }

    onSave() {
        if(this.state.inputValue){
            this.setState((state) => {
                return{
                    ...state,
                    isLoading: true
                }
            })
            todoList.createTask({
                title: this.state.inputValue,
                isCompleted: false
            }).then(() => {

            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                this.setState((state) => {
                    return{
                        ...state,
                        isLoading: false
                    }
                })
            })
        }
    }

    onInput(evt) {
        this.setState((state) => {
            return {
                ...state,
                inputValue: evt.detail.value
            }
        })
    }

    componentDidMount() {
        this.addEventListener('save-task', this.onSave);
        this.addEventListener('custom-input', this.onInput);
    }


    render () {
       return `
        <div class="input-group mb-3">
        <my-input value="${this.state.inputValue}" placeholder="Add a new Task" type="text"></my-input>
        <my-button eventtype='save-task' content="Save" className="btn btn-outline-primary"></my-button>
      </div>
        `
    }
}
customElements.define('my-input-group', InputGroup)