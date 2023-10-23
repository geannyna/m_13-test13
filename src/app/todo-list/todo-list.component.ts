import { Component, Input} from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent {
  @Input() todos: Todo[] = [];
  pendingTasksCount: number = 0;

  constructor(public todoService: TodoService) { }

  addTodo(newTodo: string) {
    this.todoService.addTodo(newTodo);
    this.todoService.updatePendingTasksCount();
  }

  markAsCompleted(index: number) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].completed = true;
    }
    this.todoService.updatePendingTasksCount();
  }
  
  toggleCompletion(todo: Todo) {
    if (!todo.completed) {
      // Solo resta 1 si la tarea se marca como completada y estaba pendiente
      this.todoService.pendingTasksSubject.next(this.todoService.pendingTasksSubject.value - 1);
    }
    todo.completed = !todo.completed;
  }

  removeTodo(todo: Todo) {
    console.log('Before remove:', this.todos);
    this.todos = this.todos.filter((t) => t !== todo);
    this.todoService.pendingTasksSubject.next(this.todoService.pendingTasksSubject.value - 1);
    
    console.log('After remove:', this.todos, 'contador:', this.pendingTasksCount);
  }
}
