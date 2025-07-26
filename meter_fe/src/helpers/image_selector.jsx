export function selectImage() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        resolve(file);
      } else {
        reject(new Error("No file selected"));
      }
    };

    input.onerror = (err) => reject(err);
  });
}
