import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  public pendingTasksSubject = new BehaviorSubject<number>(0);
  pendingTasks$: Observable<number> = this.pendingTasksSubject.asObservable();

  public updatePendingTasksCount() {
    const pendingTasks = this.todos.filter((todo) => !todo.completed).length;
      this.pendingTasksSubject.next(pendingTasks);
    }
  
  addTodo(newTodo: string) {
    const todo: Todo = {
      id: this.todos.length + 1,
      title: newTodo,
      description: "Descripción opcional",
      completed: false,
    };
    this.todos.push(todo);
    this.updatePendingTasksCount();
  }
  
  getTodos(): Todo[] {
    return this.todos;
  }
  
    markAsCompleted(index: number) {
      if (index >= 0 && index < this.todos.length) {
        this.todos[index].completed = true;
      }
      this.updatePendingTasksCount();
    }

  toggleCompletion(todo: Todo) {
    if (!todo.completed) {
      
      this.pendingTasksSubject.next(this.pendingTasksSubject.value - 1);
    }
    todo.completed = !todo.completed;
  }
  
  removeTodo(todo: Todo) {
    this.todos = this.todos.filter((t) => t !== todo);
   
    this.pendingTasksSubject.next(this.pendingTasksSubject.value - 1);
    this.updatePendingTasksCount();
  }
}

