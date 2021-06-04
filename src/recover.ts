import { recoverTypedSignature } from "eth-sig-util";
import { utils } from 'ethers';
import { ResponseWithJson } from './utils';

type ReqeustData = {
  token: string; // must check is legit or not
  challenge: string; // something identifiable, like post slug / id / random code
  sig: string;
}

export async function validateAndReturn(req: Request) {
  const { token, challenge, sig }: ReqeustData = await req.json()
  const recoveredWallet = recoverTypedSignature<{
    EIP712Domain: [
      {name:"name",type:"string"},
      {name:"version",type:"string"},
      {name:"chainId",type:"uint256"},
      {name:"verifyingContract",type:"address"}
    ],
    Request: [
      { name: 'token', type: 'address' },
      { name: 'challenge', type: 'string' },
    ],
  }>({
    data: {
      types: {
        EIP712Domain: [
          {name:"name",type:"string"},
          {name:"version",type:"string"},
          {name:"chainId",type:"uint256"},
          {name:"verifyingContract",type:"address"}
        ],
        Request: [
          { name: 'token', type: 'address' },
          { name: 'challenge', type: 'string' },
        ],
      },
      primaryType: 'Request',
      domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 56,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
      },
      message: {
          token,
          challenge
      }
    },
    sig 
  })
  try {
    const checksumedAddress = utils.getAddress(recoveredWallet)
    console.info('recoveredWallet', checksumedAddress);
    if (checksumedAddress !== '0x7fd97686785Cb93098FA25d0D6c47Cb0513B9A01') throw new Error('Bad User')

    return ResponseWithJson({ content: 'Hello World, this is a unlocked secret text' })
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 400 })
  }
}