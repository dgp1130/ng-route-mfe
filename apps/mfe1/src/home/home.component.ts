import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@ng-route-mfe/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
