let MonsterID = 1000

class Monster {
  constructor(name, age, description) {
    this.name = name
    this.age = age
    this.description = description
    this.id = ++MonsterID
  }
}
