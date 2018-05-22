/**
 * @format
 * @flow
 */

import StreamReader from './StreamReader';

describe('StreamReader', () => {
  it('can read an 8 bits unsigned integer', () => {
    const uint8MaxValue = 2 ** 8 - 1;
    const buffer = new ArrayBuffer(1);
    const dataView = new DataView(buffer);
    dataView.setUint8(0, uint8MaxValue);
    const streamReader = new StreamReader(buffer);

    expect(streamReader.readUint8()).toEqual(uint8MaxValue);
  });

  it('can read a 16 bits unsigned integer', () => {
    const uint16MaxValue = 2 ** 16 - 1;
    const buffer = new ArrayBuffer(2);
    const dataView = new DataView(buffer);
    dataView.setUint16(0, uint16MaxValue);
    const streamReader = new StreamReader(buffer);

    expect(streamReader.readUint16()).toEqual(uint16MaxValue);
  });

  it('can read a 32 bits unsigned integer', () => {
    const uint32MaxValue = 2 ** 32 - 1;
    const buffer = new ArrayBuffer(4);
    const dataView = new DataView(buffer);
    dataView.setUint32(0, uint32MaxValue);
    const streamReader = new StreamReader(buffer);

    expect(streamReader.readUint32()).toEqual(uint32MaxValue);
  });

  it('can read a 32 bits float', () => {
    const float32MaxValue = (2 - 2 ** -23) * 2 ** 127;
    const buffer = new ArrayBuffer(4);
    const dataView = new DataView(buffer);
    dataView.setFloat32(0, float32MaxValue);
    const streamReader = new StreamReader(buffer);

    expect(streamReader.readFloat32()).toEqual(float32MaxValue);
  });

  it('can read a 64 bits float', () => {
    const float64MaxValue = 1.8 * 10 ** 308;
    const buffer = new ArrayBuffer(8);
    const dataView = new DataView(buffer);
    dataView.setFloat64(0, float64MaxValue);
    const streamReader = new StreamReader(buffer);

    expect(streamReader.readFloat64()).toEqual(float64MaxValue);
  });

  it('can skip bytes', () => {
    const buffer = new ArrayBuffer(20);
    const dataView = new DataView(buffer);
    dataView.setUint32(3, 1234);
    dataView.setUint32(12, 5678);

    const streamReader = new StreamReader(buffer);
    streamReader.skipBytes(3);
    expect(streamReader.readUint32()).toEqual(1234);
    streamReader.skipBytes(5);
    expect(streamReader.readUint32()).toEqual(5678);
  });

  it('can seek a position', () => {
    const buffer = new ArrayBuffer(20);
    const dataView = new DataView(buffer);
    dataView.setUint32(3, 1234);
    dataView.setUint32(12, 5678);
    dataView.setUint32(16, 9101112);

    const streamReader = new StreamReader(buffer);
    streamReader.seek(12);
    expect(streamReader.readUint32()).toEqual(5678);
    streamReader.seek(3);
    expect(streamReader.readUint32()).toEqual(1234);
    streamReader.seek(16);
    expect(streamReader.readUint32()).toEqual(9101112);
  });
});
