import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  elementForm !: FormGroup;
  actionButton: string = "Guardar";
  actionTitle: string = "Crear";

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private elementRef: MatDialogRef<ElementComponent>,
    @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
    this.elementForm = this.formBuilder.group({
      nombreEvento: ['', Validators.required],
      descripcionVideo: ['', Validators.required],
      duracion: ['', Validators.required],
      fecha: ['', Validators.required],
      urlVideo: ['', Validators.required]
    });

    if (this.editData) {
      this.actionButton = "Actualizar";
      this.actionTitle = "Actualizar";
      this.elementForm.controls['nombreEvento'].setValue(this.editData.nombreEvento);
      this.elementForm.controls['descripcionVideo'].setValue(this.editData.descripcionVideo);
      this.elementForm.controls['duracion'].setValue(this.editData.duracion);
      this.elementForm.controls['fecha'].setValue(this.editData.fecha);
      this.elementForm.controls['urlVideo'].setValue(this.editData.urlVideo);
    }

  }

  addVideoElement() {
    if (!this.editData) {
      if (this.elementForm.valid) {
        const date = formatDate(this.elementForm.controls['fecha'].value,'MM-dd-yyyy',this.locale); 
        this.elementForm.get('fecha')?.setValue(date);
        this.api.postVideo(this.elementForm.value)
          .subscribe({
            next: (res) => {
              alert("Video agregado satisfactoriamente")
              this.elementForm.reset();
              this.elementRef.close('save');
            },
            error: () => {
              alert("Error al intentar agregar el video")
            }
          })
      }
    } else {
      this.updateVideo();
    }
  }

  updateVideo() {
    this.api.updateVideo(this.elementForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Video actualizado satisfactoriamente");
          this.elementForm.reset();
          this.elementRef.close('update');
        },
        error: ()=>{
          alert("Error al intentar actualizar el video");
        }
      })
  }

}
