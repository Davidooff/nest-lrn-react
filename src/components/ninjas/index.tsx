import useAxios from "../../hooks/useAxios";
import ninjasInstance from "../../apis/ninjas";

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
      {!loading && ninjas && <p>{JSON.stringify(ninjas)}</p>}
      {!loading && !ninjas && !error && <p>No info to display</p>}
    </div>
  );
}

export default Ninjas;
