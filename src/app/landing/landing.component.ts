import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

import { Card } from '../models/card';
import { CardRes } from '../models/card-res';
import { CardService } from '../services/card.service';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { API_YGO_BASE_URL } from 'src/environments/environment';
import { CardParams } from '../models/card-params';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  sinRespuesta: boolean = false;
  num = 25;
  offset = 0;
  API_YGO_BASE_URL = API_YGO_BASE_URL;
  newCards: Array<Card> = [];
  separatorKeysCodes: number[] = [COMMA, ENTER];
  cardSearchForm = new FormControl('');
  filtros: Observable<string[]>;
  filtrosSelected: string[] = [];
  allfilters: any = {
    'Aqua': 'race',
    'Beast': 'race',
    'Beast-Warrior': 'race',
    'Creator-God': 'race',
    'Cyberse': 'race',
    'Dinosaur': 'race',
    'Divine-Beast': 'race',
    'Dragon': 'race',
    'Fairy': 'race',
    'Fiend': 'race',
    'Fish': 'race',
    'Insect': 'race',
    'Machine': 'race',
    'Plant': 'race',
    'Psychic': 'race',
    'Pyro': 'race',
    'Reptile': 'race',
    'Rock': 'race',
    'Sea Serpent': 'race',
    'Spellcaster': 'race',
    'Thunder': 'race',
    'Warrior': 'race',
    'Winged Beast': 'race',
    'Wyrm': 'race',
    'Zombie': 'race',
    'Effect Monster': 'type',
    'Flip Effect Monster': 'type',
    'Flip Tuner Effect Monster': 'type',
    'Gemini Monster': 'type',
    'Normal Monster': 'type',
    'Normal Tuner Monster': 'type',
    'Pendulum Effect Monster': 'type',
    'Pendulum Effect Ritual Monster': 'type',
    'Pendulum Flip Effect Monster': 'type',
    'Pendulum Normal Monster': 'type',
    'Pendulum Tuner Effect Monster': 'type',
    'Ritual Effect Monster': 'type',
    'Ritual Monster': 'type',
    'Spell Card': 'type',
    'Spirit Monster': 'type',
    'Toon Monster': 'type',
    'Trap Card': 'type',
    'Tuner Monster': 'type',
    'Union Effect Monster': 'type',
    'Fusion Monster': 'type',
    'Link Monster': 'type',
    'Pendulum Effect Fusion Monster': 'type',
    'Synchro Monster': 'type',
    'Synchro Pendulum Effect Monster': 'type',
    'Synchro Tuner Monster': 'type',
    'XYZ Monster': 'type',
    'XYZ Pendulum Effect Monster': 'type',
    'Skill Card': 'type',
    'Token': 'type',
  };
  allfiltersKeys: string[] = Object.keys(this.allfilters);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  
  constructor(
    private cardService: CardService,
  ) {
    this.filtros = this.cardSearchForm.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allfiltersKeys.slice())),
    );
  }

  ngOnInit(): void {
    this.updateCards();
  }
  updateCards() {
    const params: CardParams = this.filtrosSelected.reduce((prev: any, next: any): CardParams => {
      const filt = this.allfilters[next] || 'fname';
      prev[filt] = prev[filt] ? `${prev[filt]},${next}` : next;
      return prev;
    }, {});
    params.num = this.num;
    params.offset = this.offset;
    console.log('params',params)
    this.cardService.getNewCards(params).subscribe({
      next: ((res: CardRes) => {
        this.newCards.push(...res.data);
      }),
      error: ((error: any) => {
        this.sinRespuesta = true;
        console.log('Ocurrio un error', error);
      }),
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    
    // Add our fruit
    if (value) {
      this.resetPage();
      // Filter for specific text
      if (!this.allfiltersKeys.includes(value)) {
        const indexPrevVal = this.filtrosSelected.findIndex((a: any) => !this.allfiltersKeys.includes(a));
        if (indexPrevVal !== -1) {
          this.filtrosSelected[indexPrevVal] = value;
        } else {
          this.filtrosSelected.push(value);
        }
      } else {
        this.filtrosSelected.push(value);
      }
      this.updateCards();
    }

    // Clear the input value
    event.chipInput!.clear();

    this.cardSearchForm.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.filtrosSelected.indexOf(fruit);

    if (index >= 0) {
      this.filtrosSelected.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
    this.resetPage();
    this.updateCards();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.filtrosSelected.push(event.option.viewValue);
    this.searchInput.nativeElement.value = '';
    this.cardSearchForm.setValue(null);
    this.resetPage();
    this.updateCards();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allfiltersKeys.filter((fruit: any) => fruit.toLowerCase().includes(filterValue));
  }

  scrollDown() {
    this.offset += this.num;
    this.updateCards()
    console.log('scrolll');
  }
  
  resetPage(){
    this.num = 25;
    this.offset = 0;
    this.newCards = [];
    this.sinRespuesta = false;
  }
}
