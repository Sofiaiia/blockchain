//hash fuction, take string and produce 256 bit value
export async function sha256(data: string): Promise<string> {
    //encode as UTF-8
    const byteArray = new TextEncoder().encode(data);
    //hashes data
    const hashAsByteArray = await crypto.subtle.digest('SHA-256', byteArray);
    //convert arraybuffer to array 
    const hashAsArrayOfNumber = Array.from(new Uint8Array(hashAsByteArray));
  
    //converts bytes to hex string
    return hashAsArrayOfNumber.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  }
  
  //UUID implementation
  export function uuid(): string {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }