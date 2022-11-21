import {Database} from "../database/Database";
class TodoList {
    constructor(){
        this.database = Database.getInstance();
    }

    createTask(body) {
        // throw new Error('Server is not available') //ошибка вывод, нид еще в кэч
       return this.database.create('tasks', body);
    }

    getTasks() {
        return this.database.read('tasks');
    }
}

export const todoList = new TodoList();