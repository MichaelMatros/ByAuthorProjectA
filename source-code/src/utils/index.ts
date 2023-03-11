import { flattenDeep, uniq } from "lodash";

export function createClasses(...classes: any[]) {
  return uniq(flattenDeep(classes)).filter(Boolean).join(" ");
}

export function randomBGImage() {
  const images = [
    "https://ic.wampi.ru/2023/02/13/Main-image-FinalVersion.jpg",
    "https://images.unsplash.com/photo-1640474252967-0615aef6d74c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ];

  return images[Math.floor(Math.random() * images.length)];
}
