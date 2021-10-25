window.addEventListener('DOMContentLoaded', (event) => {
    

    let keys = Object.keys(localStorage)

    let hasAchievement
    
    for(let i=0;i<keys.length;i++){
		if(typeof(localStorage.getItem(keys[i])) == "string"){
			let favorites = JSON.parse(localStorage.getItem(keys[i]))  
			if(favorites[0] == "favoritesBar"){
				document.getElementById(favorites[0]).appendChild(document.getElementById(favorites[1]))
				document.getElementById(favorites[1]).classList.add("favoriteLinkFixedWidth")
			} else if(favorites[0] == "favoritesBarToggle"){
				let favoriteStyle = favorites[1]
				document.getElementById("favoritesBar").style.display = favoriteStyle
				document.getElementById("favoritesTogglor").innerHTML = `<i class="${favorites[2]} fa-star"></i>`
				document.getElementById("quickLinks").style.margin = `${favorites[3]}rem 0 2rem 0`
			} else if(favorites[0] == "achievement"){
				hasAchievement = true
			}
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
        console.log(hasAchievement)
        if(localStorage.getItem("toolbox_favorite_" + el.id) && target.id=="favoritesBar" && source.id != "favoritesBar"){
            if(!hasAchievement){
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
                localStorage.setItem("toolbox_achievement", JSON.stringify(["achievement", "yes"]))
            }
            drake.cancel(true);
            el.classList.remove("favoriteLinkFixedWidth")
        } else if(localStorage.getItem("toolbox_favorite_" + el.id) && target.id=="favoritesBar" && source.id == "favoritesBar"){
             localStorage.removeItem("toolbox_favorite_" + el.id)
             localStorage.setItem("toolbox_favorite_" + el.id, JSON.stringify([target.id, el.id]))
        }
        
        if(target.id == "favoritesBar" && document.getElementById(target.id).childElementCount <= 9){ // eight elements, but the hint message counts as a child element, too
            localStorage.setItem("toolbox_favorite_" + el.id, JSON.stringify([target.id, el.id]))
            el.classList.add("favoriteLinkFixedWidth")
            displayFavoriteMessage()
        } else if(target.id == "favoritesBar" && document.getElementById(target.id).childElementCount > 9){ // eight elements, but the hint message counts as a child element, too
            alert("Only a maximum of eight Favorites are supported.")
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
    
    function favoriteBarToggler(favoriteStyle){
         if(favoriteStyle == "grid"){
            document.getElementById("favoritesBar").style.display = "none"
            localStorage.setItem("toolbox_favoritesbar", JSON.stringify(["favoritesBarToggle","none", "far", 3]))
            document.getElementById("favoritesTogglor").innerHTML = '<i class="far fa-star"></i>'
            document.getElementById("quickLinks").style.margin = "3rem 0 2rem 0"
         } else if (favoriteStyle == "none"){
            document.getElementById("favoritesBar").style.display = "grid"
            localStorage.setItem("toolbox_favoritesbar", JSON.stringify(["favoritesBarToggle","grid", "fas", 1]))
            document.getElementById("favoritesTogglor").innerHTML = '<i class="fas fa-star"></i>'
            document.getElementById("quickLinks").style.margin = "1rem 0 2rem 0"
        }
    }
    
    
    document.getElementById("favoritesTogglor").addEventListener("click", function(){
        let favoriteStyle = window.getComputedStyle(document.getElementById("favoritesBar")).display
       favoriteBarToggler(favoriteStyle)
    })
        
        
    
})
