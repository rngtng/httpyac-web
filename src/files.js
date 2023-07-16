/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'get.http': {
    file: {
      contents: "GET https://httpbin.org/get",
    },
  },
  'package.json': {
    file: {
      contents: `
          {
            "name": "example-app",
            "type": "module",
            "dependencies": {
              "httpyac": "latest"
            },
            "scripts": {
              "start": "nodemon index.js"
            }
          }`,
    },
  },
};
