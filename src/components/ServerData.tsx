import { getSession } from "next-auth/react";

export default async function ServerData(req: any) {
    const session = await getSession({ req });
    const message = session ? `Witaj, ${session.user.name}!` : "Nie jesteś zalogowany.";
    return message;
}