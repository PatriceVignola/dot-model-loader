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

export class Wwdc2010Model {
  faces: Face[];

  constructor(faces: Face[]) {
    this.faces = faces;
  }
}

class Wwdc2010ModelLoader {
  static load() {
    return new Wwdc2010Model([]);
  }
}

export default Wwdc2010ModelLoader;
