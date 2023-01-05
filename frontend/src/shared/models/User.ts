enum role {
  user = 'user',
  guide = 'guide',
  leadGuide = 'lead-guide',
}
export class User {
  private username!: string;
  private password!: string;
  private role!: role;
  private photo: string;
  private email: string;
}
