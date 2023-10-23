import { Component } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  newTodo: string = '';
  pendingTasksCount: number = 0;

  constructor(public todoService: TodoService) {  }

  addTodo(newTodo: string) {
    const todo: Todo = {
      id: this.todos.length + 1,
      title: newTodo,
      description: "Descripción opcional",
      completed: false,
    };
    this.todos.push(todo);
    this.todoService.updatePendingTasksCount();
  }
  removeTodo(todo: Todo) {
    this.todos = this.todos.filter((t) => t !== todo);
    this.todoService.pendingTasksSubject.next(this.todoService.pendingTasksSubject.value - 1);
    // this.todoService.updatePendingTasksCount();
  }
}

