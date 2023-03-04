//Example fetch using pokemonapi.co
// Take two pokemon and use the api to see what type of pokemon they are
// -display their shiny versions on DOM
// -based on the types, is one of the pokemon stronger than the other

document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const poke1 = document.querySelector('#poke1').value.toLowerCase();
  const poke2 = document.querySelector('#poke2').value.toLowerCase();
  const url = 'https://pokeapi.co/api/v2/pokemon/'+poke1;
  const url2 = 'https://pokeapi.co/api/v2/pokemon/'+poke2;
 

  //created empty arrays so that the data from the api can be stored
  let poke1Types =[];
  let poke2Types =[];
  let pokeImg = [];
  let poke1DblDmgFrom =[];
  let poke2DblDmgFrom =[];
  let poke1HalfDmgFrom =[];
  let poke2HalfDmgFrom =[];
  let poke1NoDmgFrom =[];
  let poke2NoDmgFrom =[];

  fetch(url) //fetch pokemon1 info
      .then(res => res.json()) 
      .then(data => {

        //if pokemon has multiple types, the forEach method is used to push element into the emtpy array created
        data.types.forEach(element => {
          poke1Types.push(element.type.name);
        })
        pokeImg.push(data.sprites.front_shiny);

        //to simplify, the pokemon may have multiple types but I only used the first type to generate an URL 
        let poke1TypeURL =(data.types[0].type.url);
        
        fetch(url2) //fetch pokemon2 info
        .then(res => res.json()) 
        .then(data => {
          //if pokemon has multiple types, the forEach method is used to push element into the emtpy array created
          data.types.forEach(element => {
            poke2Types.push(element.type.name);
          })
          pokeImg.push(data.sprites.front_shiny);

          //again to simplify, the pokemon may have multiple types but I only used the first type to generate an URL 
          let poke2TypeURL =(data.types[0].type.url);

          document.querySelector('#pokeImg1').src = pokeImg[0]
          document.querySelector('#pokeImg2').src = pokeImg[1]
      
          // Type of pokemon and damages
          fetch(poke1TypeURL)
            .then(res => res.json())
            .then (data => {

              // add the damage info into the empty arrays 
              data.damage_relations.double_damage_from.forEach(element => {
                poke1DblDmgFrom.push(element.name)
              });

              data.damage_relations.half_damage_from.forEach(element => {
                poke1HalfDmgFrom.push(element.name)
              });

              data.damage_relations.no_damage_from.forEach(element => {
                poke1NoDmgFrom.push(element.name)
              });

              fetch(`${poke2TypeURL}`)
                .then(res => res.json())
                .then (data => {

                  // add the damage info into the empty arrays
                  data.damage_relations.double_damage_from.forEach(element => {
                    poke2DblDmgFrom.push(element.name)
                  });
    
                  data.damage_relations.half_damage_from.forEach(element => {
                    poke2HalfDmgFrom.push(element.name)
                  });
    
                  data.damage_relations.no_damage_from.forEach(element => {
                    poke2NoDmgFrom.push(element.name)
                  });

                  // based on the damage info, the h2 is changed.

                  //Filter out pokemon 2 types (incase there are multiple), if pokemon 1 type damage includes the pokemon 2 type then display on the DOM the info. Vice versa between pokemon 1 types and pokemon 2 type damage.
                  if (poke2Types.filter(element => poke1DblDmgFrom.includes(element)).length>0){
                    document.querySelector('h2').innerText = `${poke1} receives double damage from ${poke2}`
                  } else if(poke1Types.filter(element => poke2DblDmgFrom.includes(element)).length>0){
                    document.querySelector('h2').innerText = `${poke2} receives double damage from ${poke1}`
                  } else if (poke2Types.filter(element => poke1HalfDmgFrom.includes(element)).length>0){
                    document.querySelector('h2').innerText = `${poke1} receives half damage from ${poke2}`
                  } else if (poke1Types.filter(element => poke2HalfDmgFrom.includes(element)).length>0){
                    document.querySelector('h2').innerText = `${poke2} receives half damage from ${poke1}`
                  } else if (poke2Types.filter(element => poke1NoDmgFrom.includes(element)).length>0){
                    document.querySelector('h2').innerText = `${poke1} receives no damage from ${poke2}`
                  } else if (poke1Types.filter(element =>poke2NoDmgFrom.includes(element)).length>0){
                    document.querySelector('h2').innerText = `${poke2} receives no damage from ${poke1}`
                  } else {
                    document.querySelector('h2').innerText = `${poke1} and ${poke2} receives normal damage to eachother`
                  }
                })
                .catch(err => {
                  console.log(`error ${err}`)
                });

            })
            .catch(err => {
              console.log(`error ${err}`)
            });

        })
        .catch(err => {
            console.log(`error ${err}`)
        });

      })
      .catch(err => {
          console.log(`error ${err}`)
      });

}