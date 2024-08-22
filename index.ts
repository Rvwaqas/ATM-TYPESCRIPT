import inquirer from 'inquirer';
import {faker} from '@faker-js/faker';




interface User{
    id:number,
    pin:number,
    name:string,
    accountNumber:number,
    balance:number
}

const userInfo=()=>{

    let users:User[]=[]
    for(let i=0;i<5;i++){
        let user:User={
            id: i,
            pin:1000+i,
            name:faker.person.fullName(),
            accountNumber:Math.floor(Math.random()*30000),
            balance:10000+i

        }
        users.push(user)
    }
return users
}

//atm machine

const atmMachine=async (users:User[])=>{

let response= await inquirer.prompt({
    type:'number',
    message:"Enter your pin",
    name:"pin"
})


const user=users.find((val)=>val.pin== response.pin)
if(user){
    console.log("Welcome Account Holder")
    atmFunc(user)
    return 
}else{
    console.log("Invalid user")
}

}


// atm funtion

const atmFunc= async(user:User)=>{

    const ans=await inquirer.prompt({
        type:'list',
        name:"select",
        choices:["withdraw","balance inquirer","Exit"]
    })

    if(ans.select=="withdraw"){
        const amount=await inquirer.prompt({
            type:"number",
            name:"ruppee",
            message:"Enter your Amount"
            
        })
        
        if(amount.ruppee>user.balance){
            console.log("Not enough balance")
        }
        if(amount.ruppee>25000){
            console.log("you cannot enter amount greater then 250000")
        }
        console.log(`cash withdraw successful ${amount.ruppee}`)
        console.log(`available balance is ${user.balance-amount.ruppee}`)
        }
       
    
    if(ans.select=="balance inquirer"){
        console.log(`Your balance is ${user.balance}`)
    }
    if(ans.select=="Exit"){
        console.log(`Thank you `)
    }


}


let user=userInfo()
atmMachine(user)