# 440Hz v3 — LOCAL build (2026-11-08 JST)

## Open / safety

http://127.0.0.1:8440/ on the shared box. Loopback only; no publishing, GitHub or git.
Restart: `node /workspace/440hz/build/tests/serve.js 8440`.
展開済み配布zipは、そのフォルダで `python3 -m http.server 8440 --bind 127.0.0.1`
を起動し、`http://127.0.0.1:8440/` を開いてください（Python以外の依存不要）。
Direct `index.html` / file:// also works, but intentionally uses synthesis (avoids MP3
fetch/CORS errors). HTTP enables 14 recordings. No CDNs, remote runtime assets or ads.
`sample.html`, specification docs, original recordings and the 町工場 series are untouched.
Only the authorized usage appendix was added to `../audio_candidates/sources.md`.

## Stages: four sections, not seventeen sections

Choose one song uniformly from each listed pool **at game start**, then retain it for
that entire section, including its rehearsal and rounds. A same-mode checkpoint retry
retains the choices. A fresh game rerolls. All 17 songs are reachable across games.

| Difficulty | 400–410 | 410–420 | 420–430 | 430–440 |
|---|---|---|---|---|
| EASY | Bolero / Morning Mood | Swan Lake / Mountain King | Spring / Can-can | Jupiter |
| MIDDLE | Anitra / Beethoven 5 I | Gymnopédie 1 / Toreador Song | Canon | New World Largo |
| HARD | Mars | Nocturne Op.9-2 | Bach Double Violin | Dies irae |

Rationale: recognizable, repetitive Morning/Mountain King motifs support early listening;
fast Can-can joins Spring later. Beethoven's distinctive attacks enter the intermediate
pool; mixed vocals make Toreador intermediate despite familiar melody. HARD starts with
Mars without exception. Original twelve placements are preserved. There remain only four
10Hz sections / minimum twenty questions. +2/−6, checkpoints, lives and normal 50% anomaly
incidence are unchanged. Band ratios are unchanged except explicit per-song exclusions.

All real excerpts are six seconds (old seven-second excerpts were shortened by one second)
to keep clips short. After the v2 reference-flow change below, the rules-based Monte Carlo model (5,000 runs per case, same
80–85% accuracy, 2sec thought + 2sec feedback, 25sec rehearsal per entry, 10sec game-over
pause) estimates **7.54–9.53 min** across the three difficulties. This is a timing model,
not measured player accuracy or a promise that difficulty is perceptually identical. No difficulty values were changed to artificially lengthen games. The older 10–15 minute estimate assumed a reference on every round and no longer applies.
See `tests/duration_model.json`.

## Recordings, sources, credits

14 recordings + 3 normal synth songs (Bolero, Swan Lake, Dies irae). Each MP3 is stereo,
44.1kHz, 128kbps; source ranges, exact sizes, LUFS, source hashes and peaks are in
`tests/recording_report.json`. Excerpts:

Spring 0.4–6.4s; Anitra 3–9s; Gymnopédie 8–14s; Canon 32–38s; Nocturne 2–8s;
Bach 8–14s; Mars 2–8s of the supplied 61-second excerpt; Jupiter 184–190s;
Largo 48–54s; Morning 0.4–6.4s; Mountain King 0.4–6.4s; Beethoven 0.2–6.2s;
Can-can 458–464s; Toreador 32–38s.

Target −20 LUFS; integrated loudness is measured on the trimmed six seconds, constant
gain is calibrated against the encoded output (±0.15 LU), with a −2dBTP limiter ceiling
and short source-edge fades. MP3 inter-sample peaks are recorded in the report.

`audio/songs.js` centrally configures file, permitted sections, source URL, performer,
license, original file, source range, required attribution, and per-song exclusions.
To add a replacement after approval: put its licensed local MP3 in audio/, update that
song entry, preserve exact source/license/attribution, mark valid audible sections, then
run tests and audition. Missing/broken/timeout audio silently falls back to synthesis for
both reference and test. Browser DevTools may show a native 404 diagnostic for a missing
file; no JS exception or in-game error is produced.

