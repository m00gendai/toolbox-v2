window.addEventListener('DOMContentLoaded', (event) => {

    let keys = Object.keys(localStorage)
    
    for(let i=0;i<keys.length;i++){
        let favorites = JSON.parse(localStorage.getItem(keys[i]))  
        if(favorites[0] == "favoritesBar"){
            document.getElementById(favorites[0]).appendChild(document.getElementById(favorites[1]))
            document.getElementById(favorites[1]).classList.add("favoriteLinkFixedWidth")
        }
    }
        
    const drake = dragula(
        [
            document.querySelector('#quickLinks'),
            document.querySelector('#favoritesBar')
        ],
        {
            copy: false, 
            copySortSource: false, 
            revertOnSpill: true
        }
    );

    drake.on('drop', function(el, target, source, sibling){
        if(localStorage.getItem("toolbox_favorite_" + el.id) && target.id=="favoritesBar"){
            alert("You can't add the same Favorite twice, or else you will BREAK REALITY ITSELF!!!")
            drake.cancel(true);
            el.classList.remove("favoriteLinkFixedWidth")
        }
        
        if(target.id == "favoritesBar" && document.getElementById(target.id).childElementCount <= 9){ // eight elements, but the hint message counts as a child element, too
            localStorage.setItem("toolbox_favorite_" + el.id, JSON.stringify([target.id, el.id]))
            el.classList.add("favoriteLinkFixedWidth")
            displayFavoriteMessage()
        } else if(target.id == "favoritesBar" && document.getElementById(target.id).childElementCount > 9){ // eight elements, but the hint message counts as a child element, too
            alert("Maximum eight Favorites supported")
            drake.cancel(true);
        }
        
        if(target.id == "quickLinks"){
            for(let i=0;i<keys.length;i++){
                let favorites = JSON.parse(localStorage.getItem("toolbox_favorite_" + el.id))
                el.classList.remove("favoriteLinkFixedWidth")
                localStorage.removeItem("toolbox_favorite_" + el.id)
                displayFavoriteMessage()
            }
        }
    })

    function displayFavoriteMessage(){
        if(document.getElementById("favoritesBar").childElementCount == 1){
            document.getElementById("favoritesMessage").style.display = "block"
        } 
        if(document.getElementById("favoritesBar").childElementCount >= 2){
            document.getElementById("favoritesMessage").style.display = "none"
        }
    }
    
    displayFavoriteMessage()
    
})