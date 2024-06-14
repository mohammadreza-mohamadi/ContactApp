import readline from 'readline/promises'
import {stdin as input,stdout as output} from 'process' 
import fs from 'fs/promises'

const rl = readline.createInterface({input,output})
const CONTACT_FILE_PATH = "./data/contact.json"
let contacts =[]

const loadContact = async ()=>{
    try{
        const contactLoad = await fs.readFile(CONTACT_FILE_PATH,'utf-8')  
        contacts.push(...JSON.parse(contactLoad)) 
    }
    catch(err)
    {
        console.log("Err in loadContact : " + err)
    }
}

const saveContact = async()=>{
    try{
         await fs.writeFile(CONTACT_FILE_PATH,JSON.stringify(contacts))
    }
    catch(err)
    {
        console.log("Error : " + err.message)
    }
}

const addContact = async()=>{
    const name = await rl.question('Enter a Name for Contact ')
    const lName = await rl.question('Enter a LastName for Contact ')
    const tel = await rl.question('Enter a Phone Number for Contact ')
    let contact={id:contacts.length,name:name,lName:lName,tel:tel}
    contacts.push(contact)
    await saveContact()
}
const quit =()=>{
    rl.close()
}

const show = ()=>{
    console.log('--- Show Contacts ---')
    contacts.map(contact=>console.log(contact))
}
const help =async ()=>{
    let qs = await rl.question("q : qiut\nn : new Contact\ns : show Contacts ")
    if(qs ==='n')
    {
        await addContact()
    }
    else if(qs === 's')
    {
       show();
    }
    else
    {
        show()
        quit()
        return
    }
    help()
}
async function main()
{
    await loadContact()
    await help()
}

main()