Licenses follow `../audio_candidates/sources.md` exactly. Important: Jupiter and Beethoven
are **{{Attribution}}**, not CC0/PD. Their text is shown verbatim:
- Performed by Skidmore College Orchestra, courtesy of Musopen (musopen.org)
- Recording courtesy of Musopen (musopen.org)

Canon remains CC BY 3.0 and its supplied attribution is verbatim. All seventeen pieces
appear in Credits, including synthesis provenance for the three non-recorded songs.
USAF Jupiter/Mars/Goin Home candidates are not used. The obsolete self-made test_mars.mp3
has been removed from assets, config and fixture tests. Real Mars is `audio/mars.mp3`.
Only self-made CC0 `test_bolero.mp3` remains, used exclusively as a test fixture.

Spring's source tuning −20 cents is preserved. Reference and test use the SAME decoded
recording and same baseRate=Hz/440; a pitch anomaly is relative to that recording, not
synthesized A440. The common tuning cancels in the comparison.

## Per-song exclusions

Bach: GLITCH_NOISE remains disabled due 1915 surface noise. Remaining weights normalize
proportionally; anomaly incidence remains 50%.

Toreador vocals: 64ms mixed-recording autocorrelation / 10ms hop found stable 200ms pitch
spans median **112.64c**, p90 **182.36c** (59 windows; >200c transitions excluded).
This is not singer-isolated F0 and cannot prove human audibility. It supports conservatively
excluding **PITCH_DRIFT and PITCH_JUMP** for this song only: natural vocal/orchestral motion
can mask both. Retained dropout/timing/noise/muffle/stereo are numerically tested, with
muffle passing the same strict energy criteria below. At its MIDDLE 410Hz assignment,
conditional weights become dropout 33.33%, noise 26.67%, timing 20%, muffle 20%.
See `tests/bizet_analysis.json`; listening judgment is still outstanding.

## QA audio fixes

- Replaced fixed 240ms cuts with onset/offset windows detected from a 20ms energy envelope
  at 10ms hops, positive energy flux and inter-onset/envelope-decay boundaries. Audibility
  is evaluated on the common 2800Hz-lowpass reference, not only raw recording RMS.
- All effects blend with 15ms raised-cosine crossfades. Timing removes and reinserts the
  complete faded note-window 80ms later. The FULL tail is copied after the old endpoint;
  no last-80ms truncation. Selection reserves adequate tail guard within the source.
- Pitch uses monotonic interpolation from a longer span of the original recording,
  centered on the note-window, then crossfades. **No looping or wrap seam**. Source guard
  is checked for ±100-cent shifts. Following audio is unchanged and remains on its clock.
- Muffle only selects windows with HF power share ≥0.003, **6–10dB reduction in the 1.2kHz
  high-pass band** and **≥1dB overall-window level reduction**, measured including fades.
  Cutoff is calibrated per window from 700/550/400/300/220Hz. This explicitly supersedes
  fixed 700Hz where it was too weak. Failing windows are never eligible for FILTER_CHOKE.
- The affected reference/test are both full-length decoded buffers, without artificial
  segmentation boundaries. Tests verify outside-window equality, copied tails, crossfade
  boundary continuity and all selectable muffle windows, not just a random example.

Recordings are still mixed audio: onset detection does NOT separate one instrument from
its accompaniment or guarantee a musicological note boundary in legato passages. There
is no visual waveform/hint. Perceived fairness and phrase-cut pleasantness need real
listening; headless signal measurements are not a human listening test.

## Tests / outputs

`node tests/verify.js`, `node tests/supplemental.js`, `node tests/reference_flow.js`,
and `node tests/v3_modes_ending.js` (loopback server required).
Existing puppeteer-core + /usr/bin/google-chrome, --autoplay-policy=no-user-gesture-required,
360×800 mobile touch. All seventeen songs × both modes × 20,000 rounds = **680,000 rounds**.
Per-band/per-song independent expected ratios, exclusions, no inaudible/snare pitch targets,
mode records, ±Hz and life logic, keyboard/double taps, interruption replay, MP3 decode,
fallback, credits, source hashes and all three audio QA fixes are checked.

