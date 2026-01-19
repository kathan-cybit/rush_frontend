import { useNavigate } from "react-router-dom";
import { RoleContainer } from "../../shared-components/containers";

export default function Roles() {
  const navigate = useNavigate();
  const navigateFunction = (url: string) => {
    navigate(url);
  };
  return (
    <div>
      <RoleContainer navigateFunction={navigateFunction} />
    </div>
  );
}
