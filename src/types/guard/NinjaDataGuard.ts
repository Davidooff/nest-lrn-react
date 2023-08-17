import { NinjaData } from "../Ninja";

function isAnNinjaData(obj: any): obj is NinjaData {
  return (
    "name" in obj &&
    "color" in obj &&
    "age" in obj &&
    "weapon" in obj &&
    obj.name.length > 0 &&
    obj.color.length > 0 &&
    obj.age > 0 &&
    obj.age < 100 &&
    obj.weapon.length > 0
  );
}

export default isAnNinjaData;
