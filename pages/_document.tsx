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

import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export const pageLinks = [
  {
    url: "/circular",
    text: "Circular",
    description: "Circular genome view",
  },
  {
    url: "/linear",
    text: "Linear",
    description: "Linear genome view",
  },
  {
    url: "/linear-circular",
    text: "Linear & Circular",
    description: "Linear & circular genome view",
  },
];

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="nav">
          <h2>
            <Link href="/">Jbrowse Prototype</Link>
          </h2>
          <ul>
            {pageLinks.map((link) => (
              <li key={link.url}>
                <Link href={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="main">
          <div className="wrapper">
            <Main />
            <NextScript />
          </div>
        </div>
      </body>
    </Html>
  );
}