Results: tests/results.json, tests/window_qa_results.json, tests/supplemental_results.json.
Screenshots: shots/first_360.png, gameplay_360.png, result_360.png, credits_360.png,
credits_bottom_360.png. credits_all_360.png expands the same credit content for QA capture
only; the in-game modal remains scrollable. Screenshots use test-controlled progression,
not a full twenty-round human playthrough.

Regeneration tools: tests/prepare_recordings.py (read-only inputs + ffmpeg),
render_placeholders.js (Bolero fixture only), analyze_vocals.py, duration_model.py.

Current assumptions: new recording songs have short approximate synthesized fallback motifs.
Real Android/headphone listening remains unverified. The v3 changes below supersede all
v2 debug, optional-replay availability, and fresh-checkpoint timer statements.

## v2 history: reference playback change (v3 changes below take precedence) (2026-11-08 JST)

The request “毎回お手本再生しなくていいです。” supersedes spec §2-2's reference →
1-second gap → test on every question. Design/colors/typography and the answer layout
are retained; the existing reference button is now small and stays in the same game-row
position across rounds, labeled **お手本もう一度 / Replay reference**.

- Automatic reference: once when entering a different song, including the first stage.
  The stage rehearsal supplies this one reference. Its first round does NOT repeat it.
  Same-song rounds automatically play **only the test**, once. A same-song checkpoint
  retry remembers that its reference was heard; a fresh game starts a new reference cycle.
- Optional reference: unlimited, clean replay of the current song, no Hz/life/mistake/retry
  change. The current question and its test remain unchanged; no extra test is played.
  All time spent in this optional replay is excluded from the result/best-time clock;
  no extra timer penalty is added. Automatic stage rehearsal time remains normal time.
- Available in ready rehearsal or answer-selection phases; disabled during loading,
  any audio playback, gaps, feedback and interruptions. Busy presses are ignored, not
  queued. Both answer buttons are disabled while replaying, then restored for the SAME
  question. These phase-only rules never inspect whether an anomaly is present.
- Reference-button DOM, style, position, planned timing and enable/disable rules are
  identical for normal/anomaly rounds. Normal and anomalous rounds precompute the same
  common audio profiles. The button itself never reveals an answer.
- Interrupted test: repeat the test, not an already-heard automatic reference. An
  interrupted initial reference is completed again before marking the song as heard.
  Interrupted optional replay resumes cleanly and restores visible answer buttons;
  its excluded-time accounting remains active until completion.

Regression: `node tests/reference_flow.js` covers automatic reference cadence, test-only
same-song rounds, penalty-free replay, score/question preservation, disabled busy presses,
DOM/computed-style/position equality, identical planned timing, both language labels,
new-stage transitions and interruption recovery. `shots/reference_replay_360.png` shows
optional replay; the normal first/gameplay/result/credit screenshots are refreshed too.
The full core and supplemental suites still cover the 17-song audio and game rules.

Final v2 verification: **166 passed / 0 failed** (core 139, supplemental 6, reference-flow 21), zero JS console/page errors. 680,000 generated rounds. One deliberate missing-file HTTP404 resource diagnostic was expected; it is not a JavaScript error.


## v3: 仕様からの変更・採用事項

- 解放と記録は **聴き方ごとに完全分離**。通常3コースのクリア→SUPER、SUPER→ULTRA、
  ULTRA→本当のクリア。未解放コースはボタン・記録行・説明・空き枠すら生成しません。
  通知も今回解放したコースだけ。開始処理でも解放条件を再確認します。
