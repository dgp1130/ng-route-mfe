import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@ng-route-mfe/common';

@Component({
  selector: 'app-mfe-root',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css',
})
export class RootComponent {}
