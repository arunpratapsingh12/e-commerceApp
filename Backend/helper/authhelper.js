import bcrypt from "bcrypt";

export const hashpassward = async (passward) => {
    try {
        const saltnumber = 10;
        const hashedpassward = await bcrypt.hash(passward, saltnumber);
        return hashedpassward;
    } catch (error) {
        console.log(error)
        
    }
};

export const comparepassward = (passward, hashedpassward) => {
    return bcrypt.compare(passward, hashedpassward);
}