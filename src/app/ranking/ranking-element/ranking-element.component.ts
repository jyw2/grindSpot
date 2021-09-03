import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-element',
  templateUrl: './ranking-element.component.html',
  styleUrls: ['./ranking-element.component.css']
})
export class RankingElementComponent implements OnInit {
  //an element on a ranking set
  @Input() public name:string
  @Output() clickedEmit = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  clicked(){
    this.clickedEmit.emit(this.name)
  }

}
