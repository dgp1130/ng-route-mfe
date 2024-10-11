import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-path3',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './path3.component.html',
  styleUrl: './path3.component.css',
})
export class Path3Component {}
