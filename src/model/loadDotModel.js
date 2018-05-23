/**
 * @format
 * @flow
 */

import StreamReader from '../stream/StreamReader';

const glTriangle = 4;
const glPoints = 0;
const glUnsignedInt = 5125;
const glFloat = 5126;

function parseIndices(streamReader: StreamReader): number[] {
  const bufferSize = streamReader.readUint32();
  const indexType = streamReader.readUint32();

  if (indexType !== glUnsignedInt) {
    throw Error(`Invalid type for indices: ${indexType}`);
  }

  const primitiveType = streamReader.readUint32();

  if (primitiveType !== glTriangle) {
    throw Error(`Invalid type for faces: ${primitiveType}`);
  }

  // Indices don't have a "size per coordinate", so we skip it
  streamReader.skipBytes(4);

  const numIndices = streamReader.readUint32();
  const indexTypeSize = bufferSize / numIndices;

  switch (indexTypeSize) {
    case 4:
      return [...Array(numIndices)].map(() => streamReader.readUint32());
    case 2:
      return [...Array(numIndices)].map(() => streamReader.readUint16());
    case 1:
      return [...Array(numIndices)].map(() => streamReader.readUint8());
    default:
      throw Error(
        'Mismatch between the size of the index buffer and the number of indices',
      );
  }
}

function parseVertexCoordinates(streamReader: StreamReader): number[] {
  const bufferSize = streamReader.readUint32();
  const coordinateType = streamReader.readUint32();

  if (coordinateType !== glFloat) {
    throw Error(`Invalid type for vertex coordinates: ${coordinateType}`);
  }

  const primitiveType = streamReader.readUint32();

  if (primitiveType !== glPoints) {
    throw Error(`Invalid type for vertices: ${primitiveType}`);
  }

  const numCoordinatesPerVertex = streamReader.readUint32();

  if (numCoordinatesPerVertex !== 3 && numCoordinatesPerVertex !== 4) {
    throw Error(
      `Invalid number of coordinates per vertex: ${numCoordinatesPerVertex}`,
    );
  }

  const numVertices = streamReader.readUint32();

  // We only need the first 3 coordinates of every vertex (x, y, z)
  const numCoordinates = numVertices * 3;
  const coordinateSize = bufferSize / numVertices / numCoordinatesPerVertex;

  if (coordinateSize !== 4 && coordinateSize !== 8) {
    throw Error(
      `Mismatch between the size of the vertex buffer and the number of vertices: ${coordinateSize}`,
    );
  }

  return [...Array(numCoordinates)].map((u, index) => {
    const coordinate =
      coordinateSize === 4
        ? streamReader.readFloat32()
        : streamReader.readFloat64();

    // If the vertices have 4 coordinates, we need to skip the fourth one (w) here
    if (numCoordinatesPerVertex === 4 && (index + 1) % 3 === 0) {
      streamReader.skipBytes(coordinateSize);
    }

    return coordinate;
  });
}

function parseUVCoordinates(streamReader: StreamReader): number[] {
  const bufferSize = streamReader.readUint32();
  const coordinateType = streamReader.readUint32();

  if (coordinateType !== glFloat) {
    throw Error(`Invalid type for UV coordinates: ${coordinateType}`);
  }

  // Primitive type
  const primitiveType = streamReader.readUint32();

  if (primitiveType !== glPoints) {
    throw Error(`Invalid type for UVs: ${primitiveType}`);
  }

  const numCoordinatesPerUV = streamReader.readUint32();

  if (numCoordinatesPerUV !== 2) {
    throw Error(`Invalid number of coordinates per UV: ${numCoordinatesPerUV}`);
  }

  const numUV = streamReader.readUint32();

  // We have 2 coordinates per UV
  const numCoordinates = numUV * numCoordinatesPerUV;
  const coordinateSize = bufferSize / numCoordinates;

  if (coordinateSize === 4) {
    return [...Array(numCoordinates)].map(() => streamReader.readFloat32());
  }

  if (coordinateSize === 8) {
    return [...Array(numCoordinates)].map(() => streamReader.readFloat64());
  }

  throw Error(
    `Mismatch between the size of the UV buffer and the number of UVs: ${coordinateSize}`,
  );
}

function parseNormalCoordinates(streamReader: StreamReader): number[] {
  const bufferSize = streamReader.readUint32();
  const coordinateType = streamReader.readUint32();

  if (coordinateType !== glFloat) {
    throw Error(`Invalid type for normal coordinates: ${coordinateType}`);
  }

  const primitiveType = streamReader.readUint32();

  if (primitiveType !== glPoints) {
    throw Error(`Invalid type for normals: ${primitiveType}`);
  }

  const numCoordinatesPerNormal = streamReader.readUint32();

  if (numCoordinatesPerNormal !== 3) {
    throw Error(
      `Invalid number of coordinates per normal: ${numCoordinatesPerNormal}`,
    );
  }

  const numNormals = streamReader.readUint32();

  // We have 3 coordinates per normal
  const numCoordinates = numNormals * numCoordinatesPerNormal;
  const coordinateSize = bufferSize / numCoordinates;

  if (coordinateSize === 4) {
    return [...Array(numCoordinates)].map(() => streamReader.readFloat32());
  }

  // TODO: Add test case for this one
  if (coordinateSize === 8) {
    return [...Array(numCoordinates)].map(() => streamReader.readFloat64());
  }

  throw Error(
    `Mismatch between the size of the normal buffer and the number of normals: ${coordinateSize}`,
  );
}

/**
 * Loads a 3D model from a .model file buffer
 *
 * @param {ArrayBuffer} buffer .model file buffer
 * @return {Object} 3D model information
 */
function loadDotModel(buffer: ArrayBuffer) {
  const streamReader = new StreamReader(buffer, true);

  // File identifier
  streamReader.skipBytes(32);

  // Major version
  streamReader.skipBytes(4);

  // Minor version
  streamReader.skipBytes(4);

  // Header size
  streamReader.skipBytes(4);

  const indicesOffset = streamReader.readUint32();
  const vertexCoordinatesOffset = streamReader.readUint32();
  const uvCoordinatesOffset = streamReader.readUint32();
  const normalCoordinatesOffset = streamReader.readUint32();

  streamReader.seek(indicesOffset);
  const indices = parseIndices(streamReader);

  streamReader.seek(vertexCoordinatesOffset);
  const vertexCoordinates = parseVertexCoordinates(streamReader);

  streamReader.seek(uvCoordinatesOffset);
  const uvCoordinates = parseUVCoordinates(streamReader);

  streamReader.seek(normalCoordinatesOffset);
  const normalCoordinates = parseNormalCoordinates(streamReader);

  return {
    indices,
    vertexCoordinates,
    uvCoordinates,
    normalCoordinates,
  };
}

export default loadDotModel;
