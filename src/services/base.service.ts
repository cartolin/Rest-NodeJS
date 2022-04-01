class BaseService<T, ID> {
    
    private repository: any;

    constructor(repository: any){
        this.repository = repository;
    }
  
    public async getAll() {
      const entities: any[] = await this.repository.getAll();
      return entities;
    }
  
    public async getById(id: ID) {
      const entity = await this.repository.getById(id);
      return entity;
    }
  
    public async create(entity: T) {
      const createdEntity = await this.repository.create(entity);
      return createdEntity;
    }
  
    public async update(id: ID, entity: T) {
      const updatedEntity = await this.repository.update(id, entity);
      return updatedEntity;
    }
  
    public async delete(id: ID) {
      const deleteEntity =  await this.repository.delete(id);
      return deleteEntity;
    }
  }
  
  export default  BaseService;
  