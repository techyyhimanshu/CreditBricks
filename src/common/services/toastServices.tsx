import { toast, Slide, Flip, ToastContainer } from "react-toastify";

const Msg = (messageKey: string) => (
  <p className="text-white tx-14 mb-0">{messageKey}</p>
)

let currentToastId: any = null;

const showToast = (type: string = 'default', inxKey: string) => {
  var valkey = `${inxKey}`;
  if (currentToastId !== null) {
    toast.dismiss(currentToastId);
    currentToastId = null;
  }

  switch (type) {
    case 'success':
      currentToastId=toast.success(
        Msg(valkey),
        {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: false,
          transition: Slide,
          autoClose: 1000,
          theme: "colored",
        }
      );
      break;
    case 'error':
      currentToastId=toast.error(
        Msg(valkey),
        {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: false,
          transition: Flip,
          theme: "colored",
        }
      );
      break;
    case 'warning':
      currentToastId=toast.warn(
        Msg(valkey),
        {
          autoClose: 1000,
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: false,
          transition: Flip,
          theme: "colored",
        }
      );
      break;
    case 'info':
      currentToastId=toast.info(
        Msg(valkey),
        {
          autoClose: 5000,
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: false,
          transition: Flip,
          theme: "colored",
        });
      break;
    default:
      toast(valkey);
  }
};

const Toaster: typeof ToastContainer = ToastContainer;
export { showToast, Toaster };


// let options = {
  //   position: toast.POSITION.TOP_CENTER,
  //   hideProgressBar: false,
  //   transition: type === 'info' ? Flip : Slide,
  //   theme: "colored",
  // };
