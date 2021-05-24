// const TABLES = Object.freeze({
import Activity from './../screens/activity';
//   USER: "user"
// })
enum Table {
  User = 'user',
  File = 'file',
  Experience = 'experience',
  Participant = 'participant',
  ExpeType = 'expe_type',
  ExpeTypeMusic = 'expe_type_music',
  TEST = 'test'
}

enum Procedure {}

enum ActivityType {
  Party = 1,
  Birthday,
  Meeting,
  Trip,
  Wedding,
  Others,
}

export {Table, Procedure, ActivityType};
