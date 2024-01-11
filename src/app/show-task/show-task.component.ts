import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Task from '../task';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styles: [':host {width: 100%; display: flex; justify-content: center; align-items: center;}'],
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent {
  task: Task;
  tasks: Task[] = [];
  found: boolean = false;
  showUpdateForm: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.task = new Task();
  }

  ngOnInit(): void {
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    let id = this.route.snapshot.params['id'];
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        this.task = this.tasks[i];
        this.found = true;
      }
    }
    if (!this.found) {
      this.router.navigate(['/task-list']);
    }
  }

  deleteTask(id: string) {
    let confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) {
      return;
    }
    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        this.tasks.splice(i, 1);
      }
    }
    console.log(this.tasks)
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.router.navigate(['/task-list']);
  }

  handleUpdate() {
    this.showUpdateForm = !this.showUpdateForm;
    localStorage.setItem('task', JSON.stringify(this.task));
  }

  updateTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.map((t: Task) => {
      if (t.id === this.task.id) {
        return this.task;
      }
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  markAsDone() {
    let confirm = window.confirm('Are you sure you want to mark this task as done?');
    if (!confirm) {
      return;
    }
    this.task.status = "done";
    this.updateTask();
  }
  markAsActive() {
    let confirm = window.confirm('Are you sure you want to mark this task as active?');
    if (!confirm) {
      return;
    }
    this.task.status = "active";
    this.updateTask();
  }
}

