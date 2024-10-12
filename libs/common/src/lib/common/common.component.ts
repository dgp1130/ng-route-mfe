import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-common',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css',
})
export class CommonComponent {}
