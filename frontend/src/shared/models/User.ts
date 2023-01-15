enum role {
  user = 'user',
  guide = 'guide',
  leadGuide = 'lead-guide',
}
export class User {
  private id!: string;
  public username!: string;
  private password!: string;
  private role!: role;
  public photo: string;
  private email: string;
  public name: string;
  private token!: string;
}
