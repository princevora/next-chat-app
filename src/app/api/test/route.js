import Users from "../../../../DB/models/User";

export async function POST(){
    const email = "princavor@ga.conm";
    const user = await new Users().where("email", "=", email);
    console.log("user: ", await user.exists(), await user.first());
}