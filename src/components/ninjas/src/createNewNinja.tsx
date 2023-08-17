import { useEffect, useState } from "react";
import useAxiosCreateNewNinja from "../../../hooks/useAxiosCreateNinja";
import ninjasInstance from "../../../apis/ninjas";
import { NinjaData, NinjaInterface } from "../../../types/Ninja";
import isAnNinjaData from "../../../types/guard/NinjaDataGuard";

function CreateNewNinja() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div onClick={() => setIsOpen(true)}>+</div>
      {isOpen && <CreateNinjaForm setIsOpen={setIsOpen} />}
    </>
  );
}

interface CreateNinjaFormArgs {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateNinjaForm({ setIsOpen }: CreateNinjaFormArgs) {
  const [
    createNinjaData,
    errorCreateNinja,
    loadingCreateNinja,
    operationCreateNinja,
  ] = useAxiosCreateNewNinja({
    axiosInstance: ninjasInstance,
    method: "post",
    URL: "/",
  });

  useEffect(() => {
    if (createNinjaData) {
      window.location.reload();
    }
  }, [createNinjaData]);

  function createNinja(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const ninja = {
      name: formData.get("name"),
      weapon: formData.get("weapon"),
      age: parseInt(formData.get("age") as string),
      color: formData.get("color"),
    };
    if (isAnNinjaData(ninja)) {
      operationCreateNinja(ninja);
    }
  }

  return (
    <form onSubmit={createNinja}>
      <input name="name" placeholder="name" type="text" />
      <input name="weapon" placeholder="weapon" type="text" />
      <input name="age" placeholder="age" type="number" />
      <input name="color" placeholder="color" type="text" />
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateNewNinja;
