import  prisma from '../src/libs/prisma'


export default async function getUsers(){
    try{
        const users = prisma.user.findMany()
        return users
    } catch(error){
 throw new Error(error)
    }
}