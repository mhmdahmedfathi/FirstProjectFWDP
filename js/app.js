/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.getElementsByTagName("section");
let IsScrolled = false;
    



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function nav(){

    let Fragments = document.createDocumentFragment();
    for(let i=0;i<sections.length;i++){
        let li = document.createElement("li")
        li.setAttribute("class", "menu__link")
        li.innerHTML=sections[i].id
        Fragments.append(li);
    }
    document.getElementById("navbar__list").appendChild(Fragments);
    
}

function activeSection(id){
    if(document.getElementById(id) !=null){
        document.querySelector(".your-active-class").classList.remove("your-active-class");
        document.getElementById(id).setAttribute('class',"your-active-class")    
    }
}
// Add class 'active' to section when near top of viewport
//helper function
function checkVisibleSection(){

    let minor   = window.innerHeight,
        section = null;

    //---Select the section closest to the top
    [].forEach.call(sections, function(item){

        let offset  = item.getBoundingClientRect();
        if(Math.abs(offset.top) < minor){

            minor   = Math.abs(offset.top);

            section = item;

        }

    });

    //---If the section exists
    if(section){
        let id   = section.id;
        activeSection(id);
    }

}

function Scroll(){
    function Scrolled(){
        document.querySelector(".page__header").setAttribute("style", "position:fixed")
        IsScrolled=false;
        checkVisibleSection();
    }
    function NotScrolled(){
        document.querySelector(".page__header").setAttribute("style", "position:unset")
    }
    window.onscroll = () => IsScrolled = true;

    setInterval(() => {
        if ( IsScrolled ) {
           Scrolled();
        }else{
            NotScrolled();
        }
    }, 500);
        
}

// Scroll to anchor ID using scrollTO event
function Move(e){
    document.getElementById(e.target.textContent).scrollIntoView({behavior: 'smooth'});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu && Scroll to section on link click 
nav();
document.getElementById('navbar__list').addEventListener('click',Move)

// Set sections as active
Scroll();

