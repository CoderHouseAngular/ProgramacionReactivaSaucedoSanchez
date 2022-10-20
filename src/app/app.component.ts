import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Alumno } from './models/alumno';
import { AlumnoService } from './services/alumno.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProgramacionReactivaSaucedoSanchez';
  alumnosPromise!:Alumno[];
  alumnosObservable!:Alumno[];
  alumnosFiltered!:Alumno[];
  AlumnoService!:AlumnoService;
  alumnosObservablePipe!:Observable<Alumno[]>;
  subscription: any;

  constructor(private alumnoService:AlumnoService){

    this.alumnosObservablePipe=alumnoService.getAlumnosObservablePipe();
    this.AlumnoService=alumnoService;

  }

  getAlumnosObservable(){
    console.log("Observable");
    this.subscription= this.AlumnoService.getAlumnosObservable().subscribe({
      next:(alumnos:Alumno[])=>{
        this.alumnosObservable=alumnos;
        console.log(alumnos);
      },
      error:(error)=>{
        console.log(error);
      } 
     });
  }

  getAlumnosPromise(){
    console.log("Promise");
    this.AlumnoService.getAlumnosPromise().then((value:Alumno[])=>{
      this.alumnosPromise=value;
      console.log(value);
     }).catch((error:any)=>{
      console.log(error);
     });
  }

  getFilteredAlumnos(){
    of(this.alumnosPromise).pipe(
      map((alumnos:Alumno[])=>alumnos.filter((alumno:Alumno)=> alumno.Nombre ==="Angel"))
    ).subscribe((alumnos)=>{
      this.alumnosFiltered=alumnos;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
