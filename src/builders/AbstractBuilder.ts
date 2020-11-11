
export abstract class AbstractBuilder<DBENTITY, ENTITY> {
  public abstract fromDatabaseEntity(entity: DBENTITY): ENTITY;

  public fromDatabaseEntities(entities: DBENTITY[]): ENTITY[] {
    return entities.map(entity => this.fromDatabaseEntity(entity))
  }
}
