import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users", {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((jsonRes) => {
        setUsers(jsonRes);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <h3>{<Spinner />}</h3>}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {!loading &&
          users.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
    </>
  );
}

export default UserResults;
