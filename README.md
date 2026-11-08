# 440Hz — 17-song LOCAL build (2026-11-08 JST)

## Open / safety

http://127.0.0.1:8440/ on the shared box. Loopback only; no publishing, GitHub or git.
Restart: `node /workspace/440hz/build/tests/serve.js 8440`.
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

`node tests/verify.js` (server required) and `node tests/supplemental.js`.
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

Remaining assumptions: ?debug=1 explicitly shows answers per the latest request despite
old spec §5-2; normal URLs have no answer UI or test hook (test hook only ?test=1). New
recording songs have short approximate synthesized fallback motifs, not new recordings.
A fresh title-screen continue starts timing at that checkpoint; a same-session retry
accumulates time/mistakes/restarts. Real Android/headphone listening is still unverified.

## v2: reference playback change (2026-11-08 JST)

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
