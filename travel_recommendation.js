

const recommendations = document.getElementById("recommendations");
const btnSearch = document.getElementById("btnSearch");
const searchResult = document.getElementById("searchResult");
const clrSearch = document.getElementById("clrSearch");

function search(){

    searchResult.innerHTML="";
    let value = recommendations.value.toLowerCase();
    if(value==="country") {value="countries";}
    console.log(value, typeof(value));
    if(value!==""){
    fetch('travel_recommendation_api.json')
    .then(response=>response.json())
    .then(data=>{
        for(key in data){
            console.log(key, typeof(key));
            if(key.includes(value)){
                console.log("yes, key: ",key);
                console.log(data[key].length);
                for(i=0; i<data[key].length; i++){
                    if(key!=="countries"){
                    searchResult.innerHTML += `<div class="searchResult">
                    <img src="${data[key][i].imageUrl}" alt="hjh">
                    <p> ${data[key][i].name} </p>
                    <p> ${data[key][i].description} </p>
                    <button>Visit</button>
                    </div>`

                    }else{
                        console.log(data[key][i].cities);
                        for(j=0; j<data[key][i].cities.length; j++){
                        
                        searchResult.innerHTML += `<div class="searchResult"> 
                        <img src="${data[key][i].cities[j].imageUrl}" alt="hjh">
                        <p> ${data[key][i].cities[j].name} </p>
                        <p> ${data[key][i].cities[j].description} </p>
                        <button>Visit</button>
                        </div>`
                    };
                    }
                    }
                }
                console.log(data, typeof(data));
            }
            if(searchResult.innerHTML===""){
                searchResult.innerHTML += `<div class="searchResult"><p> No result found </p></div>`

            }
        }
      
    
    
    )
    .catch(error=>console.error(error));
    }else{
        searchResult.innerHTML += `<div class="searchResult"><p> Please enter a destination or keyword </p></div>`
    }

}
function clear(){
    searchResult.innerHTML="";
    recommendations.value='';
    
}
btnSearch.addEventListener('click', search);
clrSearch.addEventListener('click', clear)