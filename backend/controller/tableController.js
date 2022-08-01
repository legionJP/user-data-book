import Entitie from "../models/entityModels.js"
import User from "../models/userModels.js"
import { removeItemOnce } from "../utils/array.js"
import generateToken from "../utils/token.js"

//@route POST /api/table/:tableName
//@desc middleware
const addTable = async (req, res) => {
    const tableNameToAdd = req.params.tableName
    if (!tableNameToAdd || tableNameToAdd === '') {
        return res.status(400).json({ message: "Wrong/Empty Table Name" })
    }
    var { _id, email, name, tableName = [] } = req.user
    try {
        await User.findOneAndUpdate({ _id }, { $addToSet: { tableName: tableNameToAdd } })
        tableName.push(tableNameToAdd)
        res.status(201).json({ token: generateToken(_id, name, email, tableName) })
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
}

//@route DELETE /api/table/:tableName
//@desc middleware
const deleteTable = async (req, res) => {
    const tableNameToDelete = req.params.tableName
    if (!tableNameToDelete || tableNameToDelete === '') {
        return res.status(400).json({ message: "Wrong/Empty Table Name" })
    }
    var { _id, email, name, tableName = [] } = req.user
    try {
        // delete all entity from table
        await Entitie.deleteMany({ tableName: tableNameToDelete, userId: _id })

        // remove table from table array
        await User.findOneAndUpdate({ _id }, { $pull: { tableName: tableNameToDelete } })

        tableName = removeItemOnce(tableName, tableNameToDelete)
        res.status(201).json({ token: generateToken(_id, name, email, tableName) })
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
}

export {
    addTable,
    deleteTable
}