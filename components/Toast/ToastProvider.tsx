import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { ToastContainer, ToastContainerProps } from "./ToastContainer";

////////////////////////////////
// Types and Interfaces
////////////////////////////////

export type ToastProviderProps = {
  children: ReactNode;
} & ToastContainerProps;

type ToastMessageType = "Info" | "Success" | "Warning" | "Error";

type Truncate = "truncate-1-lines" | "truncate-2-lines" | "truncate-3-lines";

export interface Toast {
  id: string;
  lifetime: number;
  message: string | ReactNode;
  type?: ToastMessageType;
  truncate?: Truncate;
  icon?: IconProp;
  header?: string;
}

export interface ToastContextType {
  data: Array<Toast>;
  pushError(message: string, lifetime?: number, truncate?: Truncate): void;
  pushWarning(message: string, lifetime?: number, truncate?: Truncate): void;
  pushSuccess(message: string, lifetime?: number, truncate?: Truncate): void;
  pushInfo(message: string, lifetime?: number, truncate?: Truncate): void;
  push(
    message: string,
    type: ToastMessageType,
    lifetime?: number,
    truncate?: Truncate
  ): void;
  pushCustom(
    message: string | ReactNode,
    lifetime: number,
    truncate?: Truncate,
    icon?: IconProp | ReactNode
  ): void;
  remove(id: string): void;
}

////////////////////////////////
// Global and Helpers
////////////////////////////////

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const useToast = () => useContext(ToastContext);

const DEFAULT_INTERVAL = 2500;

/////////////////////////////////////
/// Implementation
/////////////////////////////////////

export const ToastProvider = ({ children, variant }: ToastProviderProps) => {
  const [data, setData] = useState<Array<Toast>>([]);

  const Push = useCallback(
    (
      message: string,
      type: ToastMessageType,
      lifetime?: number,
      truncate?: Truncate
    ) => {
      if (message) {
        const new_item: Toast = {
          id: uuidv4(),
          message: message,
          type: type,
          lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
          truncate: truncate,
        };

        setData((prevState) => [...prevState, new_item]);
      }
    },
    [setData]
  );

  const PushCustom = useCallback(
    (
      message: string | ReactNode,
      lifetime?: number,
      truncate?: Truncate,
      icon?: IconProp
    ) => {
      if (message) {
        const newItem: Toast = {
          id: uuidv4(),
          message: message,
          lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
          truncate: truncate,
          icon: icon,
          type: undefined,
        };

        setData((prevState) => [...prevState, newItem]);
      }
    },
    [setData]
  );

  const PushError = useCallback(
    (message: string, lifetime?: number, truncate?: Truncate) =>
      Push(message, "Error", lifetime, truncate),
    [Push]
  );
  const PushWarning = useCallback(
    (message: string, lifetime?: number, truncate?: Truncate) =>
      Push(message, "Warning", lifetime, truncate),
    [Push]
  );
  const PushSuccess = useCallback(
    (message: string, lifetime?: number, truncate?: Truncate) =>
      Push(message, "Success", lifetime, truncate),
    [Push]
  );
  const PushInfo = useCallback(
    (message: string, lifetime?: number, truncate?: Truncate) =>
      Push(message, "Info", lifetime, truncate),
    [Push]
  );

  const ToastModel = useCallback(
    () => ({
      data: data,
      pushError: PushError,
      pushWarning: PushWarning,
      pushSuccess: PushSuccess,
      pushInfo: PushInfo,
      push: Push,
      pushCustom: PushCustom,

      async remove(id: string) {
        setData((prevState) => prevState.filter((e) => e.id != id));
      },
    }),
    [
      data,
      setData,
      PushError,
      PushWarning,
      PushSuccess,
      PushInfo,
      Push,
      PushCustom,
    ]
  );

  return (
    <ToastContext.Provider value={ToastModel()}>
      <ToastContainer variant={variant} />
      {children}
    </ToastContext.Provider>
  );
};
