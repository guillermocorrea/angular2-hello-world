import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Hero } from './models/hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  directives: [HeroDetailComponent],
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css']
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  public heroes: Hero[];
  addingHero: boolean;
  error: any;
  /**
   *
   */
  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /**
   * onSelect
   */
  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  private getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

}