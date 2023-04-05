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
      id: "linearGenomeView",
      minimized: false,
      type: "LinearGenomeView",
      offsetPx: 191980240,
      bpPerPx: 0.1554251851851852,
      displayedRegions: [
        {
          refName: "10",
          start: 0,
          end: 133797422,
          reversed: false,
          assemblyName: "GRCh38",
        },
      ],
      tracks: [
        {
          id: "KnIV9-B7F",
          type: "ReferenceSequenceTrack",
          configuration: "GRCh38-ReferenceSequenceTrack",
          minimized: false,
          displays: [
            {
              id: "YzrpwrbY80",
              type: "LinearReferenceSequenceDisplay",
              height: 100,
              configuration:
                "GRCh38-ReferenceSequenceTrack-LinearReferenceSequenceDisplay",
            },
          ],
        },
      ],
    },
  },
  tracks: [],
};

export default options;
