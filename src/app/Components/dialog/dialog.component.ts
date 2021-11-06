import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NoteService } from 'src/app/Services/NoteService/note.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  colab_email: any = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteservice: NoteService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {}

  changeText(event: any) {
    return event.target.value;
  }

  addColab(colab: any) {
    if (colab != this.user.emailid) {
      console.log(colab);
      this.data.collab.push({ receiverEmailid: colab });
    } else {
      this.snack.open('Owner Exists !', '', { duration: 3000 });
    }
  }

  save() {
    this.dialogRef.close(this.data.collab);
  }

  close() {
    this.data.collab = [];
    this.dialogRef.close(this.data.collab);
  }

  clear(colab: any) {
    if (this.data.delete == true) {
      console.log('remove');
      this.delete(colab.collaboratorId);
    }
    this.data.collab.splice(this.data.collab.indexOf(colab), 1);
  }

  delete(colab: any) {
    console.log(colab);
    this.noteservice.deleteColab(colab).subscribe((result: any) => {
      //colab.console.log(result);
    });
  }
}
