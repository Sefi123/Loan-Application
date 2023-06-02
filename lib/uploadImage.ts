import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";
import { bucket } from "./firebaseConfig";

async function uploadImageAsync(
  uri: string,
  location: string
): Promise<string> {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const originalExtension = getExtension(uri);
  const filename = `${new Date().getTime()}.${originalExtension}`;
  const fileRef = ref(bucket, `/${location}/${filename}`);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}

export const getExtension = (url: string): string => {
  let parts = url.split(".");
  let result = parts.pop();
  return result as string;
};

export default uploadImageAsync;
