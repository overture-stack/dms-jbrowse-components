/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { JbrowseFileInput, JbrowseFileInputInfo } from "./types";

export const adapterTypes: JbrowseFileInputInfo = {
  BAM: "BAMAdapter",
  VCF: "VcfTabixAdapter",
};

export const locationTypes: JbrowseFileInputInfo = {
  BAM: "bamLocation",
  VCF: "vcfGzLocation",
};

export const trackTypes: JbrowseFileInputInfo = {
  BAM: "FeatureTrack", // feature vs alignment?
  VCF: "VariantTrack",
};

export const humanGenomeAssembly = "hg38";

export const getTracks = (inputFiles: JbrowseFileInput[]) =>
  inputFiles.map((input) => ({
    type: trackTypes[input.fileType],
    trackId: input.fileId,
    name: input.fileName,
    assemblyNames: [humanGenomeAssembly], // should be a constant
    category: [trackTypes[input.fileType]], // arbitrary & optional
    adapter: {
      type: adapterTypes[input.fileType],
      [locationTypes[input.fileType]]: {
        uri: input.fileURI,
        locationType: "UriLocation",
      },
      index: {
        location: {
          uri: input.indexURI,
          locationType: "UriLocation",
        },
      },
    },
  }));

export const tempFileRoot: string = "http://localhost:3000/data/testing/";

// VCFs without translocations
const tempFiles: string[] = [
  "0a6be23a-d5a0-4e95-ada2-a61b2b5d9485.consensus.20160830.somatic.snv_mnv.vcf.gz",
  "0a9c9db0-c623-11e3-bf01-24c6515278c0.consensus.20160830.somatic.snv_mnv.vcf.gz",
  "0ab4d782-9a50-48b9-96e4-6ce42b2ea034.consensus.20160830.somatic.snv_mnv.vcf.gz",
  "0b6cd7df-6970-4d60-b7b5-85002a7d8781.consensus.20160830.somatic.snv_mnv.vcf.gz",
  "00b9d0e6-69dc-4345-bffd-ce32880c8eef.consensus.20160830.somatic.snv_mnv.vcf.gz",
  "0b29c893-03bf-4131-b192-c14a2788d411.consensus.20160830.somatic.snv_mnv.vcf.gz",
];

export const tempFileOptions: JbrowseFileInput[] = tempFiles.map((file) => ({
  fileId: file.split(".")[0],
  fileName: file,
  fileType: "VCF",
  fileURI: tempFileRoot + file,
  indexURI: tempFileRoot + file + ".tbi",
}));
