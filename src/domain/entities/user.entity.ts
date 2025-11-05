export class User {
  constructor(
    public email: string,
    public createdAt: number = Date.now(),
    public id?: string
  ) {}
}
