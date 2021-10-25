export interface IJWTProvider {
  create(user: any, minutes: number): string;
  decode(token: string): any;
}
