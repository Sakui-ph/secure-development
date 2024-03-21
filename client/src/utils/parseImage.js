import { LogError } from './error-handlers/error-logger';

export const imageBufferToImage = (buffer) => {
    const hex = `0x${buffer.toString('hex')}`;
    const blob = toBlob(hex);
    if (blob === null) {
        LogError(null, 'Error converting buffer to blob');
        return null;
    }
    return URL.createObjectURL(blob);
};

function toBlob(str) {
    const hexStr = str.slice(2);
    const buf = new ArrayBuffer(hexStr.length / 2);
    const byteBuf = new Uint8Array(buf);
    for (let i = 0; i < hexStr.length; i += 2) {
        byteBuf[i / 2] = parseInt(hexStr.slice(i, i + 2), 16);
    }
    let blob;
    if (byteBuf[0] === 0x89) blob = new Blob([byteBuf], { type: 'image/png' });
    else if (byteBuf[0] === 0xff)
        blob = new Blob([byteBuf], { type: 'image/jpeg' });
    return blob;
}