- SUPER: ライフ2、420Hzのみチェックポイント。最初の420Hz到達時だけ2へ回復。
  ULTRA: ライフ1、最初の誤答で終了、再挑戦は必ず400Hz。両方とも +2/−6Hz。
  10Hz帯の前進・後退とも曲変更→リハーサル。SUPERは火星→夜想曲→バッハ→怒りの日、
  ULTRAは火星→バッハ→夜想曲→怒りの日。**隠し2コースは短い自前合成のみ**。
- 7異変の数値・配分は spec_v3_hidden_modes.md の表どおり。スピーカーの左右異変は0。
  同じ譜面・固定乱数シードから1音だけを加工。抜け/ノイズ40・80ms、両端5msフェード、
  ノイズ1–6kHz・元音比−18/−24dB、ピッチ±100/±10/±6c、遅延50/30ms、
  lowpass 2800→1400/2000Hz (Q=.707)、pan±.65/.40。通常の録音除外設定は隠し合成には適用しません。
- v3 §39に従い **聴き直しはリハーサルだけ**。本番中・回答待ちは同一ボタンを同じ状態で
  無効化し、正常/異変による表示差はありません。曲変更時の自動お手本1回・同曲はテストだけ、を維持。
  通常3コースは先行依頼の「任意お手本に時間ペナルティなし」を維持。
  SUPER/ULTRAの任意お手本はv3の前面時間定義に含めます。これは通常にも全リハーサル時間を
  算入する、と読めるv3 §35との**解釈上の例外**です。点・Hz・ライフへの追加ペナルティはありません。
- タイムは前面のプレイ・自動リハーサル・答え合わせを累積し、中断・終了画面・エンディングを除外。
  SUPERの420Hzと累計時間/誤答/再開回数/回復済みを一緒に保存。累計欠落時はクリアと解放だけ有効、
  ベスト対象外。同タイムは誤答→再開回数の少ない組を採用。通常再開も取得できる累計を保全します。
  通常の過去最高CPを残したまま新規400Hz挑戦を始めた場合、到達していない旧CPへ再開しても
  その短い新挑戦の時間でベストを作れないよう累計不整合を除外します。
  設定変更は新しいゲームから。同じ挑戦の再開は開始時の聴き方を維持。
- 保存キーは `440hz.v3.progress` / `440hz.v3.listeningMode`、schema=3。
  v2の聴き方・難易度が明確な記録だけ移行し、旧キーを消しません。破損JSONは安全な初期値、
  保存拒否は画面に警告してメモリ内で継続。ULTRAの途中挑戦は保存しません。
- **公開HTMLのDEBUGは常にfalse**。`?debug=1` / `?test=1` / 解放やプレビューのURL・キーは無効。
  `window.__440` も公開HTMLにありません。Puppeteerの `tests/browser_harness.js` がテスト時だけ
  HTMLへ `tests/test_bridge.js` を注入します。両ファイルと全testsは配布zipに含めません。

### 60秒エンディング

ULTRAクリアを先に保存して「演奏を聴く」。同じAudioContextへ両素材読込後に予約します。
0–12秒=補正調律、12–12.8秒=完全無音、12.8–58.8秒=木星、58.8–60秒=無音。
両方playbackRate=1。途中のゲーム音を止め、広告は一切ありません。
スキップは0秒から高さ64px以上、0.2秒フェード。完走時だけendingSeen=true。
画面非表示/音声中断は音と時計を停止し「続ける」で同じ位置から再開。
失敗時は黙って無音進行せず、読み直す/タイトルへ。file://では通常ゲームは合成で動きますが、
**録音必須のエンディングは読込エラーを表示**するためHTTPで開いてください。
再視聴は達成した聴き方にだけ出現し、成績を変更しません。

|素材|使用範囲 / 配布ファイル|加工・実測|出典・権利|
|---|---|---|---|
|調律|元0–12秒を低速化後12秒にトリム / audio/ending_tuning_440.mp3 (192,812 B)|−11.35c、48kHz、冒頭0.3秒/末尾0.1秒fade、−20.00 LUFS、−7.34dBTP|dorhel / CC0、録音年不明（公開2012-08-09）、下記Freesound|
|木星|元184–230秒 / audio/ending_jupiter_184_230.mp3 (736,940 B)|46秒、冒頭0.5秒/末尾2秒fade、−20.02 LUFS、−6.87dBTP|Gustav Holst / Skidmore College Orchestra / Musopen、Attribution、録音年不明|

