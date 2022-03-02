import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ElementComponent } from './components/element/element.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';
import { formatDate } from '@angular/common';

export interface VideoElement {
  id?: number;
  nombre_evento: string;
  descripcion_video: string;
  duracion: string;
  fecha: any;
  url_video: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAdmin: boolean = false;
  title = 'AppVideosInstitucionales';
  confirmMsg: boolean = false;
  message: string = '';

  public visible: boolean = false;

  constructor(private elementVideo: MatDialog,
              private elementLogin: MatDialog,
              private api : ApiService,
              @Inject(LOCALE_ID) private locale: string) {}
  ngOnInit(): void {
    this.getVideos();
  }

  openVideoElementDialog() {
    this.elementVideo.open(ElementComponent, {
      width: '80%',
    }).afterClosed().subscribe(value=>{
      if(value != "") {
        this.getVideos();
      }
    })
  }

  getVideos() {
    this.api.getVideos()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
        },
        error:(err)=>{
          alert("Error al tratar de listar los videos");
        }
      })
  }

  updateVideo(element : VideoElement) {
    console.log(element);
    const date = new Date(element.fecha);
    element.fecha = date;
    this.elementVideo.open(ElementComponent, {
      width: '80%',
      data: element
    }).afterClosed().subscribe(value=>{
      if(value === "update" || value != "") {
        this.getVideos();
      }
    })
  }

  confirmDelete(id: number) {
    this.confirmMsg = confirm('¿Confirma eliminar el registro?');
    if(this.confirmMsg) {
      this.deleteVideo(id);
    } else {
      this.elementVideo.closeAll();
    }
  }

  deleteVideo(id: number) {
    this.api.deleteVideo(id)
      .subscribe({
        next:(res)=>{
          alert("Video eliminado satisfactoriamente");
          this.getVideos();
        },
        error:(err)=>{
          alert("Error al tratar de eliminar el video");
        }
      })
  }

  closeLoginDialog() {
    this.elementLogin.closeAll();
  }

  logout() {
    this.isAdmin = false;
    alert("Has cerrado sesión satisfactoriamente");
  }

  changeStatus(event: any) {
    this.isAdmin = event;
  }

  displayedColumns: string[] = ['nombre_evento', 'descripcion_video', 'duracion', 'fecha', 'url_video', 'actions'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}