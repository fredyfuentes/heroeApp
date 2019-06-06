import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel [] = [];
  cargando = false;

  constructor(private heroService: HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroService.obtenerHeroes().subscribe(resp => {
      this.heroes = resp;
      this.cargando = false;
    });
  }

  eliminarHeroe(heroe: HeroeModel, idx: number) {
    Swal.fire({
      title: `¿Está seguro de borrar a ${ heroe.nombre }?`,
      text: `¿Está seguro de borrar a ${ heroe.nombre }?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(idx, 1);
        this.heroService.eliminarHeroe(heroe.id).subscribe();
      }
    });
  }

}
