export interface Character {
  key?: string;
  name: string;
  classes: {
    class: string,
    classLevel: string
  }[];
  race: string;
  home: string;
  theme: string;
  size: string;
  gender: string;
  speed: string;
  alignment: string;
  deity: string;
}
