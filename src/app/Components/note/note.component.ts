import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/Services/NoteService/note.service';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
  

@Component({
  selector: '[Create-Note]',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})

export class NoteComponent implements OnInit {
  dispNote = false;
  DescNote: string = '';
  TitleNote: string = '';
  NotesForm!: FormGroup;
  animal: string = '';
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
  //addOnBlur = true;
  tickcolor = 'white';
  setColor = 'white';
  pinned = false;
  isarchive = false;
  event: any;

  constructor(
    private noteservice: NoteService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private data: DataserviceService
  ) {}

  ngOnInit(): void {
    this.NotesForm = new FormGroup({
      title: new FormControl(''),
      Desc: new FormControl(''),
    });
  }

  createNote() {
    if (this.NotesForm.value.title != '' || this.NotesForm.value.Desc != '') {
      this.noteservice
        .CreateNote(
          this.NotesForm.value,
          this.pinned,
          this.isarchive,
          this.setColor,
        )
        .subscribe((result: any) => {
          if (result.status == true) {
            this.data.changeMessage(true);
            this.snackBar.open(result.message, '', { duration: 3000 });
          }
        });
    }
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
}