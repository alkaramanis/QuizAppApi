enum role {
  user = 'user',
  guide = 'guide',
  leadGuide = 'lead-guide',
}
export class User {
  public username!: string;
  private password!: string;
  private role!: role;
  public photo: string;
  private email: string;
}
