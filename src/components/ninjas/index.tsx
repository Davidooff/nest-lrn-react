import useAxios from "../../hooks/useAxios";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import ninjasInstance from "../../apis/ninjas";
import { RoleContext } from "../../App";
import { useContext } from "react";
import { NinjaInterface } from "../../types/Ninja";
import CreateNewNinja from "./src/createNewNinja";

function Ninjas() {
  const [ninjas, error, loading] = useAxios({
    axiosInstance: ninjasInstance,
    method: "get",
    URL: "/",
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>Error</p>}
      {!loading && ninjas && (
        <>
          {(ninjas as Array<NinjaInterface>).map((el) => (
            <Ninja
              _id={el._id}
              name={el.name}
              weapon={el.weapon}
              age={el.age}
              color={el.color}
            />
          ))}
          <CreateNewNinja />
        </>
      )}
      {!loading && !ninjas && !error && <p>No info to display</p>}
    </div>
  );
}

function Ninja(ninjaEl: NinjaInterface) {
  const role = useContext(RoleContext);
  const { _id, name, weapon, age, color } = ninjaEl;
  return (
    <article id={String(_id)} key={_id}>
      <h1>{name}</h1>
      <p>age: {age}</p>
      <p>weapon {weapon}</p>
      <p>color: {color}</p>
      {role !== null && role >= 1 && <div className="close">X</div>}
    </article>
  );
}

export default Ninjas;
