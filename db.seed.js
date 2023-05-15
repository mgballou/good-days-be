// dependencies
require('dotenv').config()

const mongoose = require('mongoose');
const { MONGODB_URI } = process.env
const { Day, User } = require('./models')
const axios = require('axios')


// establish DB connection
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI)


// connection events

mongoose.connection
    .on("open", () => console.log("Mongoose connection established"))
    .on("close", () => console.log("Mongoose connection terminated"))
    .on("error", (error) => console.log(error));


/// seed database

const demoUsers = [
    {
        username: 'demo_user1',
        password: 'demo_user1'
    },
    {
        username: 'demo_user2',
        password: 'demo_user2'
    },
    {
        username: 'demo_user3',
        password: 'demo_user3'
    }

]

const dates = ['2023/05/13', '2023/05/12', '2023/05/11', '2023/05/10', '2023/05/09']


const entriesUrl = "https://fakerapi.it/api/v1/texts?_quantity=60&_characters=160"

async function pullEntries() {
    try {
        const entriesData = await axios.get(entriesUrl) 
        
        let entriesArray = entriesData.data.data.map(entry => {
            return {
                post: entry.content,
                mood: Math.floor(Math.random() * 10) + 1
            }})
        return entriesArray

    } catch (error) {
        console.log(error)

    }
}


async function seedDB() {
    let userInfo = []
    const entries = await pullEntries()


    demoUsers.forEach(async (user, idx) => {
        const newUser = await User.create(user)
        const dateIds = []
        dates.forEach(async (date) => {
            const createdDay = await Day.create({
                date: new Date(date),
                owner: newUser._id
            })
            
            dateIds.push(createdDay._id)

        })
        const someEntries = entries.slice(0,20 * (idx+1))

       
    })
    return userInfo
}
  



    // const entries = await pullEntries()

    // entries.forEach( async (entry) => {
    //     const randomUser = userInfo[Math.floor(Math.random() * 3) + 1]
    //    console.log(randomUser)
    //     // const randomDate = randomUser.dateIds[Math.floor(Math.random() * 5) + 1]
    //     // const foundDay = await Day.findById(randomDate)
    //     // foundDay.entries.push(entry)
    //     // await foundDay.save()
    // })
    // console.log('done')

    // // process.exit()





