import toast from "react-hot-toast";

const error_toast = (err?: string): void => {
  toast.error(err || "Error!");
};

const success_toast = (msg?: string): void => {
  toast.success(msg || "Success!");
};

export { error_toast, success_toast };
