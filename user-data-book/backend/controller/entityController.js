import Entity from '../models/entityModels.js'

//@route GET /api/entity
//@desc middleware
const getEntities = async (req, res) => {
    const { tableName } = req.params
    try {
        const entitiesToReturn = await Entity.find({ tableName, userId: req.user._id })
        res.status(201).json({ data: entitiesToReturn })
    } catch (error) {
        res.status(401).json({ error: "Error in adding entity" })
    }
}


//@route POST /api/entity
//@desc middleware
const addEntity = async (req, res) => {
    const { name, dob, email, phoneNumber, tableName } = req.body
    try {
        const entity = await Entity.create({ name, dob, email, phoneNumber, tableName, userId: req.user._id });
        if (entity) {
            res.status(201).json({ message: "SUCCESS" })
        } else {
            throw new Error("Error in adding entity");
        }
    } catch (error) {
        res.status(401).json({ error: "Error in adding entity" })
    }
}

//@route DELETE /api/entity/:entityId
//@desc middleware
const deleteEntity = async (req, res) => {
    const entityId = req.params.entityId
    try {
        await Entity.deleteOne({ _id: entityId })
        res.status(201).json({ message: "SUCCESS" })
    } catch (error) {
        res.status(401).json({ error: "Error in adding entity" })
    }
}
export {
    addEntity,
    deleteEntity,
    getEntities
}