import { useNavigate } from "react-router-dom";

export const useRouter = () => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    switch (key) {
      case "1":
        navigate("/dictionary");
        break;
      case "2":
        navigate("/grammar");
        break;
      default:
        console.warn("Chưa xử lý route cho key:", key);
    }
  };

  return { handleMenuClick };
};
