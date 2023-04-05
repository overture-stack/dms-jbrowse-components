const options = {
  assembly: {
    name: "hg38",
    aliases: ["GRCh38"],
    sequence: {
      type: "ReferenceSequenceTrack",
      trackId: "GRCh38-ReferenceSequenceTrack",
      adapter: {
        type: "BgzipFastaAdapter",
        fastaLocation: {
          uri: "http://localhost:3000/data/testing/hg38.prefix.fa.gz",
          locationType: "UriLocation",
        },
        faiLocation: {
          uri: "http://localhost:3000/data/testing/hg38.prefix.fa.gz.fai",
          locationType: "UriLocation",
        },
        gziLocation: {
          uri: "http://localhost:3000/data/testing/hg38.prefix.fa.gz.gzi",
          locationType: "UriLocation",
        },
      },
    },
    refNameAliases: {
      adapter: {
        type: "RefNameAliasAdapter",
        location: {
          uri: "http://localhost:3000/data/testing/hg38_aliases.txt",
          locationType: "UriLocation",
        },
      },
    },
  },
  configuration: {},
  connections: [],
  defaultSession: {
    name: "New Session",
    view: {
      id: "circularView",
      type: "CircularView",
    },
  },
  tracks: [],
};

export default options;
