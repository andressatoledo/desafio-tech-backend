import bcrypt from "bcrypt";

export async function criptografarSenha(senhaDescriptografada) {

    const complexidade = 2;
    const senhaCriptografada = await bcrypt.hash(senhaDescriptografada,complexidade);

    return senhaCriptografada;
}

