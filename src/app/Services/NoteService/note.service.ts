import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpServiceService } from '../HttpService/http-service.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  user = JSON.parse(localStorage.getItem('FundooUser')!);
  token: any;

  header: any = '';
  constructor(private httpService: HttpServiceService) {}
  CreateNote(data: any, pin: boolean, archive: boolean, color: string) {
    let params = {
      Title: data.title,
      Description: data.Desc,
      UserId: parseInt(this.user.userId),
      Color: color,
      Is_Archieve: archive,
      Is_Pin: pin,
    };
    console.log(params);
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    console.log(options);
    return this.httpService.post(
      `${environment.baseUrl}api/addnotes`,
      params,
      true,
      options
    );
  }

  getUserNotes() {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.get(
      `${environment.baseUrl}api/getnotes?UserId=${parseInt(this.user.userId)}`,
      true,
      options
    );
  }

  updateNotes(id: any, data: any, pin: any, archive: any, color: any) {
    let params = {
      NotesId: id,
      Title: data.title,
      Description: data.Desc,
      Color: color,
      Is_Archieve: archive,
      Is_Pin: pin,
    };
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };

    return this.httpService.put(
      `${environment.baseUrl}api/updatenotes`,
      params,
      true,
      options
    );
  }

  addTrash(data: any) {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(
      `${environment.baseUrl}api/trashnotes?notesId=${data}`,
      null,
      true,
      options
    );
  }

  getTrash() {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.get(
      `${environment.baseUrl}api/gettrashnotes?UserId=${parseInt(
        this.user.userId
      )}`,
      true,
      options
    );
  }

  restore(data: any) {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(
      `${environment.baseUrl}api/untrashnotes?notesId=${data}`,
      null,
      true,
      options
    );
  }

  deleteFromTrash(data: any) {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    console.log(data);
    return this.httpService.delete(
      `${environment.baseUrl}api/deletenotes?notesId=${data}`,
      true,
      options
    );
  }

  emptyTrash() {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    console.log(this.user.userId);
    return this.httpService.delete(
      `${environment.baseUrl}api/emptytrash?userId=${parseInt(
        this.user.userId
      )}`,
      true,
      options
    );
  }

  archive(data: any) {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(
      `${environment.baseUrl}api/archievenotes?notesId=${data}`,
      null,
      true,
      options
    );
  }

  getArchive() {
    let params = new HttpParams().set('userId', this.user.userId);
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.get(
      `${environment.baseUrl}api/getarchievenotes?UserId=${parseInt(
        this.user.userId
      )}`,
      true,
      options
    );
  }

  unarchive(data: any) {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(
      `${environment.baseUrl}api/unarchievenotes?notesId=${data}`,
      null,
      true,
      options
    );
  }

  pin(data: any) {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(
      `${environment.baseUrl}api/pinnotes?notesId=${data}`,
      null,
      true,
      options
    );
  }

  unpin(data: any) {
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(
      `${environment.baseUrl}api/unpinnotes?notesId=${data}`,
      null,
      true,
      options
    );
  }

  updatecolor(id: any, color: any) {
    let params = {
      NotesId: id,
      Color: color,
    };
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.put(
      `${environment.baseUrl}api/addcolor?NoteId=${id}&color=%23${color.replace(
        /[#]+/g,
        ''
      )}`,
      params,
      true,
      options
    );
  }

  getCollaborators(data: any) {
    //let params = new HttpParams().set('noteId', data);
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.get(
      `${environment.baseUrl}api/getcollaboratornotes?notesId=${data}`,
      true,
      options
    );
  }

  addCollab(id: any, colab: any) {
    let params = {
      NotesId: id,
      SenderEmailid: this.user.emailid,
      ReceiverEmailid: colab,
    };
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.post(
      `${environment.baseUrl}api/addcollaborator?NoteId=${id}`,
      params,
      true,
      options
    );
  }

  deleteColab(colab: any) {
    //let params = new HttpParams().set('colId', colab);
    this.token = localStorage.getItem('FundooNotesJWT');
    console.log(this.token, this.token.replace(/['"]+/g, ''));
    var headerObject = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token.replace(/['"]+/g, '')
    );

    let options = {
      headers: headerObject,
      'Content-Type': 'application/json',
    };
    return this.httpService.delete(
      `${environment.baseUrl}api/removecollaborator?CollaboratorId=${colab}`,
      true,
      options
    );
  }
}