補正はサンプルレート倍率 `2**(-11.35/1200)=0.9934654267096511`。
4秒Hann窓・開始0/2/4/6/8秒のFFTピーク補間で、元の代表中央値442.893863Hz→
**配布MP3を再復号して439.996837Hz**。多声調律の代表値で、全楽器の厳密一致の証明ではありません。
測定/生成は `tests/prepare_ending.py`、結果 `tests/ending_audio_report.json`。
両素材の目標−20LUFS / true peak≤−1dBTPを満たします。

**必須クレジット（画面に14px以上で常時表示・原文そのまま）**

Performed by Skidmore College Orchestra, courtesy of Musopen (musopen.org)

Tuning: dorhel (CC0), pitch corrected.
- https://freesound.org/people/dorhel/sounds/162765/
- https://commons.wikimedia.org/wiki/File:Gustav_Holst_-_the_planets,_op._32_-_iv._jupiter,_the_bringer_of_jollity.ogg

権利資料確認: 2026-11-08 JST。配布元の表示許諾は `tests/ending_rights_snapshot.json` にURL・
取得ページSHA・許諾HTML抜粋を保全。木星のCommons Licensingはproper attributionを条件に再配布・
改変・商用利用を許諾。CC0への読み替えはしません。調律のCC0は同ページのライセンスリンクを確認。
仕様が希望するdocs/audio_sources.mdへの新規記載は「docs変更禁止」を優先し、このREADMEと
許可済みsources.md使用追記に記録しました。**公開操作は行っていません**。

絵は支給画像から portrait 720×1280 / landscape 1280×720へWebP化。
`assets/ending_true_portrait.webp` / `assets/ending_true_landscape.webp`。
引き伸ばしなし、画像内に文字なし。横版は別作画ではなく支給縦絵の中央寄りクロップ（仕様との差）。
失敗時は暗い背景。終了後も出典リンクを開けます。

### v3検証と残件

`node tests/v3_modes_ending.js` は移行・解放・DOM非露出・2/1ライフ・保存・両聴き方・
公開DEBUG無効・32万生成・全8譜面7異変の実PCM差分/固定シード/ノイズRMS・読込失敗・
停止/再開/スキップ・**実時間60秒完走**を検証します。
通常の68万生成と合わせて100万ラウンド。テスト用進行操作はtests内だけです。
新スクリーンショット: `shots/unlock_360.png` / `shots/ending_360.png`（360px）。

未実施: 実機Androidでの試遊、補正調律/木星の人による最終試聴、両聴き方の正解率差5ポイント以内の
ユーザーテスト。信号測定・headless動作はこれらの代用ではありません。公開前に確認してください。


### v3配布ファイル一覧

```text
index.html
README.md
audio/anitra.mp3
audio/beethoven5.mp3
audio/can_can.mp3
audio/canon.mp3
audio/double_violin.mp3
audio/ending_jupiter_184_230.mp3
audio/ending_tuning_440.mp3
audio/gymnopedie.mp3
audio/jupiter.mp3
audio/mars.mp3
audio/morning.mp3
audio/mountain_king.mp3
audio/new_world.mp3
audio/nocturne.mp3
audio/songs.js
audio/spring.mp3
audio/test_bolero.mp3
audio/toreador.mp3
assets/ending_true_landscape.webp
assets/ending_true_portrait.webp
```

shots/ と tests/ は配布対象外。ローカル検証用フォルダにのみ残します。

Final v3 verification: **219 passed / 0 failed**, JS console/page errors 0.
Core 139, supplemental 6, reference 21, v3 53.
1,000,000 generated rounds; real 60-second ending completed. One intentional missing-file HTTP404 diagnostic is not a JS error.
Requested name scan: zero hits.
