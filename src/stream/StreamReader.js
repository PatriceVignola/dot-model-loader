/**
 * @format
 * @flow
 */

class StreamReader {
  dataView: DataView;
  pos: number;
  littleEndian: boolean;

  constructor(buffer: ArrayBuffer, littleEndian: boolean = false) {
    this.dataView = new DataView(buffer);
    this.pos = 0;
    this.littleEndian = littleEndian;
  }

  readUint8(): number {
    const uint8 = this.dataView.getUint8(this.pos);
    this.pos += 1;
    return uint8;
  }

  readUint16(): number {
    const uint16 = this.dataView.getUint16(this.pos, this.littleEndian);
    this.pos += 2;
    return uint16;
  }

  readUint32(): number {
    const uint32 = this.dataView.getUint32(this.pos, this.littleEndian);
    this.pos += 4;
    return uint32;
  }

  readFloat32(): number {
    const float32 = this.dataView.getFloat32(this.pos, this.littleEndian);
    this.pos += 4;
    return float32;
  }

  readFloat64(): number {
    const float64 = this.dataView.getFloat64(this.pos, this.littleEndian);
    this.pos += 8;
    return float64;
  }

  skipBytes(count: number) {
    this.pos += count;
  }

  seek(pos: number) {
    this.pos = pos;
  }
}

export default StreamReader;
