window.addEventListener('DOMContentLoaded', () => {
    
    let storedAchievements 
    JSON.parse(localStorage.getItem("toolbox_achievements")) == null ? storedAchievements = [] : storedAchievements = JSON.parse(localStorage.getItem("toolbox_achievements"))
    let storedFavorites 
    JSON.parse(localStorage.getItem("toolbox_favorites")) == null ? storedFavorites = [] : storedFavorites = JSON.parse(localStorage.getItem("toolbox_favorites"))
    let storedVisibility
    JSON.parse(localStorage.getItem("toolbox_displayFavorites")) == null ? storedVisibility = true : storedVisibility = JSON.parse(localStorage.getItem("toolbox_displayFavorites"))

    if(!storedVisibility){
        document.getElementById("favoritesBar").style.display = "none"

        document.getElementById("quickLinks").style.margin = "3rem 0 2rem 0"
    } 
    if (storedVisibility){
        document.getElementById("favoritesBar").style.display = "grid"

        document.getElementById("quickLinks").style.margin = "1rem 0 2rem 0"
    }

    if(storedFavorites.length > 0){
        storedFavorites.forEach(favorite =>{
            document.getElementById("favoritesBar").appendChild(document.getElementById(favorite))
            document.getElementById(favorite).classList.add("favoriteLinkFixedWidth")
        })
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
    
    function setAchievement_twiceFav(storedAchievements){
        setTimeout(function(){
            document.getElementById("achievementContainer").style.display = "flex"
        }, 0)   
        setTimeout(function(){
            document.getElementById("achievementDetail").innerText = "Tried adding the same Favorite twice"
            document.getElementById("achievement").style.width = "30vw"
        },500)
        setTimeout(function(){
            document.getElementById("achievement").style.width = "0vw"
        }, 6000)
        setTimeout(function(){
            document.getElementById("achievementContainer").style.display = "none"
        }, 6500)
        storedAchievements.push("twice_fav")
        localStorage.setItem("toolbox_achievements", JSON.stringify(storedAchievements))
    }
    
    drake.on('drop', function(el, target, source, sibling){
         // TRYING TO ADD TILE TWICE       
        let favs
        JSON.parse(localStorage.getItem("toolbox_favorites")) == null ? favs = [] : favs = JSON.parse(localStorage.getItem("toolbox_favorites"))
        if(favs.includes(el.id) && target.id=="favoritesBar" && source.id != "favoritesBar"){
            if(!storedAchievements.includes("twice_fav")){
                setAchievement_twiceFav(storedAchievements)
            }
            drake.cancel(true);
            el.classList.remove("favoriteLinkFixedWidth")
        }      
        // ADDING ITEMS TO FAVORITES BAR
        if(target.id == "favoritesBar" && document.getElementById(target.id).childElementCount <= 9){ // eight elements, but the hint message counts as a child element, too
            let favorites
            localStorage.getItem("toolbox_favorites") == null ? favorites = [] : favorites = JSON.parse(localStorage.getItem("toolbox_favorites"))
            favorites.push(el.id)
            localStorage.setItem("toolbox_favorites", JSON.stringify(favorites))
            document.getElementById("favoritesBar").appendChild(document.getElementById(el.id))
            el.classList.add("favoriteLinkFixedWidth")
            displayFavoriteMessage()
        } else if(target.id == "favoritesBar" && document.getElementById(target.id).childElementCount > 9){ // eight elements, but the hint message counts as a child element, too
            alert("Only a maximum of eight Favorites are supported.")
            drake.cancel(true);
        }
        // REMOVING ITEMS FROM FAVORITES BAR
        if(target.id == "quickLinks"){ 
            const favorites = JSON.parse(localStorage.getItem("toolbox_favorites"))
            el.classList.remove("favoriteLinkFixedWidth")
            const newFavorites = favorites.filter(item =>{
                return item != el.id
            })
            localStorage.setItem("toolbox_favorites", JSON.stringify(newFavorites))
            displayFavoriteMessage()
        }
        // SORTING ITEMS IN FAVORITES BAR
        if(target.id == "favoritesBar" && source.id == "favoritesBar"){
            let sortedFavorites = []
            for (item of target.children){
                if(item.id != "favoritesMessage"){
                    sortedFavorites.push(item.id)
                }
            }
            localStorage.setItem("toolbox_favorites", JSON.stringify(sortedFavorites))
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
    
    function favoriteBarToggler(){
        const isVisible = JSON.parse(localStorage.getItem("toolbox_displayFavorites"))
         if(isVisible){
            localStorage.setItem("toolbox_displayFavorites", JSON.stringify(false))
            document.getElementById("favoritesBar").style.display = "none"

            document.getElementById("quickLinks").style.margin = "3rem 0 2rem 0"
         } 
         if (!isVisible){
             localStorage.setItem("toolbox_displayFavorites", JSON.stringify(true))
            document.getElementById("favoritesBar").style.display = "grid"

            document.getElementById("quickLinks").style.margin = "1rem 0 2rem 0"
        }
    }
    
    

})
