import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
import { NoteService } from 'src/app/Services/NoteService/note.service';

@Component({
  selector: 'app-gettrash',
  templateUrl: './gettrash.component.html',
  styleUrls: ['./gettrash.component.scss'],
})
export class GettrashComponent implements OnInit {
  constructor(
    private noteservice: NoteService,
    private snack: MatSnackBar,
    private data: DataserviceService
  ) {}

  trashNotes = [];
  ngOnInit(): void {
    this.getTrash();
    this.data.currentMessage.subscribe((change) => {
      if (change == true) {
        this.getTrash();
        this.data.changeMessage(false);
      }
    });
  }

  getTrash() {
    this.noteservice.getTrash().subscribe((result: any) => {
      this.trashNotes = result.data;
      console.log(result.data);
    });
  }

  restore(note: any) {
    this.noteservice.restore(note.notesId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }

  deleteFromTrash(note: any) {
    console.log(note)
    this.noteservice
      .deleteFromTrash(note.notesId).subscribe((result: any) => {
        this.data.changeMessage(true);
        this.snack.open(result.message, '', { duration: 3000 });
      });
  }

  emptyTrash() {
    var user = JSON.parse(localStorage.getItem('FundooUser')!)
    this.noteservice.emptyTrash(user.userId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }
}
