import { toast } from "react-toastify";

export const showMessage = (message, type = "success") => {
  if (type === "error") {
    toast.error(message);
  } else {
    toast.success(message);
  }
};
