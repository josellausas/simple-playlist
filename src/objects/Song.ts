export class Song extends Object {
  name: string;
  id: string;
  isSelected: boolean;

  constructor(s: {name: string; id: string}) {
    super();
    this.name = s.name;
    this.id = s.id;
    this.isSelected = false;
  }
}
