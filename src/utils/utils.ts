import bcrypt from 'bcrypt';

export const hashPassword = (password:string) : string => {
    return bcrypt.hashSync(password,1);
}

export const comparePassword = (password:string, hashPassword:string) : boolean => {
    return bcrypt.compareSync(password,hashPassword)
}