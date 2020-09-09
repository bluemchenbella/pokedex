export class Pokemon {
   id: number;
   name: string;
   order: number;
   sprites: {
     front_default: string;
   };
   abilities: {
     ability: {
       name: string;
       url: string;
     },
     is_hidden: false;
     slot: number;
   }[];
   types: {
     slot: number;
     type: {
       name: string;
       url: string;
     }
   }[];
   stats: {
     stat: {
       name: string;
       url: string;
     },
     base_stat: number;
     effort: number;
   }[];
   moves: {
     move: {
       name: string;
       url: string;
     }
   }[];
   forms: {
     name: string;
     url: string;
   }[];
   species: {
     name: string;
     url: string;
   };
}
