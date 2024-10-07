import axios from "axios";
export async function uploadToPinata(jsonData: any) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const pinataJWT = process.env.NEXT_PUBLIC_PINATA_JWT || '';

  const { data } = await axios.post(
    url,
    {
      // assuming client sends `nftMeta` json
      pinataContent: jsonData,
    },
    {
      headers: {
        Authorization: `Bearer ${pinataJWT}`,
      },
    }
  );

  return data.IpfsHash;
}

export async function getDataFromPinata(hash: string) {
  const url = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY || 'https://gateway.pinata.cloud'}/ipfs/${hash}`;
  const { data } = await axios.get(url);
  return data;
}

const metadata = [
  "https://bafkreiff5zvhsleblzzuoowto2bnpccqhqtycbcmndd4jpwdg4ytthvzpm.ipfs.nftstorage.link/",
  "https://bafkreihdvln3h2zhogh77vw4tqiqnvajdvylvtqddtekdlrnfg6p6jkczq.ipfs.nftstorage.link/",
  "https://bafkreicdyadrt6qcwszrzqid3ffnflpkl4dqj7osdh6bzzwghids4dnvbe.ipfs.nftstorage.link/",
  "https://bafkreibpigmbnubhun6ihuiuv4wfk7moyfmvbbcuzjalo45uhczhoicf7a.ipfs.nftstorage.link/",
  "https://bafkreidojdzaijasfyp65yypbufw7qgtbckt2nrpmf7gemvlfrnbgrbbta.ipfs.nftstorage.link/",
  "https://bafkreifgfqfkhuip6wbxipyetzhg6lfnqan7btplhrb6qpbkp4v7sz7oti.ipfs.nftstorage.link/",
  "https://bafkreicwgy4pkdo53ro3w3tsfsov7223yqekznyb7l46d5lzjhnaemfh6u.ipfs.nftstorage.link/",
  "https://bafkreid5fgs6torktizqu77j6tgdrpx27mkimbsdmb7s4zdyayugztexvi.ipfs.nftstorage.link/",
  "https://bafkreic3i2bmord6x6mcph523juvdndke6jpsaebotfhzejic3haf4rm6q.ipfs.nftstorage.link/",
];