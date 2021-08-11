//Some Default Config

const $= document.querySelector.bind(document)
const c = console.log


// Global Variables 
    const yearOp = $('#year')
    const frm = $('#request-quote')


// Listening 
    function listen(){

        document.addEventListener('DOMContentLoaded', start)
        frm.addEventListener('submit', getValue)
        //$('#request-quote').addEventListener('click', handleClick)


    };

    listen();


//Objects

    //Object Constructor HTML
    function html(){}
    //Object to Calculate the insurance
    function insurance(make,year,level){
        this.make=make;
        this.year=year;
        this.level=level;
    }
    
    //Object call
    let htmlOp= new html() 


    // ------- Adding Prototypes Ref the html------//
    html.prototype.loadYear=function(){
        let year= new Date().getFullYear();

        const yop= $('#year');
        
        for(let i=0; i<20;i++){
            
            const op=document.createElement('option')
            op.value=year;
            op.textContent=year;
            
            yop.appendChild(op)

            year-=1
        }
    }   

    function getValue(e){
        e.preventDefault();
        let arrFields=[]

        const makeValue=$('#make').value;
        const yearValue=$('#year').value;
        //Get the selected index of the radiobutton
        const levelValue = $('input[name="level"]:checked').value

        arrFields.push(makeValue,yearValue,levelValue)
        //Validate the fields

        if(arrFields.includes('')){
            htmlOp.printSms('Fault Fields Empty!!!')
        }else{ 

            const divResult=$('#result div')
            
            const insurances= new insurance(makeValue,yearValue,levelValue)
            const price= insurances.calculate(insurances);

            if(divResult!==null){
                divResult.remove()
                htmlOp.printResult(price,insurances);
            } else{
                htmlOp.printResult(price,insurances);

            }
            
        }

    }

    // Methods to print a message 
    html.prototype.printSms=function(sms){

        //create a Div
        const div = document.createElement('div')
        div.classList='error'

        div.innerHTML=`
            <p>${sms}</p>
        `
        //Insert the creted div before an element in  the form
        frm.insertBefore(div, $('.form-group'))

        //Remove the error sms after 3s
        setTimeout(function(){
            $('.error').remove();
        },3000)
    }

    //Print The Message to the screen in result div
    html.prototype.printResult= function(price,insurance){

        const result = $('#result')

        const div = document.createElement('div')
        div.innerHTML=`
            <p class="header">summary</p>
            <p>Total $${price}</p>
            <p>Make ${insurance.make}</p>
            <p>Year : ${insurance.year}</p>
            <p>Level : ${insurance.level}</p>
        `
        $('#loading img').style.display='block'

        setTimeout(function(){
            
            $('#loading img').style.display='none'

            result.appendChild(div)
        },3000)
        
        

    }

    // ------- Adding Prototypes Ref the insurance and Calc------//
    insurance.prototype.calculate= function(insurance){

        //__________Calculate through the make ___________

        //American = 1 => 15$ , Asian = 2 05$, European = 3 35$
        let price;
        const base = 2000;
        const make = insurance.make;
        const year = insurance.year;
        const level = insurance.level;
        const yearDiff=this.getYearDiff(year)
        
        //switch condition
        switch(make){
            case '1':
                price = base * 1.15;
                break;
            case '2' :
                price = base * 1.05;
                break;                
            case '3' :
                price = base * 1.35;
        }

        //__________Calculate through the Year 3% of Diff bettwen the years___________

        price= price-((yearDiff*3)*price ) /100;

        //__________Calculate through the Level ___________
        //basic = 30%
        //Complete = 50%
        
        price= this.calculateLevel(price,level)

        return price ; 
    }


    insurance.prototype.getYearDiff= function(year){
        return new Date().getFullYear() - year
    }

    //Calculate the level
    insurance.prototype.calculateLevel= function(price,level){

        if(level==='basic'){
            price= price*1.30
        }else{
            price= price*1.50
        }

        return price;
    }

// Functions

    function start(){
        
        htmlOp.loadYear()        

    }

    function getInputValues(e){

        e.preventDefault();


        htmlOp.getValue();
    }
