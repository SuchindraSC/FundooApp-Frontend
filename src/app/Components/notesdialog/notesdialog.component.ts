import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from 'src/app/Services/NoteService/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';

@Component({
  selector: 'app-notesdialog',
  templateUrl: './notesdialog.component.html',
  styleUrls: ['./notesdialog.component.scss'],
})
export class NotesdialogComponent implements OnInit {
  dispNote = false;
  DescNote: string = '';
  TitleNote: string = '';
  NotesForm!: FormGroup;
  name: string = JSON.parse(localStorage.getItem('FundooUser')!).userName;
  email: string = JSON.parse(localStorage.getItem('FundooUser')!).emailId;
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
  addOnBlur = true;
  tickcolor = 'white';
  setColor = 'white';
  pinned = false;
  isarchive = false;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private noteservice: NoteService,
    private snack: MatSnackBar,
    private dataService: DataserviceService
  ) {}

  ngOnInit(): void {
    this.NotesForm = new FormGroup({
      title: new FormControl(''),
      Desc: new FormControl(''),
    });
    this.setValues();
  }
  autogrow() {
    var textArea = document.getElementById('notes')!;
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  checkMenu(event: any) {
    return event.target.value;
  }

  setValues() {
    console.log(this.data);
    this.TitleNote = this.data.notes.title;
    this.DescNote = this.data.notes.description;
    this.setColor = this.data.notes.color;
    this.pinned = this.data.notes.is_Pin;
    this.isarchive = this.data.notes.is_Archive;
  }

  update() {
    this.noteservice
      .updateNotes(
        this.data.notes.notesId,
        this.NotesForm.value,
        this.pinned,
        this.isarchive,
        this.setColor
      )
      .subscribe((result: any) => {
        if (result.status == true) {
          this.dataService.changeMessage(true);
          this.snack.open(result.message, '', { duration: 3000 });
        }
      });
  }
}
