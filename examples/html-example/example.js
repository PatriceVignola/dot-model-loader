document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    document.getElementById('model-input').addEventListener('change', handleModelFile, false);
  }
}

function handleModelFile(inputEventParams) {
  if (inputEventParams.target.files.length !== 1) return;

  const file = inputEventParams.target.files[0];
  const fileReader = new FileReader();

  fileReader.onload = (fileLoadParams) => {
    const model = Wwdc2010ModelLoader.load(fileLoadParams.target.result);
    console.log(model);
  }

  fileReader.readAsArrayBuffer(file);
}
