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

export type JbrowseFileInputFormats = 'BAM' | 'VCF';

export type JbrowseFileInput = {
  fileId: string;
  fileName: string;
  fileType: JbrowseFileInputFormats;
  fileURI: string;
  indexURI: string;
};

export type JbrowseFileFormatDict = Record<JbrowseFileInputFormats, string>;

export type JbrowseAssemblyName = string;

export type JbrowseCircularDefaultSession = {
  name: string;
  view: {
    id: string;
    type: string;
  };
};

export type JbrowseLinearDefaultSession = {
  name: string;
  view: {
    id: string;
    minimized: boolean;
    type: string;
    offsetPx: number;
    bpPerPx: number;
    displayedRegions: Array<{
      refName: string;
      start: number;
      end: number;
      reversed: boolean;
      assemblyName: string;
    }>;
    tracks: Array<{
      id: string;
      type: string;
      configuration: string;
      minimized: boolean;
      displays: Array<{
        id: string;
        type: string;
        height: number;
        configuration: string;
      }>;
    }>;
  };
};
