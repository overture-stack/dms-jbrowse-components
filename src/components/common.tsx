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

import { JbrowseFileInput, JbrowseFileFormatDict } from './types';

export const adapterTypes: JbrowseFileFormatDict = {
  BAM: 'BamAdapter',
  VCF: 'VcfTabixAdapter',
};

export const locationTypes: JbrowseFileFormatDict = {
  BAM: 'bamLocation',
  VCF: 'vcfGzLocation',
};

export const trackTypes: JbrowseFileFormatDict = {
  BAM: 'AlignmentsTrack',
  VCF: 'VariantTrack',
};

export const getTracks = (inputFiles: JbrowseFileInput[], assemblyName: string) =>
  inputFiles.map((input) => ({
    type: trackTypes[input.fileType],
    trackId: input.fileId,
    name: input.fileName,
    assemblyNames: [assemblyName],
    category: [trackTypes[input.fileType]],
    adapter: {
      type: adapterTypes[input.fileType],
      [locationTypes[input.fileType]]: {
        uri: input.fileURI,
        locationType: 'UriLocation',
      },
      index: {
        location: {
          uri: input.indexURI,
          locationType: 'UriLocation',
        },
      },
    },
  }));
