import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataserviceService } from 'src/app/Services/DataService/dataservice.service';
import { NoteService } from 'src/app/Services/NoteService/note.service';
import { NotesdialogComponent } from '../notesdialog/notesdialog.component';

@Component({
  selector: 'app-getarchieve',
  templateUrl: './getarchieve.component.html',
  styleUrls: ['./getarchieve.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class GetarchieveComponent implements OnInit {
archiveNotes=[];
  constructor(private noteservice:NoteService,
    private dialog:MatDialog,
    private snack:MatSnackBar,
    private data:DataserviceService) { }

  ngOnInit(): void {
    this.getArchive();
    this.data.currentMessage.subscribe((change)=>{
      if(change == true){
        this.getArchive();
        this.data.changeMessage(false);
      }
    })
  }

  getArchive(){
    this.noteservice.getArchive().subscribe((result:any) => {
      console.log(result.data);
      this.archiveNotes = result.data;
    })
  }
  openNoteDialog(notes:any){
    let dialogref = this.dialog.open(NotesdialogComponent,{data:{notes}});
    dialogref.afterClosed().subscribe((result)=>{
      console.log(result);
    })
  }
}
