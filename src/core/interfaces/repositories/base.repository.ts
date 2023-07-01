interface IBaseRepository<T> {
  findOneById: (id: string) => Promise<T | null>;

  createOne(data: T): Promise<T>;

  updateById(id: string, data: T): Promise<T | null>;
}

export { IBaseRepository };
