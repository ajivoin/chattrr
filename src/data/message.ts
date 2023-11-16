class Message {
  model: string;
  role: string;
  content: string;
  constructor(model: string, role: string, content: string) {
    this.model = model;
    this.role = role;
    this.content = content;
  }
}

export { Message };
