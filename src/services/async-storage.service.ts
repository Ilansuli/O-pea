export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

interface Entity  {
    _id: string
    }

function query(entityType:string, delay = 500): Promise<object[]> {
    console.log();
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType:string, entityId:string): object {
    return query(entityType).then((entities) => {
        const entity = entities.find((entity: Entity) => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}


function post(entityType:string, newEntity: Entity): Promise<object> {
    newEntity= JSON.parse(JSON.stringify(newEntity))    
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType : string, updatedEntity: Entity): Promise<object> {
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity))    
    return query(entityType).then(entities => {
        const idx = entities.findIndex((entity: Entity) => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType:string, entityId:string): Promise<void> {
    return query(entityType).then(entities => {
        const idx = entities.findIndex((entity:Entity) => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType:string, entities:object[]):void {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}