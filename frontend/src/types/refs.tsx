import { useRef } from "react";

export function useModalRefs() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  return {
    titleRef,
    descriptionRef,
    startDateRef,
    endDateRef,
    imageUrlRef,
    urlRef,
    sizeRef,
    nameRef,
  };
}
