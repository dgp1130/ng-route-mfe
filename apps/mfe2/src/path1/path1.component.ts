import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@ng-route-mfe/common';

@Component({
  selector: 'app-path1',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './path1.component.html',
  styleUrl: './path1.component.css',
})
export class Path1Component {}
