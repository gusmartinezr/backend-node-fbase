export class Task {
  constructor(
    public title: string,
    public description: string,
    public userId: string,
    public createdAt: number = Date.now(),
    public completed: boolean = false,
    public id?: string
  ) {}
}
