import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host {display: flex; height: 100%;}'],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-manager';
}
