import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ElementComponent } from './components/element/element.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';

export interface VideoElement {
  nombreEvento: string;
  descripcionVideo: string;
  duracion: string;
  fecha: string;
  urlVideo: string;
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
              private api : ApiService ) {}
  ngOnInit(): void {
    this.getVideos();
  }

  openVideoElementDialog() {
    this.elementVideo.open(ElementComponent, {
      width: '80%',
    }).afterClosed().subscribe(value=>{
      if(value === 'save') {
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
    this.elementVideo.open(ElementComponent, {
      width: '80%',
      data: element
    }).afterClosed().subscribe(value=>{
      if(value === 'update') {
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

  displayedColumns: string[] = ['nombreEvento', 'descripcionVideo', 'duracion', 'fecha', 'urlVideo', 'actions'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}