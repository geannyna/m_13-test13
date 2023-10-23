import { Component, Input, OnInit} from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent  implements OnInit {
  @Input() todos: Todo[] = [];
  pendingTasksCount: number = 0;

  constructor(public todoService: TodoService) {}

  ngOnInit() {
    this.todoService.pendingTasks$.subscribe(count => {
      this.pendingTasksCount = count;
    }); 
    this.todoService.updatePendingTasksCount(); 
  }
}

