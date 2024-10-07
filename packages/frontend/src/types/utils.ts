import { string } from 'zod';

export type Tuple<
  T,
  MaxLength extends number = 10,
  Current extends T[] = [],
> = Current['length'] extends MaxLength
  ? Current
  : Current | Tuple<T, MaxLength, [T, ...Current]>;

export type ussdSchema = {
  address: string;
  privKey: string;
  authCode: string;
};
