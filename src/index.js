/* @flow */

export type TexCoord = {
  u: number,
  v: number,
};

export type Vector = {
  x: number,
  y: number,
  z: number,
};

export type Face = {
  vertices: Vector[],
  normals: Vector[],
  texCoords: TexCoord,
};

class Wwdc2010ModelLoader {
  static load(filePath: string) {
    console.log(`Loading model: ${filePath}`);
  }
}

export class Wwdc2010Model {
  faces: Face[];

  constructor(faces: Face[]) {
    this.faces = faces;
  }

  static load(path: string) {
    console.log('Loading...');
  }
}

export default Wwdc2010ModelLoader; // eslint-disable-line
