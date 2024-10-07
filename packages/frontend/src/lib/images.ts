"use server";
import { promises as fs } from "fs";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import path from "path";
import sharp from "sharp";

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function getFileBufferLocal(filepath: string) {
  // filepath is file addess exactly how is used in Image component (/ = public/)
  const realFilepath = path.join(process.cwd(), "public", filepath);
  return fs.readFile(realFilepath);
}

async function getFileBufferRemote(url: string) {
  const response = await fetch(url);
  return Buffer.from(await response.arrayBuffer());
}

function getFileBuffer(src: string) {
  const isRemote = src.startsWith("http");
  return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src);
}

export async function getPlaceholderImage(filepath: string) {
  try {
    const originalBuffer = await getFileBuffer(filepath);
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer();
    return {
      src: filepath,
      placeholder: bufferToBase64(resizedBuffer),
    };
  } catch {
    return {
      src: filepath,
      placeholder:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==",
    };
  }
}

type Images = Record<string, string>;
export interface PlaceHolderImage {
  src: {
    src: string | StaticImport;
    height: number;
    width: number;
    blurWidth: number;
    blurHeight: number;
  };
  placeholder: string;
}

export const fetchImagesWithPlaceholder = async (
  images: Images,
): Promise<Record<string, PlaceHolderImage>> => {
  const result: Record<string, PlaceHolderImage> = {};
  for (const [key, value] of Object.entries(images)) {
    const placeholder = await getPlaceholderImage(value);
    // @ts-expect-error unknown error
    result[key] = {
      ...placeholder,
    };
  }
  return result;
};
