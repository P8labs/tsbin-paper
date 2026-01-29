import { PinataSDK } from "pinata";
import { PINATA_API_JWT } from "$env/static/private";
import { PUBLIC_GATEWAY_URL } from "$env/static/public";

export const pinata = new PinataSDK({
  pinataJwt: `${PINATA_API_JWT}`,
  pinataGateway: `${PUBLIC_GATEWAY_URL}`,
});
