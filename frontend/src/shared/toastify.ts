import {toast} from 'react-toastify';
import type {  ToastOptions, ToastContent } from 'react-toastify';

const defaultOptions:ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
};

interface PromiseMessages {
    pending: string;
    success: string;
    error: string;
}

const toastifyService = {
    success: (message: ToastContent, options: ToastOptions = {}) => {
        toast.success(message, { ...defaultOptions, ...options });
    },
    error: (message: ToastContent, options: ToastOptions = {}) => {
        toast.error(message, { ...defaultOptions, ...options });
    },
    info: (message: ToastContent, options: ToastOptions = {}) => {
        toast.info(message, { ...defaultOptions, ...options });
    },
    warning: (message: ToastContent, options: ToastOptions = {}) => {
        toast.warning(message, { ...defaultOptions, ...options });
    },
    default: (message: ToastContent, options: ToastOptions = {}) => {
        toast(message, { ...defaultOptions, ...options });
    },

    // 3. ปรับแต่ง Promise ให้รองรับ Generic Type <T>
    promise: <T>(
        promise: Promise<T>,
        messages: PromiseMessages,
        options: ToastOptions = {}
    ) => {
        return toast.promise(
            promise,
            {
                pending: messages.pending,
                success: messages.success,
                error: messages.error,
            },
            { ...defaultOptions, ...options }
        );
    },

    // 4. กำหนด Type ให้ errorType (เช่น number หรือ string)
    errorOption: (errorType: number | string, options: ToastOptions = {}) => {
        let message = "something went wrong";
        if (errorType === 500) {
            message = "something went wrong, please try again";
        } else {
            message = "something went wrong, please Login";
        }
        toast.error(message, { ...defaultOptions, ...options });
    },
};

export default toastifyService;