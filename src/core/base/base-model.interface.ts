export interface BaseModel {
  /** MongoDB id (available after replicating) */
  id?: string;
  /** RxDatabase id */
  rxId: string;
  createdAt: string;
  updatedAt: string;
}
