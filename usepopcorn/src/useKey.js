import { useEffect } from "react";
export function useKey(key, callback) {
  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    });

    return function () {
      document.removeEventListener("keydown", function (e) {
        if (e.code === key) {
          callback();
        }
      });
    };
  }, [callback, key]);
}
