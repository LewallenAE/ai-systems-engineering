import { insertDB, saveDB, getDB } from "./db.js"

export const newNote = async (note, tags) => {
    const newNote = {
        tags, 
        id: Date.now(),
        content: note,
    }

    await insertDB(newNote)
    return newNote

}

export const getAllNotes = async () => {
    const { notes } = await getDB()
    return notes
}

export const getAllUsers = async () => {
    const { users } = await getDB()
    return users
}

export const findNotes = async (filter) => {
    const { notes } = await getAllNotes()
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
}

export const removeNote = async (id) => {
    const notes = await getAllNotes()

    if (match) {
        const newNotes = notes.filter(note => note.id !== id)
        await saveDB({notes: newNotes})
        return id
    }
}

export const removeAllNotes = async () => {
    await saveDB({notes: []})
}