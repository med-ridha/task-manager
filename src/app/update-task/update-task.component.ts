import { Component, EventEmitter, Input, Output } from '@angular/core';
import Task from '../task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styles: [':host {position:absolute; top: 35%;width: 100%; display: flex; justify-content: center; align-items: center;}'],
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {
  task: Task = new Task();
  @Input() update: boolean = true;
  @Output() updateChange = new EventEmitter<boolean>();
  constructor() { }
  ngOnInit(): void {
    this.task = JSON.parse(localStorage.getItem('task') || '{}');
  }

  cancelUpdate() {
    this.updateChange.emit(false);
  }
  updateTask() {
    let confirm = window.confirm('Are you sure you want to update this task?');
    if (!confirm) {
      return;
    }
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.map((t: Task) => {
      if (t.id === this.task.id) {
        return this.task;
      }
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.reload();
  }
}
