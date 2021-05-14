import cookie from "cookie"
// import { URL_API } from "../../config"

export default async (req, res) => {
    if (req.method === 'POST') {
        res.setHeader("Set-Cookie", cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
        }))
        res.status(200).json({ message: "success" })
    } else {
        res.setHeader("Allow", ["POST"])
        res.status(405).json({ message: `Method ${rep.method} not allowed` })
    }
}