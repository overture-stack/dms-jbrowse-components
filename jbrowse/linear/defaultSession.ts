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

// default session for JbrowseLinear

const linearDefaultSession = {
  name: "Default session - Linear",
  margin: 0,
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
      {
        id: "Cbnwl72EX",
        type: "VariantTrack",
        configuration:
          "ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf",
        minimized: false,
        displays: [
          {
            id: "dvXz01Wf6w",
            type: "LinearVariantDisplay",
            height: 100,
            configuration:
              "ALL.wgs.shapeit2_integrated_snvindels_v2a.GRCh38.27022019.sites.vcf-LinearVariantDisplay",
          },
        ],
      },
    ],
    hideHeader: false,
    hideHeaderOverview: false,
    hideNoTracksActive: false,
    trackSelectorType: "hierarchical",
    trackLabels: "overlapping",
    showCenterLine: false,
    showCytobandsSetting: true,
    showGridlines: true,
  },
};

export default linearDefaultSession;
