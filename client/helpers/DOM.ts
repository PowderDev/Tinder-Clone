import { Message } from "../types/messenger";
import { StylesConfig } from "react-select";
import chroma from "chroma-js";

export const getInputClass = (valid: string | undefined | boolean) => {
  return `
  py-2 px-3 rounded-lg border-2 ${!valid ? "border-purple-300" : "border-red-300"} mt-1 
  focus:outline-none focus:ring-2 ${
    !valid ? "focus:ring-purple-600" : "focus:ring-red-600"
  }  focus:border-transparent
  `;
};

export const excludeSenderImage = (messages: Message[]) => {
  const msgs = [...messages];
  for (let i = 1; i < msgs.length; i++) {
    const prev = msgs[i - 1];
    const curr = msgs[i];

    if (curr.sender.id === prev.sender.id) {
      curr.sender.photoURL = "";
    }
  }
  return msgs;
};

export const colorStyles: StylesConfig<{ color: string }, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color:
        data.color == "#ffffff"
          ? "#dadada"
          : isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color == "#ffffff" ? "#ccc" : data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color == "#ffffff" ? "#000" : data.color,
    ":hover": {
      backgroundColor: data.color == "#ffffff" ? "#848484" : data.color,
      color: data.color == "#ffffff" ? "#000" : "white",
    },
  }),
};
