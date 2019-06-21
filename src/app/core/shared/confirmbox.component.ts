import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html'
})
export class ConfirmboxComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmboxComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
