import { Component } from '@angular/core';
import { Router } from '@angular/router';
import task from '../task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styles: [':host {width: 100%; display: flex; justify-content: center; align-items: center;}'],
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  constructor(private router: Router) { }
  addTask(name: string, desc: string) {
    if (name.length == 0 || desc.length == 0) {
      alert("all fields are required!!");
      return;
    }
    const newTask = new task();
    newTask.name = name;
    newTask.desc = desc;
    newTask.date = new Date().toLocaleDateString();
    newTask.status = "active";
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    let lastItemID = tasks[tasks.length - 1]?.id || 0;
    newTask.id = lastItemID + 1;
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.router.navigate(['/task-list']);
  }

}
