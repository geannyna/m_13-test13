import { Component, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {
  newTodo: string = '';

  @Output() addTodo = new EventEmitter<string>();
   constructor(public todoService: TodoService) {}

  onAddTodo() {
    if (this.newTodo.trim() !== '') {
      this.addTodo.emit(this.newTodo);
      this.todoService.addTodo(this.newTodo);
      this.newTodo = '';
    }
  }
}
