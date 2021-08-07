//Some Default Config

const $= document.querySelector.bind(document)
const c = console.log


// Global Variables 
    const yearOp = $('#year')


// Listening 
    function listen(){

        document.addEventListener('DOMContentLoaded', start)
        //$('#request-quote').addEventListener('click', handleClick)


    };

    listen();




// Functions

    function start(){
        
        loadOp();

    }

    function loadOp(){

        const yearOp=$('#year')
        const nowYear = new Date;
        let year = nowYear.getFullYear();    

        for(let i=0; i<20 ; i++){

            let op= document.createElement('option')
            year-=1;   
            op.value=i;
            op.textContent= year;

            yearOp.appendChild(op)
            
        } 
    }


    // Function to Locate the click 

