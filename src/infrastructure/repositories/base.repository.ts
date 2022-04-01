class BaseRepository <T, ID> {

    private entity;

    constructor(entity: any){
        this.entity = entity;
    }

    /**
     * All entity in database
     * @returns Entity object list
     */
    public getAll(){
        return this.entity.findAll()
            .then((data: any) =>{
                return data;
            }).catch((err: any) => {
                throw new Error(err);
            });
    }

    /**
     * Entity in database
     * @param id identifier
     * @returns Entity object
     */
    public getById(id: ID) {
        return this.entity.findOne({ where: { id } })
            .then((data: any) => {
                return data;
            }).catch((err: any) => {
                throw new Error(err);
            });
    }

    /**
     * Insert Entity in database
     * @param entity object to add 
     * @returns Entity object
     */
    public create(entity: T) {
        return this.entity.create(entity)
            .then((data: any) => {
                return data;
            }).catch((err: any) => {
                throw new Error(err);
            });
    }

    /**
     * Update Entity in database
     * @param id identifier
     * @param entity object to modify 
     * @returns 0: Incompleted, 1: Completed
     */
    public update(id : ID, entity: T) {
        return this.entity.update(entity, { where: { id } })
            .then((data: any) => {
                return (data === 1 || data[0] === 1)? 1: 0;
            }).catch((err: any) => {
                throw new Error(err);
            });
    }

    /**
     * Delete Entity in database
     * @param id identifier
     * @returns 0: Incompleted, 1: Completed
     */
    public delete(id: ID) {
        return this.entity.destroy({ where: { id } })
            .then((data: any) => {
                return (data === 1 || data[0] === 1) ? 1 : 0;
            }).catch((err: any) => {
                throw new Error(err);
            });
    }

}

export default BaseRepository;