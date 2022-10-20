import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  listAlumnosPromise: Alumno[]=[
{Nombre:"Angel",Apellidos:"Saucedo", Genero:"Masculino",Activo:true},
{Nombre:"Carlos",Apellidos:"Treviño", Genero:"Masculino",Activo:false},
];
listAlumnosObservable: Alumno[]=[
  {Nombre:"Angel",Apellidos:"Saucedo", Genero:"Masculino",Activo:true},
  {Nombre:"Carlos",Apellidos:"Treviño", Genero:"Masculino",Activo:false},
  ];
  listAlumnosObservablePipe: Alumno[]=[
    {Nombre:"Angel",Apellidos:"Saucedo", Genero:"Masculino",Activo:true},
    {Nombre:"Carlos",Apellidos:"Treviño", Genero:"Masculino",Activo:false},
    ];

alumnosObservablePipe!:Observable<Alumno[]>;
  constructor() { 
    this.alumnosObservablePipe= new Observable<Alumno[]>((suscriptor)=>{
      suscriptor.next(this.listAlumnosObservablePipe);
    setTimeout(()=>{
      this.listAlumnosObservablePipe.push({Nombre:"Maria",Apellidos:"Perez", Genero:"Femenino",Activo:false});
      },4000);
      suscriptor.next(this.listAlumnosObservablePipe);

});

  }

  getAlumnosPromise():Promise<Alumno[] | any>{
    return new Promise((resolve,reject)=>{

      if(this.listAlumnosPromise.length>0){
        resolve(this.listAlumnosPromise);
      }
      else{
        reject("No hay alumnos disponibles");
      }
    });
  }

  getAlumnosObservable(){
    
    return of(this.listAlumnosObservable);
  }

  getAlumnosObservablePipe(){
    
    return this.alumnosObservablePipe;
  }


}
