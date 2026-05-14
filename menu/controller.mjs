import {prisma} from "../Prisma/prisma_client.mjs"
const createMenu = async (req, res) => {
    console.log(req.body)
    const menu = await prisma.Menu.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            Price_half: req.body.price_half,
            Price_full: req.body.price_full,
            created_by: req.body.created_by
        }
    })
    res.json(menu)
};
const getMenu = async (req, res) => {
    res.json({massage:"Get"})
}
const updateMenu = async (req, res) => {
    res.json({massage:"update"})
}
const deleteMenu = async (req, res) => {
    res.json({massage:"delete"})
}
export { createMenu, getMenu, updateMenu, deleteMenu }