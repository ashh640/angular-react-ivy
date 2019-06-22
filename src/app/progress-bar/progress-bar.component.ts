import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  /** The value to display in the progress bar */
  @Input() value: number;

  /** Emit when the value changes */
  @Output() valueChange = new EventEmitter<number>();

  /** Update the value by an amount and emit the changes */
  updateValue(amount: number): void {
    this.value += amount;
    this.valueChange.next(this.value);
  }
}
