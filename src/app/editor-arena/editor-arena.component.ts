import { Component, Input, OnInit } from '@angular/core';
import { Level } from '../level';

@Component({
  selector: 'app-editor-arena',
  templateUrl: './editor-arena.component.html',
  styleUrls: ['./editor-arena.component.scss']
})
export class EditorArenaComponent implements OnInit {
  @Input()
  level: Level;
  
  constructor() { }

  ngOnInit(): void {
  }

}
