import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  create_deck(): Observable<any> {
    return this.http.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AC,AS,AD,AH,2C,2H,2S,2D,3S,3D,3C,3H,4C,4S,4D,4H,5C,5S,5D,5H,6C,6S,6D,6H,8C,8S,8D,8H,9C,9S,9D,9H,0C,0S,0D,0H,KC,KS,KD,KH,JC,JS,JD,JH,QC,QS,QD,QH`)
  }

  add_user(deck_id): Observable<any> {
    return this.http.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=8`)
  }

  assign_cards(deck_id, pile_name, cards_list): Observable<any> {
    return this.http.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/add/?cards=${cards_list}`)
  }
  
  list_piles(deck_id, pile_name): Observable<any> {
    return this.http.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/list/`)
  }

  draw_card(deck_id, pile_name, card): Observable<any> {
    return this.http.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/draw/?cards=${card}`)
  }

  assign_card(deck_id, pile_name, card): Observable<any> {
    return this.http.get(`https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/add/?cards=${card}`)
  }

}
