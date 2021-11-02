import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/Services/NoteService/note.service';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';


@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  Name = '';
  Email = '';
  dispNote = false;
  colourArr = [
    { colour: 'white', tooltip: 'White' },
    { colour: '#f28b82', tooltip: 'Red' },
    { colour: '#fbbc04', tooltip: 'Orange' },
    { colour: '#fff475', tooltip: 'Yellow' },
    { colour: '#ccff90', tooltip: 'Green' },
    { colour: '#a7ffeb', tooltip: 'Teal' },
    { colour: '#cbf0f8', tooltip: 'Blue' },
    { colour: '#aecbfa', tooltip: 'Dark Blue' },
    { colour: '#d7aefb', tooltip: 'Purple' },
    { colour: '#fdcfe8', tooltip: 'Pink' },
    { colour: '#e6c9a8', tooltip: 'Brown' },
    { colour: '#e8eaed', tooltip: 'Gray' },
  ];
  tickcolor = 'white';
  setColor = 'white';

  constructor(
    private noteservice: NoteService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private data: DataserviceService
  ) {}

  @Input() notes!: any;

  ngOnInit(): void {
    this.getFromLocalStorage();
  }
  async getFromLocalStorage() {
    var user = JSON.parse(localStorage.getItem('FundooUser')!);
    this.Name = user.userName;
    this.Email = user.emailId;
  }

  addTrash(note: any) {
    console.log(note.notesId);
    this.noteservice.addTrash(note.notesId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }

  archive(notes: any) {
    this.noteservice.archive(notes.notesId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }

  unarchive(notes: any) {
    this.noteservice.unarchive(notes.notesId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }

  pin(notes: any) {
    this.noteservice.pin(notes.notesId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }

  unpin(notes: any) {
    this.noteservice.unpin(notes.notesId).subscribe((result: any) => {
      this.data.changeMessage(true);
      this.snack.open(result.message, '', { duration: 3000 });
    });
  }

  setColour(note: any, color: any) {
    console.log(note['color']);
    note['color'] = color;
    console.log(note['color']);
    this.noteservice
      .updatecolor(note.notesId, color)
      .subscribe((result: any) => {
        this.data.changeMessage(true);
        this.snack.open(result.message, '', { duration: 3000 });
      });
  }

  openNoteDialog(notes: any) {
    let dialogref = this.dialog.open(NotesdialogComponent, { data: { notes } });
    dialogref.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
