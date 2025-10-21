import dotenv from "dotenv";
import jwt from "jsonwebtoken"; 
dotenv.config();

export async function gerarToken(id,email){
    const token = await jwt.sign(
      { id: id, email: email},
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return token;
}

