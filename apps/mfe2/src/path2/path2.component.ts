import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-path2',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './path2.component.html',
  styleUrl: './path2.component.css',
})
export class Path2Component {}
