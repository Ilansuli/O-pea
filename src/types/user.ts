export type UserObj={
    username: string
    fullname: string
    password: string
    imgUrl:string
    _id?:string
    pantry:string[]
}
export type RefubrishedUserObj={
    fullname: string
    imgUrl:string
    _id:string
    pantry:string[]
}
export type UserCred={
    username:string
    password:string
    fullname?:string
    imgUrl?:string
    pantry?:string[]
}
