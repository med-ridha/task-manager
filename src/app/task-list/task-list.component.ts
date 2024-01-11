import { Component } from '@angular/core';
import { Router } from '@angular/router';
import task from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: [':host {width: 100%; display: flex; justify-content: center; align-items: center;}'],
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: task[] = [];
  t: task[] = [new task()];
  constructor(
  ) { }

  ngOnInit(): void {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  deleteTask(taskID: string) {
    const bool = confirm("are you sure you want to delete this document? there is no go back from here")
    if (bool) {
      // TODO: Handle delete
    }
  }
}
