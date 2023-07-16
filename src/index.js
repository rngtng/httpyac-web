import { WebContainer } from '@webcontainer/api';
import { files } from './files.js';

/** @type {import('@webcontainer/api').WebContainer}  */
let webcontainerInstance;

window.addEventListener('load', async () => {
  textareaEl.value = files['get.http'].file.contents;

  // Call only once
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  const exitCode = await installDependencies();
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  }

  textareaOutEl.value = "";

  button.addEventListener('click', (e) => {
    writeIndexJS(textareaEl.value);
  });
});

async function installDependencies() {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    })
  );
  // Wait for install command to exit
  return installProcess.exit;
}

// /**
//  * @param {string} content
//  */
async function writeIndexJS(content) {
  await webcontainerInstance.fs.writeFile('/get.http', content);
  textareaOutEl.value = "";
  const installProcess = await webcontainerInstance.spawn('httpyac', ['get.http', '-a', '-o none']);
  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        textareaOutEl.value += data;
      },
    })
  );
}

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="editor">
      <textarea></textarea>
      <button type="button">Execute</button>
    </div>
    <div class="output">
      <textarea readonly>Loading....</textarea>
    </div>
  </div>
`;

/** @type {HTMLTextAreaElement | null} */
const textareaEl = document.querySelector('textarea');

/** @type {HTMLTextAreaElement | null} */
const textareaOutEl = document.querySelector('.output textarea');

/** @type {HTMLTextAreaElement | null} */
const button = document.querySelector('button');
