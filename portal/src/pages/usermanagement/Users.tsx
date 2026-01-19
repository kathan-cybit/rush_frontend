import { useNavigate } from "react-router-dom";
import { UserContainer } from "../../shared-components/containers";

export default function Users() {
  const navigate = useNavigate();
  const navigateFunction = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <UserContainer navigateFunction={navigateFunction} />
    </div>
  );
}
