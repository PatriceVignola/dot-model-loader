/**
 * @format
 * @flow
 */

import fs from 'fs';
import path from 'path';

import loadDotModel from './loadDotModel';

describe('DotModelLoader', () => {
  const modelPath = path.resolve(__dirname, '../../models', 'demon.model');
  const {buffer} = fs.readFileSync(modelPath);

  it('parses the model correctly', async () => {
    const model = loadDotModel(buffer);
    expect(model.indices).toMatchSnapshot(); // 36120 indices
    expect(model.vertexCoordinates).toMatchSnapshot(); // 26310 vertex coords
    expect(model.uvCoordinates).toMatchSnapshot(); // 17540 UV coords
    expect(model.normalCoordinates).toMatchSnapshot(); // 26310 normal coords
  });

  it('parses uint16 indices correctly', () => {
    // TODO: Refactor
    const indexBufferSizePos = 60;
    const startPos = 80;
    const newBuffer = buffer.slice(0);
    const dataView = new DataView(newBuffer);
    const prevBufferSize = dataView.getUint32(indexBufferSizePos, true);

    // We divide the buffer size by 2 because we want to parse uint16 indices
    // intead of uint32
    dataView.setUint32(indexBufferSizePos, prevBufferSize / 2, true);

    // TODO: Use a specific model for this test instead of modifying it manually
    for (let i = 0; i < 36120; i++) {
      const current = dataView.getUint32(startPos + i * 4, true);
      dataView.setUint16(startPos + i * 2, current, true);
    }

    const model = loadDotModel(newBuffer);
    expect(model.indices).toMatchSnapshot();
  });

  it('parses uint8 indices correctly', () => {
    // TODO: Refactor
    const indexBufferSizePos = 60;
    const startPos = 80;
    const newBuffer = buffer.slice(0);
    const dataView = new DataView(newBuffer);
    const prevBufferSize = dataView.getUint32(indexBufferSizePos, true);

    // We divide the buffer size by 4 because we want to parse uint8 indices
    // intead of uint32
    dataView.setUint32(indexBufferSizePos, prevBufferSize / 4, true);

    // TODO: Use a specific model for this test instead of modifying it manually
    for (let i = 0; i < 36120; i++) {
      const current = dataView.getUint32(startPos + i * 4, true);
      dataView.setUint8(startPos + i, current);
    }

    const model = loadDotModel(newBuffer);
    expect(model.indices).toMatchSnapshot();
  });

  it('parses float64 vertex coordinates correctly', () => {
    // TODO: Refactor
    const numVertexPos = 144576;
    const startPos = 144580;
    const newBuffer = buffer.slice(0);
    const dataView = new DataView(newBuffer);
    const prevNumVertex = dataView.getUint32(numVertexPos, true);

    // We divide the number of vertices by 2 because we want to parse float64
    // vertex coordinates instead of float32. This is a quick hack until we have
    // real models to test since multiplying the buffer size by 2 would break
    // the parsing for the rest of the model.
    dataView.setUint32(numVertexPos, prevNumVertex / 2, true);

    // TODO: Use a specific model for this test instead of modifying it manually
    for (let i = 35080 / 2 - 1; i >= 0; i--) {
      const current = dataView.getFloat32(startPos + i * 4, true);
      dataView.setFloat64(startPos + i * 8, current, true);
    }

    const model = loadDotModel(newBuffer);
    expect(model.vertexCoordinates).toMatchSnapshot();
  });

  it('parses float64 UV coordinates correctly', () => {
    // TODO: Refactor
    const numUVPos = 284916;
    const startPos = 284920;

    const newBuffer = buffer.slice(0);
    const dataView = new DataView(newBuffer);
    const prevNumUV = dataView.getUint32(numUVPos, true);

    // We divide the number of UV by 2 because we want to parse float64 UV
    // coordinates instead of float32. This is a quick hack until we have real
    // models to test since multiplying the buffer size by 2 would break the
    // parsing for the rest of the model.
    dataView.setUint32(numUVPos, prevNumUV / 2, true);

    // TODO: Use a specific model for this test instead of modifying it manually
    for (let i = 17540 / 2 - 1; i >= 0; i--) {
      const current = dataView.getFloat32(startPos + i * 4, true);
      dataView.setFloat64(startPos + i * 8, current, true);
    }

    const model = loadDotModel(newBuffer);
    expect(model.uvCoordinates).toMatchSnapshot();
  });

  it('parses float64 normal coordinates correctly', () => {
    // TODO: Refactor
    const numNormalsPos = 355096;
    const startPos = 355100;

    const newBuffer = buffer.slice(0);
    const dataView = new DataView(newBuffer);
    const prevNumNormal = dataView.getUint32(numNormalsPos, true);

    // We divide the number of normals by 2 because we want to parse float64
    // normal coordinates instead of float32. This is a quick hack until we have
    // real models to test since multiplying the buffer size by 2 would go out
    // of bounds
    dataView.setUint32(numNormalsPos, prevNumNormal / 2, true);

    // TODO: Use a specific model for this test instead of modifying it manually
    for (let i = 26310 / 2 - 1; i >= 0; i--) {
      const current = dataView.getFloat32(startPos + i * 4, true);
      dataView.setFloat64(startPos + i * 8, current, true);
    }

    const model = loadDotModel(newBuffer);
    expect(model.normalCoordinates).toMatchSnapshot();
  });

  it('throws an error when index types are not unsigned integers', () => {
    const insertPos = 64;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid type for indices: 999');
  });

  it('throws an error when faces are not triangles', () => {
    const insertPos = 68;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid type for faces: 999');
  });

  it('throws an error when the number of indices does not match the size of the index buffer', () => {
    const insertPos = 76;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError(
      'Mismatch between the size of the index buffer and the number of indices',
    );
  });

  it('throws an error when vertex coordinates are not float values', () => {
    const insertPos = 144564;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid type for vertex coordinates: 999');
  });

  it('throws an error when vertex primitives are not points', () => {
    const insertPos = 144568;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid type for vertices: 999');
  });

  it('throws an error when the number of coordinates per vertex is invalid', () => {
    const insertPos = 144572;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid number of coordinates per vertex: 999');
  });

  it('throws an error when the vertex coordinate size is invalid', () => {
    const insertPos = 144576;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);

    // We multiply the number of vertices by 2 to get a coordinate size of 2
    // instead of 4 and throw the expected error
    const numVertices = 8770;
    dataView.setUint32(0, numVertices * 2, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError(
      'Mismatch between the size of the vertex buffer and the number of vertices: 2',
    );
  });

  it('throws an error when UV coordinates are not float values', () => {
    const insertPos = 284904;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid type for UV coordinates: 999');
  });

  it('throws an error when UV primitives are not points', () => {
    const insertPos = 284908;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid type for UVs: 999');
  });

  it('throws an error when the number of coordinates per UV is invalid', () => {
    const insertPos = 284912;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid number of coordinates per UV: 999');
  });

  it('throws an error when the UV coordinate size is invalid', () => {
    const insertPos = 284916;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);

    // We multiply the number of UV by 2 to get a coordinate size of 2 instead
    // of 4 and throw the expected error
    const numUV = 8770;
    dataView.setUint32(0, numUV * 2, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError(
      'Mismatch between the size of the UV buffer and the number of UVs: 2',
    );
  });

  it('throws an error when normal coordinates are not float values', () => {
    const insertPos = 355084;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid type for normal coordinates: 999');
  });

  it('throws an error when normals are not points', () => {
    const insertPos = 355088;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid type for normals: 999');
  });

  it('throws an error when the number of coordinates per normal is invalid', () => {
    const insertPos = 355092;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);
    dataView.setUint32(0, 999, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError('Invalid number of coordinates per normal: 999');
  });

  it('throws an error when the normal coordinate size is invalid', () => {
    const insertPos = 355096;
    const badBuffer = buffer.slice(0);
    const dataView = new DataView(badBuffer, insertPos, 4);

    // We multiply the number of UV by 2 to get a coordinate size of 2 instead
    // of 4 and throw the expected error
    const numUV = 8770;
    dataView.setUint32(0, numUV * 2, true);

    expect(() => {
      loadDotModel(badBuffer);
    }).toThrowError(
      'Mismatch between the size of the normal buffer and the number of normals: 2',
    );
  });
});
