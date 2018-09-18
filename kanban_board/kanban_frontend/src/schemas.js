import schema from 'normalizr'

const commentSchema = new schema.Entity('comments')

const cardSchema = new schema.Entity('cards', {
    comments: [commentSchema]
})

const listSchema = new schema.Entity('lists', {
    lists: [cardSchema]
})

const boardSchema = new schema.Entity('boards', {
    boards: [listSchema]
})

export {
    commentSchema,
    cardSchema,
    listSchema,
    boardSchema
}