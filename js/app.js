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
const sections = document.querySelectorAll("section");
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
    sections.forEach(function(section){
        let li = document.createElement("li")
        li.setAttribute("class", "menu__link")
        li.innerHTML=section.id
        Fragments.append(li);
    })
    document.getElementById("navbar__list").appendChild(Fragments);
    
}

function SectionsText(){
        document.querySelectorAll(".landing__container").forEach(function(Container){
            let Fragments = document.createDocumentFragment();
            let paragraph1 = document.createElement("p")
            let paragraph2 = document.createElement("p")
            paragraph1.innerHTML="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod "
            Fragments.appendChild(paragraph1)
            paragraph2.innerHTML = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non."
            Fragments.appendChild(paragraph2)
            Container.appendChild(Fragments)
        
        })
    
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

    let Minimum   = window.innerHeight;
    let Active = null;

    //---Select the section closest to the top
    
    sections.forEach(function(section){
        let offset  = section.getBoundingClientRect();
        if(Math.abs(offset.top) < Minimum){

            Minimum   = Math.abs(offset.top);

            Active = section;

        }        
    })
    if(Active){
        let id   = Active.id;
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
(function () {
    nav();
    SectionsText();
})();
document.getElementById('navbar__list').addEventListener('click',Move)

// Set sections as active
Scroll();

