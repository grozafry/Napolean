import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  deck_id: any = '';
  pile_name: any;
  user_cards: any = [];
  piles_list: any = [];

  selected_card: any;
  selected_player: any;

  constructor(private dataSvc: DataserviceService,) { }

  ngOnInit(): void {
  }

  create_deck(){
    this.dataSvc.create_deck().subscribe(res => {
      this.deck_id = res['deck_id'];
    });
  }

  add_user_assign_cards(username, deckid){
    this.deck_id = deckid;
    this.pile_name = username;
    

    this.dataSvc.add_user(this.deck_id).subscribe(res => {
      console.log(res);
      
      var cards_list = '';
      
      res["cards"].forEach( (val, index) => {
        cards_list = cards_list + val["code"] + ','
      })



      this.dataSvc.assign_cards(this.deck_id, this.pile_name, cards_list).subscribe(res => {
        
        if ( res["success"] ){

          this.dataSvc.list_piles(this.deck_id, this.pile_name).subscribe(res => { 

              this.piles_list = res["piles"]

              this.user_cards = res["piles"][this.pile_name]["cards"]


              console.log("user_cards")
              console.log(this.user_cards)



          })

        }
        else{
          console.log("more players than accepted!")
        }
      
    });

  })

} 



select_card(code){
  this.selected_card = code;
}

select_player(player_name){
  this.selected_player = player_name;
}

transfer_card(){
  this.dataSvc.draw_card(this.deck_id, this.pile_name, this.selected_card,).subscribe(res => {
  
    this.dataSvc.assign_card(this.deck_id, this.selected_player, this.selected_card,).subscribe(res => {
      
      if (res["success"]){
        window.alert("Successful transaction!")
        this.refresh_list();
      }
      else{
        window.alert("Error!")
      }

    })

  })

}

refresh_list(){

  this.dataSvc.list_piles(this.deck_id, this.pile_name).subscribe(res => { 

    this.piles_list = res["piles"]

    this.user_cards = res["piles"][this.pile_name]["cards"]





    })

}

}
